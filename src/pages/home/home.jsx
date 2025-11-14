// import { useState } from "react";
import LeaderboardPodium from "../../components/common/leaderboardPodium";
import { useLeaderboard, useAllMovies } from "../../utilities/customHooks";
import MovieCarousel from "./movieCarousel";
import ErrorMessage from "../../components/common/ErrorMessage";
import { sampleSize } from "lodash-es";
import styles from "../../styles/Home.module.scss";

export default function Home() {
  const { data, error: leaderboardError, isLoading: leaderboardLoading } = useLeaderboard();
  const { data: canon, isLoading: canonLoading, error: canonError } = useAllMovies();
  // Create array of 7 random reel-canon movies using lodash sampleSize
  const randomMovies = sampleSize(canon?.movies || [], 7);

  if (canonLoading || leaderboardLoading) {
    return <>Loading...</>;
  }

  if (canonError || leaderboardError) {
    return <ErrorMessage error={canonError || leaderboardError} />;
  }

  const topRankings = data?.reelProgressData.slice(0, 3).map((e) => e._id) || [];
  return (
    <main className={styles.home}>
      <h1>The Century Screening Room</h1>
      <section aria-label="Introduction to The Century Screening Room">
        <p>
          Welcome to The Century Screening Room! What are you waiting for! Create an account, check
          out the leaderboard, start your journey!
        </p>

        <p>If you want to know more about the site and it's devs, head over to the About page! </p>
      </section>

      <div className={styles.homeFeatures}>
        <MovieCarousel slides={randomMovies} options={{ loop: true }} />

        <LeaderboardPodium rankings={topRankings} />
      </div>
    </main>
  );
}
