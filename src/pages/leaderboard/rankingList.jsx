import { useLeaderboard } from "../../utilities/customHooks";

export default function RankingList({ title }) {
  const { data, isLoading, error } = useLeaderboard();
  const rankingData = data?.reelProgressData || [];

  const rankingTable = rankingData.map((user, index) => (
    <tr key={user._id}>
      <td>{index + 1}</td>
      <td>{user._id}</td>
      <td>{user.reelProgressCount}%</td>
    </tr>
  ));

  return (
    <>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Total % of Movies Watched</th>
          </tr>
        </thead>
        <tbody>{rankingTable}</tbody>
      </table>
    </>
  );
}
