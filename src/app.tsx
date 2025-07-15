import { Toaster } from "react-hot-toast";
import { AstrologyForm } from "./features/astrology";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/landing-page";

const App = () => {
  return (
    <div className="text-xl">
      <Toaster
        toastOptions={{
          style: {
            fontSize: "1.1rem",
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<AstrologyForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
