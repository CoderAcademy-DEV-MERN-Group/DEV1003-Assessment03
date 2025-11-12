export default function LeaderboardPodium({ rankings }) {
  return (
    <>
      <h2>Podium!</h2>
      <figure>
        <img src="src/assets/images/1st-prize.png" alt="1st Medal" />
        <figcaption>1st Place: {rankings[0]}</figcaption>
      </figure>

      <figure>
        <img src="src/assets/images/2nd-prize.png" alt="2nd Medal" />
        <figcaption>2nd Place: {rankings[1]}</figcaption>
      </figure>

      <figure>
        <img src="src/assets/images/3rd-prize.png" alt="3rd Medal" />
        <figcaption>3rd Place: {rankings[2]}</figcaption>
      </figure>
    </>
  );
}
