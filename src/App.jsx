import { Routes, Route } from "react-router-dom";
import { HOME, PROFILE, LEADERBOARD, REGISTER, REEL_CANON } from "./utilities/constants/routes";
import { Home, UserProfile, Leaderboard, Register, ReelCanon } from "./pages";
import "./styles/App.css";
// Import and add BoundaryError component and wrap Routes after merging back to main

export default function App() {
  return (
    <>
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={PROFILE} element={<UserProfile />} />
        <Route path={LEADERBOARD} element={<Leaderboard />} />
        <Route path={REGISTER} element={<Register />} />
        <Route path={REEL_CANON} element={<ReelCanon />} />
      </Routes>
    </>
  );
}
