import { useState } from "react";
import { UserInfoCard } from "../../components/users";

export default function UserProfile() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  if (shouldThrowError) {
    throw new Error("Test error to check error boundary!");
  }

  return (
    <div>
      <h1>Welcome to the User Profile Page</h1>
      <p>This is the User Profile page of the application.</p>
      <UserInfoCard />

      {/* Test button for error boundary */}
      <button onClick={() => setShouldThrowError(true)}>Test Error Boundary</button>
    </div>
  );
}
