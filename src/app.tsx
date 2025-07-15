import { Toaster } from "react-hot-toast";

import AstrologyForm from "./components/astrology-form";

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
      <AstrologyForm />
    </div>
  );
};

export default App;
