import { RouterProvider } from "react-router-dom";
import ProviderLayout from "./ProviderLayout";
import { Router } from "./router"; // Ensure this matches the exported Router in router.jsx
import "./App.css";
import "@mantine/core/styles.css";

function App() {
  const router = Router(); // Use the Router function to get the router configuration
  return (
    <ProviderLayout>
      <RouterProvider router={router} />
    </ProviderLayout>
  );
}

export default App;
