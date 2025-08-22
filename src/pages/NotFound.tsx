import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
          <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
