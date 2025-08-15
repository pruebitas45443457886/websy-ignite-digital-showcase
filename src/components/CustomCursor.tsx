import { useEffect, useState } from 'react';
import { COLORS } from '@/lib/animation';
import gsap from 'gsap';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    // Only enable custom cursor on desktop
    if (!mq.matches) return;
    
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = () => {
      const target = document.elementFromPoint(position.x, position.y);
      if (!target) return;
      
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        !!target.closest('a') || 
        !!target.closest('button') || 
        window.getComputedStyle(target).cursor === 'pointer' ||
        ((target as HTMLElement).dataset?.cursor === 'pointer');
        
      setIsPointer(isClickable);
    };
    
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    
    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);
    
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousemove', updateCursorType);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousemove', updateCursorType);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [position.x, position.y]);
  
  // Use GSAP for smoother cursor following instead of direct style
  useEffect(() => {
    gsap.to('.custom-cursor', {
      x: position.x,
      y: position.y,
      duration: 0.1,
      ease: 'power2.out'
    });
    
    gsap.to('.cursor-follower', {
      x: position.x,
      y: position.y,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, [position]);
  
  // No longer hiding default cursor to ensure users can interact with buttons properly
  useEffect(() => {
    // Only hide custom cursor on mobile, but keep default cursor always visible
    const mq = window.matchMedia('(max-width: 768px)');
    if (mq.matches) {
      setIsHidden(true);
    }
    
    // Keep default cursor visible for better usability
    document.body.style.cursor = 'auto';
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  return (
    <>
      <div 
        className="custom-cursor fixed pointer-events-none z-[9999]"
        style={{ 
          opacity: isHidden ? 0 : 1,
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)` 
        }}
      >
        <div 
          className={`rounded-full transform transition-all duration-200 mix-blend-difference ${
            isPointer ? 'scale-150' : isActive ? 'scale-75' : 'scale-100'
          }`}
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#fff',
            mixBlendMode: 'difference'
          }}
        />
      </div>
      
      <div 
        className="cursor-follower fixed pointer-events-none z-[9998]"
        style={{ 
          opacity: isHidden ? 0 : 0.2,
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          transition: 'transform 0.1s, opacity 0.3s' 
        }}
      >
        <div 
          className={`rounded-full transform transition-all duration-300 ${
            isPointer ? 'scale-150' : isActive ? 'scale-75' : 'scale-100'
          }`}
          style={{
            width: '40px',
            height: '40px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: isPointer ? COLORS.highlight : '#fff',
            mixBlendMode: 'difference'
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
