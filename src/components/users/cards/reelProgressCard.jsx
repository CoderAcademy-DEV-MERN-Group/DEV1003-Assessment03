import { useAuthContext } from "../../../contexts/useAuthContext";

export default function ReelProgressCard() {
  const { user } = useAuthContext();

  return <h2>Reel Progress: {user.reelProgress.length}/100 Reel Canon movies watched!</h2>;
}
