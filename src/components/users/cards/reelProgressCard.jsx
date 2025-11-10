import { useAuthContext } from "../../../contexts/useAuthContext";
import { useUserReelProgress } from "../../../utilities/customHooks";
import LoadingSpinner from "../../common/LoadingScreenOverlay";
import styles from "../UserComponents.module.scss";

export default function ReelProgressCard({ className }) {
  const { isAuthenticated } = useAuthContext();

  const { data } = useUserReelProgress({
    enabled: isAuthenticated,
  });

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <section className={className}>
      <fieldset className={styles.cardBorder}>
        <legend>Your Cinematic Info</legend>
        <h2>Reel Progress: {data.reelProgress.length}/100 Reel Canon movies watched!</h2>
      </fieldset>
    </section>
  );
}
