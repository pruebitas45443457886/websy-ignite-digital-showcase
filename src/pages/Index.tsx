import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppBots from "@/components/WhatsAppBots";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import AdvancedQuote from "@/components/AdvancedQuote";
import WhyChooseUs from "@/components/WhyChooseUs";
import { initLocomotiveScroll, animateHeroSection, animateSectionEntrance, animateStaggeredItems, COLORS } from "@/lib/animation";
import gsap from "gsap";

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize smooth scrolling
    const locoScroll = initLocomotiveScroll();
    
    // Run hero animation as soon as the component mounts
    const heroTimeline = animateHeroSection();
    
    // Initialize section-based animations
    if (mainRef.current) {
      animateSectionEntrance('[data-animate="section"]');
      animateStaggeredItems('[data-animate="container"]', '[data-animate="item"]');
    }
    
    // Cleanup function
    return () => {
      if (locoScroll) {
        locoScroll.destroy();
      }
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <div className="min-h-screen" data-barba="container" data-barba-namespace="home">
      <CustomCursor />
      <Navbar />
      <ScrollProgress />
      <WhatsAppFloatingButton />
      {/* Fix: Setting id and ensuring mainRef is properly attached */}
      <main ref={mainRef} id="scroll-container" data-scroll-container>
        <Hero />
        <WhyChooseUs data-animate="section" />
        <Brands data-animate="section" />
        <WhatsAppBots data-animate="section" />
        <Services data-animate="section" />
        <Projects data-animate="section" />
        <Process data-animate="section" />
        <Testimonials data-animate="section" />
        <About data-animate="section" />
        <AdvancedQuote data-animate="section" />
        <CTA data-animate="section" />
        <Contact data-animate="section" />
      </main>
      <Footer />
      
      {/* Page loader animation overlay - shows briefly during page transitions */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center transition-opacity duration-700 opacity-0"
        style={{ background: COLORS.darkBackground }}
        id="page-transition-overlay"
      >
        <div className="w-24 h-24 relative">
          <div 
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: `${COLORS.highlight}20` }}
          ></div>
          <div 
            className="absolute inset-4 rounded-full animate-pulse"
            style={{ background: `${COLORS.highlight}40` }}
          ></div>
          <div 
            className="absolute inset-8 rounded-full"
            style={{ background: COLORS.highlight }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Index;