import ActivityCard from '@/components/ActivityCard';
import { activities } from '@/data/mockData';
import { History, Trophy, Users, Camera } from 'lucide-react';

const PreviousActivities = () => {
  const completedActivities = activities.filter(activity => activity.status === 'completed');
  const totalPhotos = completedActivities.reduce((sum, activity) => sum + (activity.photos?.length || 0), 0);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <History className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Previous Activities</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our successful past events and the amazing achievements of our students in various SABL activities.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-card text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <History className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">{completedActivities.length}</div>
            <div className="text-muted-foreground text-sm">Events Completed</div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-card text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">300+</div>
            <div className="text-muted-foreground text-sm">Total Participants</div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-card text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">18</div>
            <div className="text-muted-foreground text-sm">Winners Crowned</div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-card text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">{totalPhotos}</div>
            <div className="text-muted-foreground text-sm">Photos Captured</div>
          </div>
        </div>

        {/* Activities Timeline */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Event Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedActivities
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-16 bg-gradient-card rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Success Stories</h2>
            <p className="text-muted-foreground">
              Our previous activities have been stepping stones for many students' career growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 shadow-card">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="font-semibold text-card-foreground mb-2">Innovation Boost</h3>
              <p className="text-muted-foreground text-sm">
                Students developed 15+ innovative projects through our hackathons and competitions
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-card">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-semibold text-card-foreground mb-2">Career Growth</h3>
              <p className="text-muted-foreground text-sm">
                Many participants received internship offers and job placements after showcasing their skills
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-card">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-semibold text-card-foreground mb-2">Network Building</h3>
              <p className="text-muted-foreground text-sm">
                Strong connections formed between students, faculty, and industry professionals
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousActivities;