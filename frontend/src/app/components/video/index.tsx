import styles from './index.module.css'
import Image from 'next/image'

const Video = () => {
  return (
    <div>
      <video
        crossOrigin="anonymous"
        preload="auto"
        width="100%"
        height="100%"
        controls
        src="http://localhost:8080/api/videos/videoplayback.mp4/stream"
        className={styles.videoContainerCss}
      >
        <Image src="/placeholder.png" alt="Video placeholder" width={1000} height={1000} />
      </video>
    </div>
  );
};

export default Video;