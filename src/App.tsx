import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Racing from "./pages/Racing";
import Contact from "./pages/Contact";

import NotFound from "./pages/NotFound";
import BirdsList from "./pages/BirdsList";
import AddBird from "./pages/AddBird";
import Pedigree from "./pages/Pedigree";
import ScrollToTop from "./components/ScrollToTop"; // ← import it
import MyBirds from "./pages/AllBirds";
import EditBird from "./pages/EditBird";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />  {/* ← Add it here, inside BrowserRouter but outside Routes */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/racing" element={<Racing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />

          {/* Pedigree System */}
          <Route path="/birds" element={<BirdsList />} />          {/* All birds */}
          <Route path="/add-bird" element={<AddBird />} />         {/* Add new */}
          <Route path="/pedigree/:ring" element={<Pedigree />} />   {/* View pedigree */}
          <Route path="/my-birds" element={<MyBirds />} />
          <Route path="/edit-bird/:ring" element={<EditBird />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;