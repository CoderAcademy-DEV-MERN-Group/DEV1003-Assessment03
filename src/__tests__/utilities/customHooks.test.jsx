import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, GlobalProviders } from "../testUtils";
import * as hooks from "../../utilities/customHooks";
import * as api from "../../utilities/services/apiServices";

// Render options with wrapper set as GlobalProviders, giving all global context to hooks
const renderArgs = { wrapper: GlobalProviders };
// Test data constants to keep tests DRY
const user = { email: "testuser@example.com", username: "testuser", password: "Password1!" };
const userRes = { id: 1, email: "testuser@example.com", username: "testuser" };
const friendship = { id: 2, user1: 1, user2: 3, requesterUserId: 1, friendRequestAccepted: true };
const movies = [
  { imdbId: "tt0111161", title: "The Shawshank Redemption", year: 1994 },
  { imdbId: "tt0068646", title: "The Godfather", year: 1972 },
];
const reelProgress = [
  { movieId: movies[0].imdbId, rating: 5, watchedDate: "2024-01-01" },
  { movieId: movies[1].imdbId, rating: 4, watchedDate: "2024-01-02" },
];
const users = [
  { id: 1, username: "user1", email: "user1@test.com" },
  { id: 2, username: "user2", email: "user2@test.com" },
];

// Helper function for testing custom hooks
const testMutationHook = async (hook, fakeApi, fakeRes, mutateParams = undefined) => {
  // Mock the API call to return the fake response
  vi.mocked(fakeApi).mockResolvedValue(fakeRes);
  // Render the hook with global providers and extract result for test
  const { result } = renderHook(hook, renderArgs);
  // Mutate the hook with params if provided
  result.current.mutate(mutateParams);
  // Mutate hook is async so await success
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  // Check that the data returned matches the fake response
  expect(result.current.data).toEqual(fakeRes);
};

beforeEach(() => {
  vi.clearAllMocks(); // Reset all fake API functions to clean state
});

// Test auth custom hooks work as expected
describe("Auth Custom Hooks", () => {
  // Test useRegisterUser hook works as expected
  it("should register a user and return success response with user data", async () => {
    await testMutationHook(
      hooks.useRegisterUser,
      api.registerUser,
      { success: true, message: "User registration complete", user: userRes },
      user
    );
  });
  // Test useLoginUser hook works as expected
  it("should login a user and return success response with user data", async () => {
    await testMutationHook(
      hooks.useLoginUser,
      api.loginUser,
      { success: true, message: "Login successful!", user: userRes },
      { email: user.email, password: user.password }
    );
  });
  // Test useLogoutUser hook works as expected
  it("should logout a user and return success response", async () => {
    await testMutationHook(hooks.useLogoutUser, api.logoutUser, {
      success: true,
      message: "Logout successful",
    });
  });
});

// Test friendship custom hooks work as expected
describe("Friendship Custom Hooks", () => {
  it("should get all friendships of current logged in user", async () => {
    // Expects array of friendship objects
    const friendships = [friendship];
    vi.mocked(api.getAllFriendships).mockResolvedValue(friendships);
    const { result } = renderHook(hooks.useAllFriendships, renderArgs);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(friendships);
  });
  // Test useCreateFriendship hook works as expected
  it("should create a new friendship and return success response with friendship data", async () => {
    const newFriendship = { id: 3, user1: 1, user2: 4, requesterUserId: 1 };
    await testMutationHook(
      hooks.useCreateFriendship,
      api.createFriendship,
      { success: true, message: "Friend request sent successfully", friendship: newFriendship },
      { user2: 4 }
    );
  });
  // Test useUpdateFriendship hook works as expected
  it("should update a friendship and return success response with updated friendship data", async () => {
    await testMutationHook(
      hooks.useUpdateFriendship,
      api.updateFriendship,
      { success: true, message: "Friend request accepted successfully", friendship },
      { requesterUserId: 1 }
    );
  });
  // Test useDeleteFriendship hook works as expected
  it("should delete a friendship and return success response with deleted friendship", async () => {
    await testMutationHook(
      hooks.useDeleteFriendship,
      api.deleteFriendship,
      {
        success: true,
        message: "Friendship document deleted successfully",
        deletedFriendship: friendship,
      },
      { otherUserId: 3 }
    );
  });
});

