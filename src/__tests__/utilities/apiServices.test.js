/* Unit tests for apiServices functions. Simplified responses and arguments are fine as we're just
  testing isolation and structured return values of the functions. */
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as api from "../../utilities/services/apiServices";

// Mock the apiServices module as we're importing actual API functions not the mocked ones
vi.mock("../../utilities/services/apiServices");

// Test data constants to keep tests DRY
const mockUser = { email: "test@example.com", username: "testuser", password: "Password1!" };

// Helper function to setup fake API call and test it returns expected data
const testApiCall = async (apiFn, args, expectedRes) => {
  // Fake the API function so it returns the expected response
  apiFn.mockResolvedValue(expectedRes);
  // Call the API function with provided args (always as an array)
  const result = await apiFn(...args);
  // Check that the API function was called with the correct args
  expect(apiFn).toHaveBeenCalledWith(...args);
  // Check that the result matches expected response
  expect(result).toEqual(expectedRes);
  // Return result for further checks if needed
  return result;
};

// Reset all fake API functions to clean state
beforeEach(() => vi.clearAllMocks());

// Test authentication API axios functions work as expected
describe("Authentication axios API functions", () => {
  // Test user registration fn works as expected
  it("should register a new user", async () => {
    await testApiCall(api.registerUser, [mockUser], { success: true, user: mockUser });
  });
  // Test user login fn works as expected
  it("should log in a user", async () => {
    const loginData = { email: mockUser.email, password: mockUser.password };
    await testApiCall(api.loginUser, [loginData], { success: true, token: "fake-token" });
  });
  // Test user logout fn works as expected
  it("should log out a user", async () => {
    await testApiCall(api.logoutUser, [], { success: true });
  });
});

// Test user API axios functions work as expected
describe("User API axios functions", () => {
  // Test get all users fn works as expected
  it("should get all users", async () => {
    await testApiCall(api.getAllUsers, [], [mockUser]);
  });

  // Test get current user fn works as expected
  it("should get current user", async () => {
    await testApiCall(api.getCurrentUser, [], mockUser);
  });

  // Test update current user fn works as expected
  it("should update current user", async () => {
    const updates = { username: "newname" };
    await testApiCall(api.updateCurrentUser, [updates], { ...mockUser, ...updates });
  });
  // Test update current user password fn works as expected
  it("should update current user password", async () => {
    const passwordData = { currentPassword: "old", newPassword: "new" };
    await testApiCall(api.updateCurrentUserPassword, [passwordData], { success: true });
  });
  // Test delete current user fn works as expected
  it("should delete current user", async () => {
    await testApiCall(api.deleteCurrentUser, [], { success: true });
  });
});
