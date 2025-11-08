import { useState } from "react";

export default function About() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  if (shouldThrowError) {
    throw new Error("Test error to check error boundary!");
  }

  return (
    <div>
      <h1>Welcome to the About Page</h1>
      <p>This page provides information about our application and team.</p>

      {/* Test button for error boundary */}
      <button onClick={() => setShouldThrowError(true)}>Test Error Boundary</button>
    </div>
  );
}