// Test leaderboard custom hook works as expected
describe("Leaderboard Custom Hook", () => {
  // Test useLeaderboard hook works as expected
  it("should get leaderboard data and return success response with leaderboard data", async () => {
    // Expects array of leaderboard objects
    const leaderboard = [
      { userId: 1, username: "user1", points: 150 },
      { userId: 2, username: "user2", points: 120 },
    ];
    vi.mocked(api.getLeaderboard).mockResolvedValue(leaderboard);
    const { result } = renderHook(hooks.useLeaderboard, renderArgs);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(leaderboard);
  });
});

// Test movie custom hooks work as expected
describe("Movie Custom Hooks", () => {
  // Test useAllMovies hook works as expected
  it("should get all movies and return movies array", async () => {
    vi.mocked(api.getAllMovies).mockResolvedValue(movies);
    const { result } = renderHook(hooks.useAllMovies, renderArgs);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(movies);
  });
  // Test useMovieByTitle hook works as expected
  it("should get movie by title and return movie object", async () => {
    vi.mocked(api.getMovieByTitle).mockResolvedValue(movies[0]);
    const { result } = renderHook(
      () => hooks.useMovieByTitle("The Shawshank Redemption"),
      renderArgs
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(movies[0]);
  });
  // Test useMovieByImdbId hook works as expected
  it("should get movie by IMDB ID and return movie object", async () => {
    vi.mocked(api.getMovieByImdbId).mockResolvedValue(movies[0]);
    const { result } = renderHook(() => hooks.useMovieByImdbId("tt0111161"), renderArgs);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(movies[0]);
  });
});

// Test reel progress custom hooks work as expected
describe("Reel Progress Custom Hooks", () => {
  // Test useUserReelProgress hook works as expected
  it("should get user reel progress and return reel progress array", async () => {
    vi.mocked(api.getUserReelProgress).mockResolvedValue(reelProgress);
    const { result } = renderHook(hooks.useUserReelProgress, renderArgs);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(reelProgress);
  });
  // Test useAddMovieToReelProgress hook works as expected
  it("should add movie to reel progress and return success response", async () => {
    await testMutationHook(
      hooks.useAddMovieToReelProgress,
      api.addMovieToReelProgress,
      {
        success: true,
        message: `${movies[0].title} added to your Reel Progress`,
        addedMovieId: movies[0].imdbId,
      },
      { movie: movies[0].imdbId }
    );
  });
  // Test useUpdateReelProgressMovieRating hook works as expected
  it("should update reel progress movie rating and return success response", async () => {
    await testMutationHook(
      hooks.useUpdateReelProgressMovieRating,
      api.updateReelProgressMovieRating,
      { success: true, message: "Rating updated", newRating: 5 },
      { movieId: movies[0].imdbId, rating: 5 }
    );
  });
  // Test useDeleteMovieFromReelProgress hook works as expected
  it("should delete movie from reel progress and return success response", async () => {
    await testMutationHook(
      hooks.useDeleteMovieFromReelProgress,
      api.deleteMovieFromReelProgress,
      { success: true, message: "Reel Progress record deleted successfully" },
      { movieId: movies[0].imdbId }
    );
  });
});

// Test user custom hooks work as expected
describe("User Custom Hooks", () => {
  // Test useAllUsers hook works as expected
  it("should get all users and return users array", async () => {
    vi.mocked(api.getAllUsers).mockResolvedValue(users);
    const { result } = renderHook(hooks.useAllUsers, renderArgs);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(users);
  });
  // Test useCurrentUser hook works as expected
  it("should get current user and return user object", async () => {
    vi.mocked(api.getCurrentUser).mockResolvedValue(userRes);
    const { result } = renderHook(hooks.useCurrentUser, renderArgs);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(userRes);
  });
  // Test useUpdateCurrentUser hook works as expected
  it("should update current user and return success response with updated user", async () => {
    const updatedUser = { ...userRes, username: "updateduser" };
    await testMutationHook(
      hooks.useUpdateCurrentUser,
      api.updateCurrentUser,
      { success: true, user: updatedUser },
      { username: "updateduser" }
    );
  });
  // Test useUpdateCurrentUserPassword hook works as expected
  it("should update current user password and return success response", async () => {
    await testMutationHook(
      hooks.useUpdateCurrentUserPassword,
      api.updateCurrentUserPassword,
      { success: true, message: "Password updated successfully" },
      { currentPassword: "Password1!", newPassword: "Password2!" }
    );
  });
  // Test useDeleteCurrentUser hook works as expected
  it("should delete current user and return success response", async () => {
    await testMutationHook(hooks.useDeleteCurrentUser, api.deleteCurrentUser, {
      success: true,
      message: "User profile deleted successfully",
      deletedUser: user,
    });
  });
});
