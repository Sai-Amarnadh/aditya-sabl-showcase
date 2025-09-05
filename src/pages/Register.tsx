import { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { getActivity, Activity } from '@/lib/data-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Register = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    collegeId: '',
    name: '',
    rollNo: '',
    branch: '',
    phone: '',
    section: '',
    willing: false,
  });

  useEffect(() => {
    const fetchActivity = async () => {
      if (id) {
        setLoading(true);
        try {
          const currentActivity = await getActivity(id);
          setActivity(currentActivity || null);
        } catch (error) {
          console.error('Error fetching activity:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchActivity();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, willing: checked }));
  };

  const handleBranchChange = (value: string) => {
    setFormData(prev => ({ ...prev, branch: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Registration Form Submitted:', formData);
    // Here you would typically send the data to a server
    alert('Registration submitted! Check the console for the data.');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {loading ? 'Loading...' : `Register for ${activity?.name}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : !activity ? (
              <div className="text-center">Activity not found</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="collegeId">College Mail ID</Label>
                  <Input id="collegeId" placeholder="john.doe@example.com" value={formData.collegeId} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="rollNo">Roll No.</Label>
                  <Input id="rollNo" placeholder="12345" value={formData.rollNo} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Select onValueChange={handleBranchChange} value={formData.branch}>
                    <SelectTrigger id="branch">
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ece">Electronics & Communication</SelectItem>
                      <SelectItem value="eee">Electrical & Electronics</SelectItem>
                      <SelectItem value="mech">Mechanical</SelectItem>
                      <SelectItem value="civil">Civil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1234567890" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Input id="section" placeholder="A" value={formData.section} onChange={handleInputChange} />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="willing" checked={formData.willing} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="willing">Are you willing to participate?</Label>
                </div>
                <Button type="submit" className="w-full">
                  Submit Registration
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
