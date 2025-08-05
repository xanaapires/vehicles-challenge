import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { ROUTES } from "./utils/routes";
import { VehiclesList } from "./pages/VehiclesList";
import { Header } from "./components/Header";
import { VehicleDetails } from "./pages/VehicleDetails";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <main
          style={{
            padding: "24px",
            minHeight: "calc(100vh - 98px)",
            height: "100%",
            backgroundColor: "#f7f7f7",
          }}>
          <Routes>
            <Route path={ROUTES.LISTING} element={<VehiclesList />} />
            <Route path={ROUTES.VEHICLE_DETAILS} element={<VehicleDetails />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
