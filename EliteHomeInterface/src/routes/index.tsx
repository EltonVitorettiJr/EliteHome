import { Route, Routes } from "react-router";
import { Home } from "../containers/home";
import { Properties } from "../containers/properties";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/imoveis" element={<Properties />} />
    </Routes>
  );
};
