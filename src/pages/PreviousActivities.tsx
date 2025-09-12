import { useState, useEffect } from 'react';
import ActivityCard from '@/components/ActivityCard';
import { getActivities, Activity } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import { History, Trophy, Users, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock participant data - in a real app, this would come from your database
const mockParticipants = [
  { sno: 1, department: 'CSE', rollNo: 'CSE001', name: 'John Doe', award: '1st Place', college: 'Aditya University' },
  { sno: 2, department: 'CSE', rollNo: 'CSE002', name: 'Jane Smith', award: '2nd Place', college: 'Aditya University' },
  { sno: 3, department: 'ECE', rollNo: 'ECE001', name: 'Mike Johnson', award: '3rd Place', college: 'Aditya University' },
  { sno: 4, department: 'CSE', rollNo: 'CSE003', name: 'Sarah Wilson', award: 'Participation', college: 'Aditya University' },
  { sno: 5, department: 'IT', rollNo: 'IT001', name: 'David Brown', award: 'Participation', college: 'Aditya University' },
  { sno: 6, department: 'CSE', rollNo: 'CSE004', name: 'Emily Davis', award: 'Participation', college: 'Aditya University' },
  { sno: 7, department: 'ECE', rollNo: 'ECE002', name: 'Chris Miller', award: 'Participation', college: 'Aditya University' },
  { sno: 8, department: 'IT', rollNo: 'IT002', name: 'Lisa Garcia', award: 'Participation', college: 'Aditya University' },
];

const ParticipantsModal = ({ activity, isOpen, onClose }: { activity: Activity; isOpen: boolean; onClose: () => void }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participants - {activity.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Award/Participation</TableHead>
                <TableHead>College</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockParticipants.map((participant) => (
                <TableRow key={participant.sno}>
                  <TableCell>{participant.sno}</TableCell>
                  <TableCell>{participant.department}</TableCell>
                  <TableCell>{participant.rollNo}</TableCell>
                  <TableCell className="font-medium">{participant.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      participant.award === '1st Place' ? 'bg-yellow-100 text-yellow-800' :
                      participant.award === '2nd Place' ? 'bg-gray-100 text-gray-800' :
                      participant.award === '3rd Place' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {participant.award}
                    </span>
                  </TableCell>
                  <TableCell>{participant.college}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
const PreviousActivities = () => {
  const [completedActivities, setCompletedActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);

  const { dataChanged } = useData();

  const handleViewParticipants = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsParticipantsModalOpen(true);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const allActivities = await getActivities();
        setCompletedActivities(allActivities.filter(activity => activity.status === 'completed'));
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchActivities();
  }, [dataChanged]);

  const totalPhotos = completedActivities.reduce((sum, activity) => sum + (activity.photos?.length || 0), 0);

  return (
    <div className="min-h-screen bg-background vibrant-bg-3 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="page-decoration decoration-circle w-24 h-24 top-20 left-20 animate-float-simple"></div>
      <div className="page-decoration decoration-square w-18 h-18 top-40 right-16 animate-rotate-gentle"></div>
      <div className="page-decoration decoration-triangle bottom-32 left-1/4" style={{ animationDelay: '1.5s' }}></div>
      <div className="page-decoration decoration-circle w-14 h-14 bottom-40 right-1/3 animate-bounce-gentle" style={{ animationDelay: '2.5s' }}></div>
      <div className="page-decoration decoration-square w-10 h-10 top-1/3 left-10 animate-pulse-soft"></div>
      <div className="page-decoration decoration-circle w-20 h-20 top-1/2 right-20 animate-morph-gentle"></div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 relative z-10">
          <div className="flex items-center justify-center mb-4">
            <History className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">Previous Activities</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our successful past events and the amazing achievements of our students in various SABL activities.
          </p>
        </div>

        {/* Activities Timeline */}
        <div className="mb-8 relative z-10">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Event Timeline</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-card rounded-lg shadow-card animate-pulse overflow-hidden">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-6">
                    <div className="h-6 bg-muted rounded mb-3"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="h-8 bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {completedActivities
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((activity) => (
                  <div key={activity.id} className="relative">
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group card-hover">
                      {activity.poster && (
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={activity.poster} 
                            alt={activity.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-lg font-bold">{activity.name}</h3>
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        {!activity.poster && (
                          <h3 className="text-xl font-bold text-gray-800 mb-3">{activity.name}</h3>
                        )}
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(activity.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-3">{activity.description}</p>
                        <div className="flex gap-2">
                          <Button asChild className="flex-1">
                            <Link to={`/activity/${activity.id}`}>View Details</Link>
                          </Button>
                          {activity.photos && activity.photos.length > 0 && (
                            <Button asChild variant="outline">
                              <Link to={`/activity/${activity.id}/photos`}>Photos</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewParticipants(activity)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none hover:from-blue-600 hover:to-purple-700"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        View Participants
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-12 relative z-10">
          <div className="interactive-card bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 shadow-card text-center text-white animate-hover-lift">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <History className="h-6 w-6 text-white animate-rotate-gentle" />
            </div>
            <div className="text-2xl font-bold mb-1">{completedActivities.length}</div>
            <div className="text-white/90 text-sm">Events Completed</div>
          </div>
          
          <div className="interactive-card bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg p-6 shadow-card text-center text-white animate-hover-lift" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-white animate-bounce-gentle" />
            </div>
            <div className="text-2xl font-bold mb-1">300+</div>
            <div className="text-white/90 text-sm">Total Participants</div>
          </div>
          
          <div className="interactive-card bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg p-6 shadow-card text-center text-white animate-hover-lift" style={{ animationDelay: '0.4s' }}>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-6 w-6 text-white animate-wiggle" />
            </div>
            <div className="text-2xl font-bold mb-1">18</div>
            <div className="text-white/90 text-sm">Winners Crowned</div>
          </div>
          
          <div className="interactive-card bg-gradient-to-br from-pink-500 to-red-600 rounded-lg p-6 shadow-card text-center text-white animate-hover-lift" style={{ animationDelay: '0.6s' }}>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Camera className="h-6 w-6 text-white animate-float-simple" />
            </div>
            <div className="text-2xl font-bold mb-1">{totalPhotos}</div>
            <div className="text-white/90 text-sm">Photos Captured</div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-16 interactive-card bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white relative z-10 animate-celebration-glow">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4 animate-color-cycle">🌟 Success Stories 🌟</h2>
            <p className="text-white/90">
              Our previous activities have been stepping stones for many students' career growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="interactive-card bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-card animate-hover-lift">
              <div className="text-4xl mb-4 animate-bounce-gentle">💡</div>
              <h3 className="font-semibold text-white mb-2">Innovation Boost</h3>
              <p className="text-white/80 text-sm">
                Students developed 15+ innovative projects through our hackathons and competitions
              </p>
            </div>
            
            <div className="interactive-card bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-card animate-hover-lift" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl mb-4 animate-float-simple">🚀</div>
              <h3 className="font-semibold text-white mb-2">Career Growth</h3>
              <p className="text-white/80 text-sm">
                Many participants received internship offers and job placements after showcasing their skills
              </p>
            </div>
            
            <div className="interactive-card bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-card animate-hover-lift" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl mb-4 animate-wiggle">🤝</div>
              <h3 className="font-semibold text-white mb-2">Network Building</h3>
              <p className="text-white/80 text-sm">
                Strong connections formed between students, faculty, and industry professionals
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {selectedActivity && (
        <ParticipantsModal
          activity={selectedActivity}
          isOpen={isParticipantsModalOpen}
          onClose={() => setIsParticipantsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PreviousActivities;