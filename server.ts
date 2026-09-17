import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const SRC_DATA_DIR = path.join(process.cwd(), 'src', 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');
const SRC_GALLERY_FILE = path.join(SRC_DATA_DIR, 'gallery.json');

// Ensure storage directories exist
[DATA_DIR, SRC_DATA_DIR, UPLOADS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Helper to safely read gallery items
function readGalleryItems(): any[] {
  try {
    if (fs.existsSync(GALLERY_FILE)) {
      const raw = fs.readFileSync(GALLERY_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
    if (fs.existsSync(SRC_GALLERY_FILE)) {
      const raw = fs.readFileSync(SRC_GALLERY_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('[Server] Failed to read gallery items:', err);
  }
  return [];
}

// Helper to safely write gallery items
function writeGalleryItems(items: any[]): void {
  try {
    const serialized = JSON.stringify(items, null, 2);
    fs.writeFileSync(GALLERY_FILE, serialized, 'utf-8');
    // Also mirror to src/data/gallery.json for static Vite build bundling
    try {
      fs.writeFileSync(SRC_GALLERY_FILE, serialized, 'utf-8');
    } catch {
      // Non-fatal if src/ is read-only in production
    }
  } catch (err) {
    console.error('[Server] Failed to write gallery items:', err);
  }
}

// Helper to save base64 image data URL to a real file in public/uploads/
function saveBase64Image(dataUrl: string, prefix = 'photo'): string | null {
  try {
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return null;
    }
    const mimeType = matches[1];
    const base64Data = matches[2];
    let ext = 'jpg';
    if (mimeType.includes('png')) ext = 'png';
    else if (mimeType.includes('webp')) ext = 'webp';
    else if (mimeType.includes('gif')) ext = 'gif';

    const filename = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, filename);
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, buffer);

    // Also mirror into dist/uploads if dist exists (for production runs)
    const distUploads = path.join(process.cwd(), 'dist', 'uploads');
    if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
      if (!fs.existsSync(distUploads)) {
        fs.mkdirSync(distUploads, { recursive: true });
      }
      fs.writeFileSync(path.join(distUploads, filename), buffer);
    }

    return `/uploads/${filename}`;
  } catch (err) {
    console.error('[Server] Failed to write base64 image:', err);
    return null;
  }
}

async function startServer() {
  const app = express();

  // Support up to 25MB base64 image payloads for high-resolution photo uploads
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // Static serving for direct uploaded photos
  app.use('/uploads', express.static(UPLOADS_DIR));
  app.use(express.static(path.join(process.cwd(), 'public')));

  // ==========================================
  // API ROUTES (Always defined FIRST)
  // ==========================================

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // GET: Fetch current gallery items (available to any user / friend visiting the site)
  app.get('/api/gallery', (_req, res) => {
    const items = readGalleryItems();
    res.json({ success: true, items });
  });

  // POST: Upload a standalone image
  app.post('/api/upload', (req, res) => {
    const { dataUrl, filename } = req.body;
    if (!dataUrl) {
      return res.status(400).json({ success: false, error: 'No dataUrl provided' });
    }
    const publicUrl = saveBase64Image(dataUrl, filename ? path.parse(filename).name : 'gallery');
    if (publicUrl) {
      return res.json({ success: true, url: publicUrl });
    }
    return res.status(500).json({ success: false, error: 'Failed to process image' });
  });

  // POST: Add or edit a gallery item
  app.post('/api/gallery', (req, res) => {
    const itemData = req.body;
    if (!itemData) {
      return res.status(400).json({ success: false, error: 'No item data provided' });
    }

    // If image_url is a base64 string, convert it to a persistent uploaded file
    let imageUrl = itemData.image_url || '';
    if (imageUrl.startsWith('data:image/')) {
      const savedPath = saveBase64Image(imageUrl, 'showcase');
      if (savedPath) {
        imageUrl = savedPath;
      }
    }

    const currentList = readGalleryItems();
    let savedItem: any;

    if (itemData.id) {
      const index = currentList.findIndex((i) => String(i.id).trim() === String(itemData.id).trim());
      if (index >= 0) {
        savedItem = {
          ...currentList[index],
          ...itemData,
          image_url: imageUrl,
        };
        currentList[index] = savedItem;
      } else {
        savedItem = {
          ...itemData,
          id: String(itemData.id),
          image_url: imageUrl,
        };
        currentList.push(savedItem);
      }
    } else {
      savedItem = {
        ...itemData,
        id: `gal_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        image_url: imageUrl,
        sort_order: itemData.sort_order ?? currentList.length + 1,
        is_active: itemData.is_active !== undefined ? itemData.is_active : true,
        created_at: new Date().toISOString().split('T')[0],
      };
      currentList.push(savedItem);
    }

    currentList.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    writeGalleryItems(currentList);

    res.json({ success: true, item: savedItem, items: currentList });
  });

  // DELETE: Delete a gallery item by ID
  app.delete('/api/gallery/:id', (req, res) => {
    const targetId = String(req.params.id).trim();
    const currentList = readGalleryItems();
    const filtered = currentList.filter((i) => String(i.id).trim() !== targetId);
    writeGalleryItems(filtered);
    res.json({ success: true, items: filtered });
  });

  // POST: Reset gallery to defaults
  app.post('/api/gallery/reset', (_req, res) => {
    let defaults: any[] = [];
    if (fs.existsSync(SRC_GALLERY_FILE)) {
      try {
        defaults = JSON.parse(fs.readFileSync(SRC_GALLERY_FILE, 'utf-8'));
      } catch {
        defaults = [];
      }
    }
    writeGalleryItems(defaults);
    res.json({ success: true, items: defaults });
  });

  // ==========================================
  // VITE & STATIC SPA SERVING
  // ==========================================

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Live on http://0.0.0.0:${PORT} (PID: ${process.pid})`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal bootstrap error:', err);
  process.exit(1);
});
