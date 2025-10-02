import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getActivity, Activity } from '@/lib/data-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Register = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      if (id) {
        setLoading(true);
        try {
          const currentActivity = await getActivity(id);
          setActivity(currentActivity || null);
          
          // If activity has a form link, redirect to it after a short delay
          if (currentActivity?.formLink) {
            setRedirecting(true);
            setTimeout(() => {
              window.location.href = currentActivity.formLink!;
            }, 2000); // 2 second delay to show the animation
          }
        } catch (error) {
          console.error('Error fetching activity:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md mx-auto w-full">
          <CardContent className="flex flex-col items-center justify-center p-8 sm:p-12">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-base sm:text-lg text-muted-foreground">Loading activity...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md mx-auto w-full">
          <CardContent className="text-center p-8 sm:p-12">
            <h2 className="text-xl sm:text-2xl font-bold text-destructive mb-4">Activity Not Found</h2>
            <p className="text-sm sm:text-base text-muted-foreground">The activity you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!activity.formLink) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md mx-auto w-full">
          <CardHeader>
            <CardTitle className="text-center text-lg sm:text-xl">Registration Unavailable</CardTitle>
          </CardHeader>
          <CardContent className="text-center p-4 sm:p-6">
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              No registration form is currently available for <strong>{activity.name}</strong>.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Please contact the organizers for registration details.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (redirecting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md mx-auto w-full">
          <CardHeader>
            <CardTitle className="text-center text-lg sm:text-xl">Redirecting to Registration</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-8 sm:p-12">
            <div className="relative mb-6 sm:mb-8">
              <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-primary"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 animate-fade-in-up text-center">
              Redirecting to {activity.name} Registration
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground text-center animate-fade-in-up px-4" style={{ animationDelay: '0.2s' }}>
              Please wait while we redirect you to the registration form...
            </p>
            <div className="flex space-x-1 mt-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default Register;
