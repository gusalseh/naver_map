import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesSetup from "./routes/RoutesSetup";

const App = () => {
  const REACT_APP_NAVER_MAPS_API_KEY = process.env
    .REACT_APP_NAVER_MAPS_API_KEY as string;

  if (!REACT_APP_NAVER_MAPS_API_KEY) {
    return <div>API Key is missing</div>;
  }

  return (
    <BrowserRouter>
      <RoutesSetup />
    </BrowserRouter>
  );
};

export default App;
