import { motion } from "framer-motion";
import styles from "./MovieCard.module.scss";

export default function MovieCard({ movie, index }) {
  // Generates the pastel color based on the movie's index in the array! nifty!
  const hue = (index * 137.508) % 360;
  const pastel = `hsl(${hue}, 70%, 85%)`;

  return (
    <motion.div
      className={styles.card}
      style={{
        "--card-color": pastel,
        backgroundImage: movie.isRevealed ? `url(${movie.poster})` : "none",
      }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.2 }}
    >
      {movie.isRevealed && <div className={styles.posterOverlay} />}

      <article className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.year}>{movie.year}</p>

        {movie.isRevealed && movie.rating !== null && (
          <div classNames={styles.revealed}>
            <p classNames={styles.rating}> ⭐ {movie.rating} stars!</p>
          </div>
        )}
      </article>

      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.overlayContent}>
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Actors:</strong> {movie.actors.join(", ")}
          </p>
          <p className={styles.plot}>{movie.plot || "No Plot currently available"}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
