import React, { useRef, useEffect, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

type LazyImageProps = { src: string, onLazyLoad: (imageNode: HTMLImageElement) => void };
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative;

export const LazyImage = ({ src, onLazyLoad, ...imageProps }: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='
  );
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const observador = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasLoaded) {
          setCurrentSrc(src);
          setHasLoaded(true);
          if (node.current) {
            onLazyLoad(node.current);
          }
        }
      });
    });

    if (node.current) {
      observador.observe(node.current);
    }

    return () => {
      observador.disconnect();
    };
  }, [src, onLazyLoad, hasLoaded]);

  return <img ref={node} src={currentSrc} {...imageProps} alt="" />;
};
