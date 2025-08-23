import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from './components/AdminLayout';
import UpcomingActivities from './pages/admin/UpcomingActivities';
import PreviousActivities from './pages/admin/PreviousActivities';
import Winners from './pages/admin/Winners';
import WeeklyWinners from './pages/admin/WeeklyWinners';
import NotFound from "./pages/NotFound";
import PageLoader from './components/PageLoader';

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time
    const timer = setTimeout(() => setLoading(false), 2000); // Adjust time as needed
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
          <Routes>
            <Route path="/" element={<Navigate to="/admin/upcoming-activities" />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="upcoming-activities" />} />
              <Route path="upcoming-activities" element={<UpcomingActivities />} />
              <Route path="previous-activities" element={<PreviousActivities />} />
              <Route path="winners" element={<Winners />} />
              <Route path="weekly-winners" element={<WeeklyWinners />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
