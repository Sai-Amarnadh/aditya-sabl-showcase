import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, ScrollRestoration } from "react-router-dom";
import { DataProvider } from "./contexts/DataContext";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";
import Home from "./pages/Home";
import UpcomingActivities from "./pages/UpcomingActivities";
import ActivityDetail from "./pages/ActivityDetail";
import ActivityPhotos from "./pages/ActivityPhotos";
import PreviousActivities from "./pages/PreviousActivities";
import Winners from "./pages/Winners";
import WeeklyWinners from "./pages/WeeklyWinners";
import Gallery from "./pages/Gallery";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollRestoration />
          <DataProvider>
            <div className="min-h-screen bg-background">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upcoming" element={<UpcomingActivities />} />
              <Route path="/activity/:id" element={<ActivityDetail />} />
              <Route path="/activity/:id/photos" element={<ActivityPhotos />} />
                <Route path="/previous" element={<PreviousActivities />} />
                <Route path="/winners" element={<Winners />} />
                <Route path="/weekly-winners" element={<WeeklyWinners />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </DataProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
