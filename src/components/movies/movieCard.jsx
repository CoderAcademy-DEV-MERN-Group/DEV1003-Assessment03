import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "./MovieCard.module.scss";
import {
  useAddMovieToReelProgress,
  useDeleteMovieFromReelProgress,
  useUpdateReelProgressMovieRating,
} from "../../utilities/customHooks/useReelProgress";
import StarRating from "../common/StarRating";
import CardLoadingOverlay from "../common/CardLoadingOverlay";
import { useAuthContext } from "../../contexts/useAuthContext";

export default function MovieCard({ movie, index, totalMovies }) {
  const { isAuthenticated } = useAuthContext();
  const { mutate: updateRating, isPending: isUpdating } = useUpdateReelProgressMovieRating();
  const { mutate: markAsWatched, isPending: isMarkingWatched } = useAddMovieToReelProgress();
  const { mutate: removeFromWatched, isPending: isRemovingWatched } =
    useDeleteMovieFromReelProgress();

  const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  // state to manage "fresh movies"
  const [wasWatchedAlready, setWasWatchedAlready] = useState(movie.isRevealed);

  // state to manage "clicked/hover" for mobile devices
  const [isTapped, setIsTapped] = useState(false);

  // Pink (330°) to Blue (240°) - going the long way around
  const startHue = 330;
  const endHue = 240;

  // This will go: Pink → Red → Orange → Yellow → Green → Blue
  const hue = startHue + (((index / totalMovies) * (endHue + 360 - startHue)) % 360);
  const pastel = `hsl(${hue}, 70%, 85%)`;

  const handleMarkAsWatched = async () => {
    if (isTouchDevice) setIsTapped(false);
    // Attach all data to the post customHook
    markAsWatched({
      movie: movie._id,
      isWatched: true,
      rating: null, // initial rating is 0
    });
  };

  const handleRatingChange = async (newRating) => {
    if (isTouchDevice) setIsTapped(false);
    // Attach newRating to the custom patch hook!
    updateRating({
      movieId: movie._id,
      rating: newRating,
    });
  };

  const handleRemoveFromWatched = async () => {
    if (isTouchDevice) setIsTapped(false);
    removeFromWatched({
      movieId: movie._id,
    });
    setWasWatchedAlready(false);
  };

  return (
    // Framer motion animation div, this will animate the card hover functions
    <motion.div
      className={styles.card}
      whileHover={
        !isTouchDevice
          ? {
              scale: 1.8,
              zIndex: 50,
              rotateY: 5,
            }
          : {}
      }
      onTapStart={() => {
        if (isTouchDevice) {
          setIsTapped(!isTapped);
        }
      }}
      animate={
        isTapped
          ? {
              scale: 1.4,
              zIndex: 50,
              rotateY: 5,
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 30,
      }}
      style={{
        transformOrigin: "center center", // ensures animation happens from the center of the card
      }}
    >
      {/* UNDO button for delete reelProgress API call */}
      {movie.isRevealed && (
        <button className={styles.undoButton} onClick={handleRemoveFromWatched}>
          🗑️
        </button>
      )}
      {/* Loading overlay for cards, passed the message prop depending on what's loading */}
      {(isUpdating || isMarkingWatched || isRemovingWatched) && (
        <CardLoadingOverlay
          message={
            isMarkingWatched ? `Adding ${movie.title} to your Reel Progress...` : "Updating..."
          }
        />
      )}
      {/* AnimatePresence - animates based on state - Pastel background layer */}
      <AnimatePresence>
        {!movie.isRevealed && (
          <motion.div
            className={styles.pastelBackground}
            style={{ backgroundColor: pastel }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          />
        )}
      </AnimatePresence>
      {/* Animate Presence - POSTER - show if revealed, animate if transitioning*/}
      <AnimatePresence>
        {movie.isRevealed && (
          <motion.div
            className={styles.poster}
            style={{ backgroundImage: `url(${movie.poster})` }}
            initial={!wasWatchedAlready ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: !wasWatchedAlready ? 2 : 0 }}
          />
        )}
      </AnimatePresence>
      {/* Overlay ONLY for movies that were already revealed on page load */}
      {wasWatchedAlready && <div className={styles.posterOverlay} />}
      <article className={styles.content}>
        <h3 className={`${styles.title} ${movie.isRevealed ? styles.revealedText : ""}`}>
          {movie.title}
        </h3>
        <p className={`${styles.year} ${movie.isRevealed ? styles.revealedText : ""}`}>
          {movie.year}
        </p>
        <p className={`${styles.genres} ${movie.isRevealed ? styles.revealedText : ""}`}>
          {movie.genre.join(", ")}
        </p>

        {movie.isRevealed && (
          <div className={styles.ratingSection}>
            <StarRating
              initialRating={movie.userRating || movie.rating || 0}
              onRatingChange={handleRatingChange}
              isSubmitting={isUpdating}
            />
          </div>
        )}
      </article>
      {!movie.isRevealed && (
        <div className={`${styles.overlay} ${isTapped ? styles.overlayMobile : ""}`}>
          <div className={styles.overlayContent}>
            <p>
              <strong>Director</strong>
              <br />
              {movie.director}
            </p>
            <p>
              <strong>Starring</strong>
              <br /> {movie.actors.join(", ")}
            </p>
            <p className={styles.plot}>{movie.plot || "No plot currently available"}</p>
            {isAuthenticated && (
              <button className={styles.markAsWatchedButton} onClick={handleMarkAsWatched}>
                Mark as Watched
              </button>
            )}
          </div>
        </div>
      )}
      ;
    </motion.div>
  );
}
