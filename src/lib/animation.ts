import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SimpleSplitText } from './SplitText';
import LocomotiveScroll from 'locomotive-scroll';

// Custom page transition system instead of Barba.js to avoid type issues
interface PageTransitionSystem {
  init: (options: any) => void;
}

// Simple implementation that mimics the Barba.js API
const customTransitionSystem: PageTransitionSystem = {
  init: (options) => {
    if (typeof window === 'undefined') return;
    
    // We'll implement a simpler version without full page transitions
    // This is just to make TypeScript happy
    console.log('Custom transition system initialized');
  }
};

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Color palette based on provided HEX colors
export const COLORS = {
  darkBackground: '#182A2C',
  mediumBackground: '#344445',
  accentBackground: '#555555',
  // Additional complementary colors
  lightAccent: '#4A666A', 
  highlight: '#6A898D',
};

// Initialize Locomotive Scroll
let locoScroll: any = null;

export const initLocomotiveScroll = () => {
  if (typeof window === 'undefined') return;

  // Destroy any existing instance
  if (locoScroll) {
    locoScroll.destroy();
  }

  // Fix: Try to find the container by both selector and id
  const scrollContainer = document.querySelector('[data-scroll-container]') || 
                          document.getElementById('scroll-container');
  
  if (!scrollContainer) {
    console.warn('Locomotive Scroll: No scroll container found. Make sure to add data-scroll-container to your main content wrapper.');
    return;
  }

  console.log('Initializing Locomotive Scroll with container:', scrollContainer);
  
  // Initialize locomotive scroll
  locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    multiplier: 1,
    lerp: 0.05, // Linear interpolation, lower = smoother
    smartphone: {
      smooth: true,
      multiplier: 1,
    },
    tablet: {
      smooth: true,
      multiplier: 1,
    }
  });

  // Update ScrollTrigger when locomotive scroll updates
  locoScroll.on('scroll', ScrollTrigger.update);

  // Sync ScrollTrigger with locomotive scroll
  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length 
        ? locoScroll.scrollTo(value, 0, 0) 
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: (scrollContainer as HTMLElement).style.transform ? 'transform' : 'fixed',
  });

  // Refresh ScrollTrigger and LocomotiveScroll
  ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
  ScrollTrigger.refresh();

  return locoScroll;
};

// Text animation with split text
export const animateTextReveal = (selector: string, delay = 0) => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    const splitText = new SimpleSplitText(element, { 
      linesClass: "split-line",
      wordsClass: "split-word",
      charsClass: "split-char" 
    });
    
    gsap.from(splitText.chars, {
      opacity: 0,
      y: 20,
      rotationX: -90,
      stagger: 0.02,
      delay,
      duration: 0.8,
      ease: "back.out(1.7)",
      onComplete: () => splitText.revert()
    });
  });
};

// Section entrance animation
export const animateSectionEntrance = (selector: string) => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
        scroller: '[data-scroll-container]'
      },
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    });
  });
};

// Staggered items animation
export const animateStaggeredItems = (containerSelector: string, itemSelector: string, staggerAmount = 0.1) => {
  const containers = document.querySelectorAll(containerSelector);
  
  // Fix: Find scroll container with fallback
  const scrollContainer = document.querySelector('[data-scroll-container]') || 
                          document.getElementById('scroll-container') ||
                          document.body;
  
  console.log(`Setting up staggered animations for ${containers.length} containers`);
  
  containers.forEach(container => {
    const items = container.querySelectorAll(itemSelector);
    
    if (items.length === 0) {
      console.log(`No items found in container with selector: ${itemSelector}`);
      return;
    }
    
    console.log(`Animating ${items.length} items with stagger ${staggerAmount}`);
    
    gsap.from(items, {
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
        scroller: scrollContainer
      },
      y: 60,
      opacity: 0,
      scale: 0.9,
      stagger: staggerAmount,
      duration: 0.8,
      ease: "power3.out"
    });
  });
};

// Parallax background effect
export const createParallaxEffect = (selector: string, strength = 0.3) => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element.parentElement || element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        scroller: '[data-scroll-container]'
      },
      y: (i, target) => strength * target.parentElement.offsetHeight,
      ease: "none"
    });
  });
};

