import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cartao from "./pages/Cartao";
import Inflacao from "./pages/Inflacao";
import Gastos from "./pages/Gastos";
import Poupanca from "./pages/Poupanca";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* SEO-friendly routes */}
          <Route path="perda-cartao" element={<Cartao />} />
          <Route path="perda-inflacao" element={<Inflacao />} />
          <Route path="perda-gastos" element={<Gastos />} />
          <Route path="perda-poupanca" element={<Poupanca />} />
          {/* Legacy redirects */}
          <Route path="cartao" element={<Navigate to="/perda-cartao" replace />} />
          <Route path="inflacao" element={<Navigate to="/perda-inflacao" replace />} />
          <Route path="gastos" element={<Navigate to="/perda-gastos" replace />} />
          <Route path="poupanca" element={<Navigate to="/perda-poupanca" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
