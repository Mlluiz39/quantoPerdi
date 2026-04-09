import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy loading all pages for Code Splitting (Reduces initial JS bundle dramatically)
const Home = lazy(() => import('./pages/Home'));
const PerdaInvestimento = lazy(() => import('./pages/PerdaInvestimento'));
const PerdaCartao = lazy(() => import('./pages/PerdaCartao'));
const GastosInvisiveis = lazy(() => import('./pages/GastosInvisiveis'));
const PerdaInflacao = lazy(() => import('./pages/PerdaInflacao'));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-16">
        <Suspense fallback={
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-pulse text-gray-500 font-medium">Carregando...</div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perda-poupanca" element={<PerdaInvestimento />} />
            <Route path="/perda-cartao" element={<PerdaCartao />} />
            <Route path="/gastos-invisiveis" element={<GastosInvisiveis />} />
            <Route path="/perda-inflacao" element={<PerdaInflacao />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </HelmetProvider>
  );
}
