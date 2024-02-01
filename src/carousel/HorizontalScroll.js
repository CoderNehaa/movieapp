import React, { useRef, Children, cloneElement, useState } from 'react';

const HorizontalScroll = ({ children }) => {
  const scrollContainerRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(null);

  const scrollTo = (endX, duration) => {
    const container = scrollContainerRef.current;
    const startX = container.scrollLeft;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      container.scrollLeft = startX + progress * (endX - startX);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX !== null) {
      const touchEndX = e.touches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      const container = scrollContainerRef.current;
      container.scrollLeft -= deltaX;

      setTouchStartX(touchEndX);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    const itemWidth = container?.firstChild?.clientWidth;

    if (container && itemWidth) {
      const scrollAmount = direction === 'left' ? -itemWidth : itemWidth;
      scrollTo(container.scrollLeft + scrollAmount, 500);
    }
  };

  return (
    <div
      className='sticky'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <span
        className={`text-xl absolute bottom-1/2 left-4 text-gray-500 cursor-pointer hover:text-gray-100`}
        onClick={() => handleScroll('left')}
      >
        <i className="fa-solid fa-chevron-left z-10"></i>
      </span>

      <div
        className='flex overflow-hidden'
        ref={scrollContainerRef}
      >
        {Children.map(children, (child, index) =>
          cloneElement(child, { key: index })
        )}
      </div>

      <span
        className={`text-xl absolute bottom-1/2 right-4 text-gray-500 cursor-pointer hover:text-gray-100`}
        onClick={() => handleScroll('right')}
      >
        <i className="fa-solid fa-chevron-right z-10"></i>
      </span>
    </div>
  );
};

export default HorizontalScroll;
