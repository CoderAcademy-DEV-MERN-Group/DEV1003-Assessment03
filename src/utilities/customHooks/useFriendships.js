import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getAllFriendships,
  createFriendship,
  updateFriendship,
  deleteFriendship,
} from "../services/apiServices";

// Create tanstack QUERY custom hook to GET ALL existing friendships
export const useAllFriendships = () =>
  useQuery({
    queryKey: ["all-friendships"],
    queryFn: getAllFriendships,
  });

// Create tanstack MUTATION custom hook to CREATE new friendship (send friend request)
export const useCreateFriendship = () =>
  useMutation({
    mutationFn: createFriendship,
  });

// Create tanstack MUTATION custom hook to UPDATE friendship (accept friend request)
export const useUpdateFriendship = () =>
  useMutation({
    mutationFn: updateFriendship,
  });

// Create tanstack MUTATION custom hook to DELETE friendship (delete or unfriend existing friendship)
export const useDeleteFriendship = () =>
  useMutation({
    mutationFn: deleteFriendship,
  });
