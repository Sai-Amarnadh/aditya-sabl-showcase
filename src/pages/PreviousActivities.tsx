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
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Users className="h-5 w-5 text-primary" />
            Participants - {activity.name}
          </DialogTitle>
        </DialogHeader>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
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
                <TableRow key={participant.sno} className="hover:bg-muted/50">
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
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary rounded-full mb-6">
            <History className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Previous Activities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our successful past events and the amazing achievements of our students in various SABL activities.
          </p>
        </div>

        {/* Activities Timeline */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8 text-primary">
            Event Timeline
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-card rounded-xl shadow-lg border animate-pulse overflow-hidden">
                  <div className="h-48 bg-muted loading-shimmer"></div>
                  <div className="p-6">
                    <div className="h-6 bg-muted rounded mb-3 loading-shimmer"></div>
                    <div className="h-4 bg-muted rounded mb-2 loading-shimmer"></div>
                    <div className="h-4 bg-muted rounded mb-4 loading-shimmer"></div>
                    <div className="h-10 bg-muted rounded loading-shimmer"></div>
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
                    className="relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ActivityCard activity={activity} onViewParticipants={handleViewParticipants} />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-card rounded-xl p-6 shadow-lg text-center border">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">
              {completedActivities.length}
            </div>
            <div className="text-muted-foreground text-sm">Events Completed</div>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-lg text-center border">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">
              300+
            </div>
            <div className="text-muted-foreground text-sm">Total Participants</div>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-lg text-center border">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">
              18
            </div>
            <div className="text-muted-foreground text-sm">Winners Crowned</div>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-lg text-center border">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">
              {totalPhotos}
            </div>
            <div className="text-muted-foreground text-sm">Photos Captured</div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-primary/10 rounded-2xl p-8 text-foreground">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold">Success Stories</h2>
              <Sparkles className="h-8 w-8 text-primary ml-3" />
            </div>
            <p className="opacity-90 text-lg">
              Our previous activities have been stepping stones for many students' career growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="font-semibold text-foreground mb-2">Innovation Boost</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Students developed 15+ innovative projects through our hackathons and competitions
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-semibold text-foreground mb-2">Career Growth</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Many participants received internship offers and job placements after showcasing their skills
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-semibold text-foreground mb-2">Network Building</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
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