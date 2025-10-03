import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { FloatingShapes } from "@/components/FloatingShapes";
import authBg from "@/assets/auth-bg.jpg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      </div>
      
      <FloatingShapes />
      
      <div className="glass-card relative z-10 mx-4 max-w-md p-12 text-center shadow-3d">
        <div className="mb-8 inline-block">
          <h1 className="perspective-card bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-8xl font-bold text-transparent animate-glow">
            404
          </h1>
        </div>
        
        <h2 className="mb-4 text-2xl font-semibold text-foreground">
          Page Not Found
        </h2>
        
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-glow transition-smooth hover:bg-primary/90 hover:scale-105"
        >
          <Home className="h-4 w-4 transition-smooth group-hover:-translate-x-1" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
