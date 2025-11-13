import LeaderboardPodium from "../../components/common/leaderboardPodium";
import RankingList from "./rankingList";
import { useLeaderboard } from "../../utilities/customHooks";
import styles from "./leaderboard.module.scss";

export default function Leaderboard() {
  const { data } = useLeaderboard();
  const topRankings = data?.reelProgressData.slice(0, 3).map((e) => e._id) || [];

  return (
    <section className={styles.leaderboard}>
      <article className={styles.title}>
        <h1>Leaderboard</h1>
      </article>
      <article className={styles.featureContainer}>
        <LeaderboardPodium className={styles.podium} rankings={topRankings} />
        <RankingList className={styles.list} title="Ranking List" />
      </article>
    </section>
  );
}
