import { useReelCanonWithProgress } from "../../utilities/customHooks/useReelCanonWithProgress";

export default function ReelCanon() {}

const { movies, isLoading } = useReelCanonWithProgress();
console.log("Canon + Progress:", { movies, isLoading });
