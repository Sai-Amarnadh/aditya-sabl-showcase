import { useState, useEffect } from 'react';
import ActivityCard from '@/components/ActivityCard';
import { getActivities, Activity } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import { History, Trophy, Users, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getParticipants, Participant } from '@/lib/data-service';

const ParticipantsModal = ({ activity, isOpen, onClose }: { activity: Activity | null; isOpen: boolean; onClose: () => void }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchParticipants = async () => {
      if (activity && isOpen) {
        setLoading(true);
        try {
          const data = await getParticipants(activity.id);
          setParticipants(data);
        } catch (error) {
          console.error('Error fetching participants:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchParticipants();
  }, [activity, isOpen]);

  if (!activity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participants - {activity.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2">Loading participants...</span>
            </div>
          ) : participants.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">S.No</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Award/Participation</TableHead>
                    <TableHead>College</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((participant, index) => (
                    <TableRow key={participant.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{participant.department}</TableCell>
                      <TableCell>{participant.rollNumber}</TableCell>
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
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No participants found for this activity.</p>
            </div>
          )}
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
        const filteredActivities = allActivities.filter(activity =>
          activity.status === 'completed' &&
          activity.name !== 'Code Carnival' &&
          (!activity.photos || activity.photos.length !== 8)
        );
        setCompletedActivities(filteredActivities);
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
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-slide-up">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-2 sm:gap-0">
            <History className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-navy text-center">Previous Activities</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Explore our successful past events and the amazing achievements of our students in various SABL activities.
          </p>
        </div>

        {/* Activities Timeline */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-6 text-center">Event Timeline</h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="clean-card animate-pulse overflow-hidden">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-4 sm:p-6">
                    <div className="h-6 bg-muted rounded mb-3"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="h-8 bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {completedActivities
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((activity, index) => (
                  <div key={activity.id} className="relative animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ActivityCard activity={activity} />
                    <div className="mt-3 text-center px-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewParticipants(activity)}
                        className="btn-navy-outline w-full sm:w-auto"
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
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 my-8 sm:my-12">
          <div className="stats-card-navy text-center animate-slide-up">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <History className="h-6 w-6 text-white" />
            </div>
            <div className="text-xl sm:text-2xl font-bold mb-1">{completedActivities.length}</div>
            <div className="text-white/90 text-xs sm:text-sm">Events Completed</div>
          </div>
          
          <div className="stats-card-orange text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-xl sm:text-2xl font-bold mb-1">300+</div>
            <div className="text-white/90 text-xs sm:text-sm">Total Participants</div>
          </div>
          
          <div className="stats-card-navy text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="text-xl sm:text-2xl font-bold mb-1">18</div>
            <div className="text-white/90 text-xs sm:text-sm">Winners Crowned</div>
          </div>
          
          <div className="stats-card-navy text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <div className="text-xl sm:text-2xl font-bold mb-1">{totalPhotos}</div>
            <div className="text-white/90 text-xs sm:text-sm">Photos Captured</div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-12 sm:mt-16 stats-card-navy rounded-2xl p-6 sm:p-8 text-white shadow-elevated animate-slide-up mx-4 sm:mx-0">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Success Stories</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Our previous activities have been stepping stones for many students' career growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-soft">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="font-semibold text-white mb-2">Innovation Boost</h3>
              <p className="text-white/80 text-xs sm:text-sm">
                Students developed 15+ innovative projects through our hackathons and competitions
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-soft">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-semibold text-white mb-2">Career Growth</h3>
              <p className="text-white/80 text-xs sm:text-sm">
                Many participants received internship offers and job placements after showcasing their skills
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-soft">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-semibold text-white mb-2">Network Building</h3>
              <p className="text-white/80 text-xs sm:text-sm">
                Strong connections formed between students, faculty, and industry professionals
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <ParticipantsModal
        activity={selectedActivity}
        isOpen={isParticipantsModalOpen}
        onClose={() => setIsParticipantsModalOpen(false)}
      />
    </div>
  );
};

export default PreviousActivities;