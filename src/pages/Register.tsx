import { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getActivity, Activity } from '@/lib/data-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    willing: '',
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

  const handleWillingChange = (value: string) => {
    setFormData(prev => ({ ...prev, willing: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfrmnZLkrHqqTdbu9mKFCnxvZ_9y-mLyWxGT7wGLerQm2_R3A/formResponse';
    const formDataBody = new FormData();
    formDataBody.append('entry.1431817837', formData.collegeId);
    formDataBody.append('entry.1901415838', formData.name);
    formDataBody.append('entry.1067850696', formData.rollNo);
    formDataBody.append('entry.2123157265', formData.branch);
    formDataBody.append('entry.760150042', formData.phone);
    formDataBody.append('entry.579632687', formData.section);
    formDataBody.append('entry.1117961937', formData.willing);

    try {
      await fetch(googleFormUrl, {
        method: 'POST',
        body: formDataBody,
        mode: 'no-cors',
      });
      alert('Registration submitted successfully!');
      // Optionally, reset form
      setFormData({
        collegeId: '',
        name: '',
        rollNo: '',
        branch: '',
        phone: '',
        section: '',
        willing: '',
      });
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
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
                  <Input id="branch" placeholder="e.g., Computer Science" value={formData.branch} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1234567890" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Input id="section" placeholder="A" value={formData.section} onChange={handleInputChange} />
                </div>
                <div>
                  <Label>Are you willing to participate?</Label>
                  <RadioGroup onValueChange={handleWillingChange} value={formData.willing} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Yes" id="willing-yes" />
                      <Label htmlFor="willing-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="No" id="willing-no" />
                      <Label htmlFor="willing-no">No</Label>
                    </div>
                  </RadioGroup>
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
