import HomeContent from '@/components/HomeContent';
import AutoScrollingCarouselSection from '@/components/carousel/AutoScrollingCarouselSection';
import PopularSlider from '@/components/explore/PopularSlider';


export default function HomePage() {
  return (
    <main className="w-full overflow-hidden">
      
      <HomeContent />
      <PopularSlider />
      <AutoScrollingCarouselSection />
      

    </main>
  );
}
