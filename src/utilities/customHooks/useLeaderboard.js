import { useQuery } from "@tanstack/react-query";
import { getLeaderboardData } from "../services/apiServices";

// Create tanstack fetch? custom hook to GET leaderboard data
export const useLeaderboardData = () =>
  useQuery({
    queryKey: ["leaderboard-data"],
    queryFn: getLeaderboardData,
  });
