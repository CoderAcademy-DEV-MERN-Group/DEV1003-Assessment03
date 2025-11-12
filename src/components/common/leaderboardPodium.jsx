import styles from "../styles/LeaderboardPodium.module.scss";

export default function LeaderboardPodium({ rankings }) {
  return (
    <section className={styles.podiumSection}>
      <h2 className={styles.podiumTitle}>Leaderboard Podium!</h2>
      <div className={styles.podiumContainer}>
        <figure className={`${styles.podiumPlace} ${styles.first}`}>
          <img src="src/assets/images/1st-prize.png" alt="1st Medal" />
          <figcaption>
            1st Place: <br />
            {rankings[0]}
          </figcaption>
        </figure>

        <figure className={`${styles.podiumPlace} ${styles.second}`}>
          <img src="src/assets/images/2nd-prize.png" alt="2nd Medal" />
          <figcaption>
            2nd Place: <br />
            {rankings[1]}
          </figcaption>
        </figure>

        <figure className={`${styles.podiumPlace} ${styles.third}`}>
          <img src="src/assets/images/3rd-prize.png" alt="3rd Medal" />
          <figcaption>
            3rd Place: <br />
            {rankings[2]}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
