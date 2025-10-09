import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, User, Award, Calendar, Trophy } from 'lucide-react';
import { getStudentPerformance } from '@/lib/data-service';
import { format } from 'date-fns';

const StudentPerformance = () => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!pin.trim()) {
      setError('Please enter a PIN number');
      return;
    }

    setLoading(true);
    setError('');
    setPerformanceData(null);

    try {
      const data = await getStudentPerformance(pin.trim());
      
      if (!data) {
        setError('No student found with this PIN number');
      } else {
        setPerformanceData(data);
      }
    } catch (err) {
      setError('Error fetching student performance data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Student Performance</h1>
            <p className="text-muted-foreground">View your activity participation and marks</p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search by PIN Number
              </CardTitle>
              <CardDescription>
                Enter your PIN number to view your performance details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="pin">PIN Number</Label>
                  <Input
                    id="pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your PIN (e.g., 21A51A0501)"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </div>
              
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Student Details & Performance */}
          {performanceData && (
            <div className="space-y-6">
              {/* Student Info Card */}
              <Card>
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Student Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">PIN Number</p>
                      <p className="text-lg font-semibold">{performanceData.student.pin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="text-lg font-semibold">{performanceData.student.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Branch</p>
                      <p className="text-lg font-semibold">{performanceData.student.branch}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Year</p>
                      <p className="text-lg font-semibold">{performanceData.student.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Section</p>
                      <p className="text-lg font-semibold">{performanceData.student.section}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Marks</p>
                      <p className="text-lg font-semibold text-primary flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        {performanceData.totalMarks} marks
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Participations Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Activity Participations
                  </CardTitle>
                  <CardDescription>
                    {performanceData.participations.length} activities participated
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {performanceData.participations.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No participations recorded yet
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Activity</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Award</TableHead>
                            <TableHead className="text-right">Marks</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {performanceData.participations.map((participation: any) => (
                            <TableRow key={participation.id}>
                              <TableCell className="font-medium">
                                {participation.activityName}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  {participation.activityDate ? 
                                    format(new Date(participation.activityDate), 'MMM dd, yyyy') 
                                    : 'N/A'}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={
                                  participation.award === '1st Place' ? 'default' :
                                  participation.award === '2nd Place' ? 'secondary' :
                                  participation.award === '3rd Place' ? 'outline' :
                                  'secondary'
                                }>
                                  {participation.award}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right font-semibold text-primary">
                                {participation.marks || 2}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
      </div>
    </div>
  );
};

export default StudentPerformance;
