/* Unit tests for AuthProvider context and useAuthContext hook. Tests auth state management,
  localStorage token handling, and the login/logout/updateUser functions */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, act, GlobalProviders } from "../testUtils";
import { useAuthContext } from "../../contexts/useAuthContext";
import * as api from "../../utilities/services/apiServices";

// Mock localStorage cache to emulate setting, getting and removing JWT tokens
const fakeCache = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
// Override global window.localStorage with fakeCache mock
Object.defineProperty(window, "localStorage", { value: fakeCache });

// Test data constants to keep tests DRY
const user = { id: 1, username: "testuser", email: "test@example.com" };
const token = "fake-jwt-token-12345";
// Helper function to render useAuthContext hook using GlobalProviders as wrapper to give context
const renderAuthHook = () => renderHook(() => useAuthContext(), { wrapper: GlobalProviders });

// Reset all mocks before each test to ensure clean state
beforeEach(() => vi.clearAllMocks());

// Clear fake localStorage cache after each test
afterEach(() => {
  fakeCache.getItem.mockReset();
  fakeCache.setItem.mockReset();
  fakeCache.removeItem.mockReset();
});

// Test that useAuthContext hook works correctly and enforces provider usage
describe("useAuthContext hook", () => {
  // Test that using useAuthContext throws error when used outside AuthProvider
  it("should throw error when used outside AuthProvider", () => {
    expect(() => renderHook(useAuthContext)).toThrow(
      "useAuthContext must be used within an AuthProvider"
    );
  });

  // Test that it returns auth context when used inside AuthProvider
  it("should return auth context when used inside AuthProvider", async () => {
    // No token as we're just testing context properties here
    fakeCache.getItem.mockReturnValue(null);
    // Wrapper function that wraps hook with AuthProvider (not using GlobalProviders to isolate)
    const { result } = renderAuthHook();
    // Wait for loading to finish before checking context values or it will be in loading state
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    // Extract keys from context object and check they match expected keys
    const contextKeys = Object.keys(result.current);
    expect(contextKeys).toEqual([
      "user",
      "isAuthenticated",
      "isLoading",
      "login",
      "logout",
      "updateUser",
    ]);
  });
});
