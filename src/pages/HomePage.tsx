import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { HeritageStrip } from '../components/home/HeritageStrip';
import { CategorySection } from '../components/home/CategorySection';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { PromoBannerSection } from '../components/home/PromoBannerSection';
import { CurrentOffersSection } from '../components/home/CurrentOffersSection';
import { DealsOfDaySection } from '../components/home/DealsOfDaySection';
import { WhyJainsSection } from '../components/home/WhyJainsSection';
import { BrandsMarqueeSection } from '../components/home/BrandsMarqueeSection';
import { FinanceSection } from '../components/home/FinanceSection';
import { ExchangeSection } from '../components/home/ExchangeSection';
import { ComparisonSection } from '../components/home/ComparisonSection';
import { SocialMediaSection } from '../components/home/SocialMediaSection';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { StoreExperienceSection } from '../components/home/StoreExperienceSection';
import { FaqSection } from '../components/home/FaqSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <div className="w-full">
      {/* Section 03 — HERO */}
      <HeroSection navigate={navigate} />

      {/* Section 04 — TRUST / HERITAGE STRIP */}
      <HeritageStrip />

      {/* Section 05 — SHOP BY CATEGORY */}
      <CategorySection navigate={navigate} />

      {/* Section 06 — FEATURED PRODUCTS (Latest Arrivals) */}
      <FeaturedProductsSection navigate={navigate} />

      {/* Section 07 — PREMIUM PROMOTIONAL BANNER */}
      <PromoBannerSection navigate={navigate} />

      {/* Section 08 — CURRENT OFFERS */}
      <CurrentOffersSection navigate={navigate} />

      {/* Section 09 — DEALS OF THE DAY */}
      <DealsOfDaySection navigate={navigate} />

      {/* Section 10 — WHY JAIN'S? (Brand Philosophy) */}
      <WhyJainsSection />

      {/* Section 11 — ALL MAJOR BRANDS (Smooth Marquee) */}
      <BrandsMarqueeSection navigate={navigate} />

      {/* Section 12 — FINANCE (Partner Institutions) */}
      <FinanceSection navigate={navigate} />

      {/* Section 13 — EXCHANGE ("UPGRADE. EXCHANGE. SAVE.") */}
      <ExchangeSection />

      {/* Section 14 — SMARTPHONE COMPARISON */}
      <ComparisonSection navigate={navigate} />

      {/* Section 15 & 16 — SOCIAL MEDIA / JAIN'S MOMENTS & VIDEO */}
      <SocialMediaSection />

      {/* Section 17 — CUSTOMER REVIEWS */}
      <ReviewsSection />

      {/* Section 18 — STORE EXPERIENCE */}
      <StoreExperienceSection />

      {/* Section 19 — FAQ */}
      <FaqSection />

      {/* Section 20 — FINAL CTA */}
      <FinalCtaSection navigate={navigate} />
    </div>
  );
};
