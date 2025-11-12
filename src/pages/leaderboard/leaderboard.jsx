import LeaderboardPodium from "../../components/common/leaderboardPodium";
import RankingList from "./rankingList";
import { useLeaderboard } from "../../utilities/customHooks";

export default function Leaderboard() {
  const { data } = useLeaderboard();
  const topRankings = data?.reelProgressData.slice(0, 3).map((e) => e._id) || [];

  return (
    <>
      <h1>Leaderboard</h1>
      <LeaderboardPodium rankings={topRankings} />
      <RankingList title="Ranking List" />
    </>
  );
}
