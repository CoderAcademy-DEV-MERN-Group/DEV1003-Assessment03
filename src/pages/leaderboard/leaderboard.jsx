import { useState } from "react";

export default function Leaderboard() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  if (shouldThrowError) {
    throw new Error("Test error to check error boundary!");
  }

  return (
    <div>
      <h1>Welcome to the Leaderboard Page</h1>
      <p>This page displays the leaderboard of the application.</p>

      {/* Test button for error boundary */}
      <button onClick={() => setShouldThrowError(true)}>Test Error Boundary</button>
    </div>
  );
}
