import { useLeaderboard } from "../../utilities/customHooks";
import styles from "./leaderboard.module.scss";

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
    <div className={styles.rankings}>
      <h2>{title}</h2>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Completion Percentage</th>
            </tr>
          </thead>
          <tbody>{rankingTable}</tbody>
        </table>
      </div>
    </div>
  );
}
