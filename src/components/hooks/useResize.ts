import { useEffect, useState } from "react";

export const useResize = (ref: React.RefObject<HTMLElement | null>) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    let timeout: ReturnType<typeof setTimeout>;

    const observer = new ResizeObserver(entries => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setWidth(entries[0].contentRect.width);
      }, 50);
    }); // as i understand it's uses like window.addEventListeners for react;

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return width;
};