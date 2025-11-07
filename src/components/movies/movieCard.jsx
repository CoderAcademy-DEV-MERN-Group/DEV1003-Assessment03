import { motion } from "framer-motion";
import styles from "./MovieCard.module.scss";

export default function MovieCard({ movie, index, totalMovies }) {
  // Pink (330°) to Blue (240°) - going the long way around
  const startHue = 330;
  const endHue = 240;

  // This will go: Pink → Red → Orange → Yellow → Green → Blue
  const hue = startHue + (((index / totalMovies) * (endHue + 360 - startHue)) % 360);
  const pastel = `hsl(${hue}, 70%, 85%)`;

  return (
    <motion.div
      className={styles.card}
      whileHover={{
        scale: 1.8,
        zIndex: 50,
        rotateY: 5,
      }}
      whileTap={{ scale: 1.8 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 8, // Higher = more heavy/slow
        duration: 2.5,
      }}
      style={{
        transformOrigin: "center center", // This is key
      }}
    >
      {/* PASTEL BACKGROUND - Always visible */}
      <div className={styles.pastelBackground} style={{ backgroundColor: pastel }} />
      {/* POSTER - Only when revealed, ABOVE the pastel */}
      {movie.isRevealed && (
        <div
          className={styles.poster}
          style={{
            backgroundImage: `url(${movie.poster})`,
          }}
        />
      )}
      {movie.isRevealed && <div className={styles.posterOverlay} />}
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

        {movie.isRevealed && movie.rating !== null && (
          <div className={styles.revealed}>
            <p className={styles.rating}> ⭐ {movie.rating} stars!</p>
          </div>
        )}
      </article>
      {!movie.isRevealed && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <p>
              <strong>Director:</strong>
              <br />
              {movie.director}
            </p>
            <p>
              <strong>Starring:</strong>
              <br /> {movie.actors.join(", ")}
            </p>
            <p className={styles.plot}>{movie.plot || "No Plot currently available"}</p>
          </div>
        </div>
      )}
      ;
    </motion.div>
  );
}
