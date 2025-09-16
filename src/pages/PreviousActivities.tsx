import { useState, useEffect } from 'react';
import ActivityCard from '@/components/ActivityCard';
import { getActivities, Activity } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import { History, Trophy, Users, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
                      'bg-primary/10 text-primary'
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
    <div className="page-bg-clean">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex items-center justify-center mb-4">
            <History className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-gradient-navy">Previous Activities</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our successful past events and the amazing achievements of our students in various SABL activities.
          </p>
        </div>

        {/* Activities Timeline */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Event Timeline</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="clean-card animate-pulse overflow-hidden">
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
                .map((activity, index) => (
                  <div key={activity.id} className="relative animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ActivityCard activity={activity} />
                    <div className="mt-3 text-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewParticipants(activity)}
                        className="btn-navy-outline"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-12">
          <div className="stats-card-navy text-center animate-slide-up">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <History className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{completedActivities.length}</div>
            <div className="text-white/90 text-sm">Events Completed</div>
          </div>
          
          <div className="stats-card-light text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold mb-1 text-primary">300+</div>
            <div className="text-primary/80 text-sm">Total Participants</div>
          </div>
          
          <div className="stats-card-navy text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">18</div>
            <div className="text-white/90 text-sm">Winners Crowned</div>
          </div>
          
          <div className="stats-card-light text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold mb-1 text-primary">{totalPhotos}</div>
            <div className="text-primary/80 text-sm">Photos Captured</div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-16 stats-card-navy rounded-2xl p-8 text-white shadow-elevated animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
            <p className="text-white/90">
              Our previous activities have been stepping stones for many students' career growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-soft">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="font-semibold text-white mb-2">Innovation Boost</h3>
              <p className="text-white/80 text-sm">
                Students developed 15+ innovative projects through our hackathons and competitions
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-soft">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-semibold text-white mb-2">Career Growth</h3>
              <p className="text-white/80 text-sm">
                Many participants received internship offers and job placements after showcasing their skills
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-soft">
              <div className="text-4xl mb-4">🤝</div>
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