import { useEffect, useState } from 'react';
import { COLORS } from '@/lib/animation';

const ScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how much has been scrolled
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollPercentage(scrolled);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call once to initialize
    handleScroll();
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div 
        className="h-40 w-1 rounded-full"
        style={{ background: `${COLORS.mediumBackground}40` }}
      >
        <div 
          className="w-full rounded-full transition-all duration-200"
          style={{ 
            height: `${scrollPercentage}%`, 
            background: `linear-gradient(to top, ${COLORS.highlight}, ${COLORS.lightAccent})`,
            boxShadow: `0 0 10px ${COLORS.highlight}80`
          }}
        />
      </div>
      
      {/* Percentage number */}
      <div 
        className="mt-2 text-xs font-medium text-center w-8"
        style={{ color: COLORS.highlight }}
      >
        {Math.round(scrollPercentage)}%
      </div>
    </div>
  );
};

export default ScrollProgress;
