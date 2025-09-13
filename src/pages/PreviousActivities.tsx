import { useState, useEffect } from 'react';
import ActivityCard from '@/components/ActivityCard';
import { getActivities, Activity } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import { History, Trophy, Users, Camera, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock participant data
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
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            <Users className="h-5 w-5 text-blue-600" />
            Participants - {activity.name}
          </DialogTitle>
        </DialogHeader>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <TableHead className="font-semibold">S.No</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Roll No</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Award/Participation</TableHead>
                <TableHead className="font-semibold">College</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockParticipants.map((participant) => (
                <TableRow key={participant.sno} className="hover:bg-gray-50">
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 tech-bg-pattern">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-tech-slide-up">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
            <History className="h-8 w-8 text-white animate-tech-glow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Previous Activities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our successful past events and the amazing achievements of our students in various SABL activities.
          </p>
        </div>

        {/* Activities Timeline */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Event Timeline
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 animate-pulse overflow-hidden">
                  <div className="h-48 bg-gray-200 loading-shimmer"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3 loading-shimmer"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 loading-shimmer"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 loading-shimmer"></div>
                    <div className="h-10 bg-gray-200 rounded loading-shimmer"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {completedActivities
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="relative animate-tech-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ActivityCard activity={activity} />
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewParticipants(activity)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 animate-card-hover-lift"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-indigo-100 animate-card-hover-lift animate-tech-slide-up">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="h-6 w-6 text-white animate-tech-glow" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
              {completedActivities.length}
            </div>
            <div className="text-muted-foreground text-sm">Events Completed</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-green-100 animate-card-hover-lift animate-tech-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-white animate-celebration-pulse" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
              300+
            </div>
            <div className="text-muted-foreground text-sm">Total Participants</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-yellow-100 animate-card-hover-lift animate-tech-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-6 w-6 text-white animate-tech-glow" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-1">
              18
            </div>
            <div className="text-muted-foreground text-sm">Winners Crowned</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-pink-100 animate-card-hover-lift animate-tech-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="h-6 w-6 text-white animate-celebration-pulse" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-1">
              {totalPhotos}
            </div>
            <div className="text-muted-foreground text-sm">Photos Captured</div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-2xl animate-tech-slide-up">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-yellow-300 animate-winner-sparkle mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold">Success Stories</h2>
              <Sparkles className="h-8 w-8 text-yellow-300 animate-winner-sparkle ml-3" />
            </div>
            <p className="text-white/90 text-lg">
              Our previous activities have been stepping stones for many students' career growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-card-hover-lift">
              <div className="text-4xl mb-4 animate-celebration-pulse">💡</div>
              <h3 className="font-semibold text-white mb-2">Innovation Boost</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Students developed 15+ innovative projects through our hackathons and competitions
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-card-hover-lift" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl mb-4 animate-tech-glow">🚀</div>
              <h3 className="font-semibold text-white mb-2">Career Growth</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Many participants received internship offers and job placements after showcasing their skills
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-card-hover-lift" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl mb-4 animate-winner-sparkle">🤝</div>
              <h3 className="font-semibold text-white mb-2">Network Building</h3>
              <p className="text-white/80 text-sm leading-relaxed">
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