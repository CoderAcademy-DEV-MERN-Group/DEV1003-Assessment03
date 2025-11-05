import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getUserReelProgress,
  addMovieToReelProgress,
  updateReelProgressMovieRating,
  deleteMovieFromReelProgress,
} from "../services/apiServices";

// Create tanstack QUERY custom hook to GET user reel progress
export const useUserReelProgress = () =>
  useQuery({
    queryKey: ["user-reel-progress"],
    queryFn: getUserReelProgress,
  });

// Create tanstack MUTATION custom hook to ADD new movie to user reel progress
export const useAddMovieToReelProgress = () =>
  useMutation({
    mutationFn: addMovieToReelProgress,
  });

// Create tanstack MUTATION custom hook to UPDATE rating of movie in reel progress of logged in user
export const useUpdateReelProgressMovieRating = () =>
  useMutation({
    mutationFn: updateReelProgressMovieRating,
  });

// Create tanstack MUTATION custom hook to DELETE movie from reel progress for logged in user
export const useDeleteMovieFromReelProgress = () =>
  useMutation({
    mutationFn: deleteMovieFromReelProgress,
  });
