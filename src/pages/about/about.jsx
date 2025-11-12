import { useState } from "react";
import ContactUs from "../../components/modals/ContactUs";

export default function About() {
  const [showContact, setShowContact] = useState(false);

  return (
    <div>
      <section>
        <h1>Welcome to the About Page</h1>
        <p>
          The Century Screening Room is a social movie collection platform built around the
          foundational goal of completing a curated list of 100 hand picked movies by our developer
          Joss, known as "The Reel Canon". Users can register and create their own profile to track
          their progress of watched movies via a Reel Score, mark them as watched and then rate the
          movies.
        </p>
        <br />
        <p>
          Whether you're a movie enthusiast, a competitor, a collector, someone who loves movies, or
          simple hate the feeling of being stuck choosing the next movie to watch, the Reel Canon
          offers 100 movies to choose from! Connect with friends and share your movie experiences
          and compete to see who can complete the 100 movies first! Check your ranking to see how
          you compare amongst other users on the Leaderboard.
        </p>
        <br />
        <p>
          This is the very first release version of The Century Screening Room. Stay tuned for more
          exciting features and updates!
        </p>
      </section>

      <section>
        <article>
          <h3>Joss</h3>
          <img src="src/assets/images/Joss.jpg" alt="Joss" />
          <p>
            Joss is an all rounder, but had a big influence on the Reel Canon and the user
            experience site-wide!
          </p>
          <a href="https://github.com/truth-josstice">Github Link</a>
        </article>

        <article>
          <h3>Jordan</h3>
          <img src="src/assets/images/Jordan.jpg" alt="Jordan" />
          <p>
            Jordan is a tester and framework dynamo, making the granular components that help this
            site run in the background!
          </p>
          <a href="https://github.com/jordanleal12">Github Link</a>
        </article>

        <article>
          <h3>Nhi</h3>
          <img src="src/assets/images/Nhi.png" alt="Nhi" />
          <p>
            Nhi is enthusiastic and loves styling! She helped finesse the final colours and theming
            for this site!
          </p>
          <a href="https://github.com/lulu-codes">Github Link</a>
        </article>
      </section>

      <p>
        P.S: Joss is the curator of the list of 100 movies in the Reel Canon (so, if you didn't
        enjoy his taste (...blame Joss 😂) or have any movie recommendations, please contact our
        team below).
      </p>
      <button onClick={() => setShowContact(true)}>Contact Us</button>
      <ContactUs isOpen={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}
