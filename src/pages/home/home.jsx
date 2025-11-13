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
      <h1>The Century Screening Room!</h1>
      <section aria-label="Introduction to The Century Screening Room">
        <p>
          Welcome to The Century Screening Room, a site for avid film enjoyers to come together and
          explore classic and contemporary cinema. This site features a list of one hundred curated
          films that we firmly believe should be seen by every film enthusiast, casual or
          otherwise!.
        </p>

        <p>
          These curated films can be found in the Reel Canon section of the site. Users can create
          an account, tracking the films they have watched, and providing ratings if they so choose.
        </p>

        <p>
          Users can compete for their place on the leaderboard, with watching and rating films
          increasing their scores! What are you waiting for? Create an account and jump right into
          the world of cinema!
        </p>
      </section>

      <div className={styles.homeFeatures}>
        <MovieCarousel slides={randomMovies} options={{ loop: true }} />

        <LeaderboardPodium rankings={topRankings} />
      </div>
    </main>
  );
}
