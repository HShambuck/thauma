import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LenisProvider from "@/animations/LenisProvider";
import { ScrollTrigger } from "@/animations/registerGsap";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Work from "@/pages/Work";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      window.scrollTo(0, 0);
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <LenisProvider>
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
      </Routes>
      <Footer />
    </LenisProvider>
  );
}