// Image reveal animation with clip-path
export const animateImageReveal = (selector: string) => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    gsap.fromTo(element, 
      { 
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" 
      },
      {
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          toggleActions: "play none none none",
          scroller: '[data-scroll-container]'
        },
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power4.inOut"
      }
    );
  });
};

// Custom page transition implementation
export const initPageTransitions = () => {
  customTransitionSystem.init({
    transitions: [
      {
        name: 'default-transition',
        // This is a simplified version for now
        // We'll handle transitions with route change events in React Router instead
        leave(data: any) {
          return new Promise<void>(resolve => {
            const container = document.querySelector('[data-barba="container"]');
            if (container) {
              gsap.to(container, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                onComplete: resolve
              });
            } else {
              resolve();
            }
          });
        },
        enter(data: any) {
          return new Promise<void>(resolve => {
            window.scrollTo(0, 0);
            const container = document.querySelector('[data-barba="container"]');
            if (container) {
              gsap.from(container, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                onComplete: () => {
                  // Reinitialize scroll and animations on new page
                  initLocomotiveScroll();
                  animateSectionEntrance('[data-animate="section"]');
                  animateStaggeredItems('[data-animate="container"]', '[data-animate="item"]');
                  createParallaxEffect('[data-parallax]');
                  animateImageReveal('[data-animate="image"]');
                  resolve();
                }
              });
            } else {
              resolve();
            }
          });
        }
      }
    ]
  });
};

// Create master timeline for section animations
export const createSectionTimeline = (selector: string) => {
  const section = document.querySelector(selector);
  if (!section) return null;
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none",
      scroller: '[data-scroll-container]'
    }
  });
  
  return tl;
};

// Animation for hero section with coordinated elements
export const animateHeroSection = () => {
  const tl = gsap.timeline();
  
  // Fix: Check if elements exist before animating them
  const heroHeading = document.querySelector(".hero-heading");
  const heroSubheading = document.querySelector(".hero-subheading");
  const heroCta = document.querySelector(".hero-cta");
  const heroImage = document.querySelector(".hero-image");
  const heroDecorations = document.querySelectorAll(".hero-decoration");
  
  console.log('Hero elements found:', {
    heading: !!heroHeading,
    subheading: !!heroSubheading,
    cta: !!heroCta,
    image: !!heroImage,
    decorations: heroDecorations.length
  });
  
  // Only add animations for elements that exist
  if (heroHeading) {
    tl.from(heroHeading, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    });
  }
  
  if (heroSubheading) {
    tl.from(heroSubheading, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");
  }
  
  if (heroCta) {
    tl.from(heroCta, {
      y: 30,
      opacity: 0,
      scale: 0.95,
      duration: 0.7,
      ease: "back.out(1.7)"
    }, "-=0.4");
  }
  
  if (heroImage) {
    tl.from(heroImage, {
      x: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.7");
  }
  
  if (heroDecorations.length > 0) {
    tl.from(heroDecorations, {
      opacity: 0,
      scale: 0,
      stagger: 0.2,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    }, "-=1");
  }
  
  return tl;
};

// Initialize all animations
export const initAnimations = () => {
  console.log('Initializing animations');
  
  // Fix: Set a short delay to ensure DOM is ready
  setTimeout(() => {
    // Initialize smooth scroll first
    const scroll = initLocomotiveScroll();
    
    // Initialize page transitions
    initPageTransitions();
    
    // Run animations that should happen on page load
    gsap.set("[data-animate]", { opacity: 0 });
    
    // Wait a bit for everything to settle before animating
    setTimeout(() => {
      console.log('Starting hero animations');
      
      // Initialize hero animation
      animateHeroSection();
      
      // Add scroll-based animations
      console.log('Setting up scroll-based animations');
      
      animateSectionEntrance('[data-animate="section"]');
      animateStaggeredItems('[data-animate="container"]', '[data-animate="item"]');
      createParallaxEffect('[data-parallax]');
      animateImageReveal('[data-animate="image"]');
      
      // Force refresh ScrollTrigger after everything is set up
      ScrollTrigger.refresh(true);
    }, 300);
    
    // Add resize event listener to refresh ScrollTrigger
    window.addEventListener('resize', () => {
      console.log('Window resized, refreshing animations');
      ScrollTrigger.refresh();
      if (scroll) scroll.update();
    });
  }, 100);
};

export default initAnimations;
