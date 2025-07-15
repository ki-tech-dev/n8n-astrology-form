import { Toaster } from "react-hot-toast";
import { AstrologyForm } from "./features/astrology";
import { Route, Routes } from "react-router";
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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<AstrologyForm />} />
      </Routes>
    </div>
  );
};

export default App;
