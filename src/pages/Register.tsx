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
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    'entry.1431817837': '',
    'entry.1901415838': '',
    'entry.1067850696': '',
    'entry.2123157265': '',
    'entry.760150042': '',
    'entry.579632687': '',
    'entry.1117961937': '',
  });

  useEffect(() => {
    const fetchActivity = async () => {
      if (id) {
        setLoading(true);
        try {
          const currentActivity = await getActivity(id);
          setActivity(currentActivity || null);
          
          // If activity has a form link, redirect to it
          if (currentActivity?.formLink) {
            window.location.href = currentActivity.formLink;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWillingChange = (value: string) => {
    setFormData(prev => ({ ...prev, 'entry.1117961937': value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // The form submission is handled by the form's action and target attributes.
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-primary mb-4 animate-fade-in-up">Success is on the way!</h2>
          <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Your registration has been submitted. Be ready!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <iframe name="hidden_iframe" id="hidden_iframe" style={{ display: 'none' }} onLoad={() => {
        if (submitted) {
          // The form has been successfully submitted to the iframe
        }
      }}></iframe>
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
            ) : !activity.formLink ? (
              <div className="text-center">
                <p className="text-muted-foreground">No registration form available for this activity.</p>
                <p className="text-sm text-muted-foreground mt-2">Please contact the organizers for registration details.</p>
              </div>
            ) : (
              <form
                action="https://docs.google.com/forms/d/e/1FAIpQLSfrmnZLkrHqqTdbu9mKFCnxvZ_9y-mLyWxGT7wGLerQm2_R3A/formResponse"
                method="POST"
                target="hidden_iframe"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="collegeId">College Mail ID</Label>
                  <Input name="entry.1431817837" id="collegeId" placeholder="john.doe@example.com" value={formData['entry.1431817837']} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input name="entry.1901415838" id="name" placeholder="John Doe" value={formData['entry.1901415838']} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="rollNo">Roll No.</Label>
                  <Input name="entry.1067850696" id="rollNo" placeholder="12345" value={formData['entry.1067850696']} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Input name="entry.2123157265" id="branch" placeholder="e.g., Computer Science" value={formData['entry.2123157265']} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input name="entry.760150042" id="phone" type="tel" placeholder="+1234567890" value={formData['entry.760150042']} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Input name="entry.579632687" id="section" placeholder="A" value={formData['entry.579632687']} onChange={handleInputChange} />
                </div>
                <div>
                  <Label>Are you willing to participate?</Label>
                  <RadioGroup onValueChange={handleWillingChange} value={formData['entry.1117961937']} className="flex space-x-4">
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
