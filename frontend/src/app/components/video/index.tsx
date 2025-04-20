'use client'

import styles from './index.module.css'
import { useRef, useState, useCallback } from 'react'

// Range options for streaming chunk size
const RANGE_OPTIONS = [
  { size: 512 * 1024, label: '512KB' },
  { size: 1024 * 1024, label: '1MB' },
  { size: 2 * 1024 * 1024, label: '2MB' },
] as const;

const Video = () => {
  const [src, setSrc] = useState("http://localhost:8080/api/videos/videoplayback.mp4/stream");
  const ref = useRef<HTMLVideoElement>(null);
  const [rangeIndex, setRangeIndex] = useState<number>(1);
  const { size: currentRange, label: currentRangeFormatted } = RANGE_OPTIONS[rangeIndex];

  const handleRangeChange = useCallback(() => {
    setRangeIndex((prevIndex) => (prevIndex + 1) % RANGE_OPTIONS.length);
    setSrc(`http://localhost:8080/api/videos/videoplayback.mp4/stream?chunkSize=${currentRange}`);
  }, [currentRange]);

  return (
    <div>
      <video
        ref={ref}
        poster="https://i.redd.it/52f0fov6xznd1.jpeg"
        crossOrigin="anonymous"
        preload="auto"
        width="100%"
        height="100%"
        controls
        className={styles.videoContainerCss}
      >
        <source src={src} type="video/mp4" />
      </video>

      <button className={styles.buttonCss} onClick={handleRangeChange}>Change range value - {currentRangeFormatted}</button>
    </div>
  );
};

export default Video;