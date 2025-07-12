import { Toaster } from "react-hot-toast";

import AstrologyForm from "./components/astrology-form";

const App = () => {
  return (
    <div className="text-xl">
      <Toaster />
      <AstrologyForm />
    </div>
  );
};

export default App;
