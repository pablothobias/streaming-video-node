import Header from "./components/Header";
import Video from "./components/video";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.page}>
        <main className={styles.main}>
          <Video />
        </main>
    </div>
    </>
  );
}
