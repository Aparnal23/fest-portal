import { Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import EventsBoard from "./pages/EventsBoard";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Moments from "./pages/Moments";
import Reach from "./pages/Reach";
import Lost from "./pages/Lost";

export default function App() {
  return (
    <div className="shell">
      <TopBar />
      <main className="stage">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/events" element={<EventsBoard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/moments" element={<Moments />} />
          <Route path="/reach" element={<Reach />} />
          <Route path="*" element={<Lost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
