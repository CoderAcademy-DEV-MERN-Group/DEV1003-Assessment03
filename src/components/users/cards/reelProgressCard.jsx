import { useAuthContext } from "../../../contexts/useAuthContext";
import { useUserReelProgress } from "../../../utilities/customHooks";
import LoadingSpinner from "../../common/LoadingScreenOverlay";
import styles from "../UserComponents.module.scss";
import { motion } from "framer-motion";

export default function ReelProgressCard({ className }) {
  const { isAuthenticated } = useAuthContext();

  const { data, isLoading } = useUserReelProgress({
    enabled: isAuthenticated,
  });

  if (isLoading || !data) {
    return <LoadingSpinner />;
  }

  const progress = data.reelProgress.length;
  const progressPercentage = Math.min(progress, 100);

  return (
    <section className={className}>
      <article className={styles.cardBorder}>
        <h2>Your Cinematic Info</h2>

        <div className={styles.verticalProgressContainer}>
          <article className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              initial={{ height: "0%" }}
              animate={{ height: `${progressPercentage}%`, x: [0, -3, 3, -2, 2, 0] }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 1.5,
              }}
            />
          </article>
          <div className={styles.progressContent}>
            <h2>{progress}/100 Reel Canon Movies Watched!</h2>
            <div className={styles.percentage}>Your Popcorn Meter is at {progressPercentage}%!</div>
          </div>
        </div>
      </article>
    </section>
  );
}
