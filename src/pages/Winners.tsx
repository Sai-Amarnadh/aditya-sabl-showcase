import { useState, useEffect } from 'react';
import { getWinners, Winner } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import WinnerCard from '@/components/WinnerCard';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import PageLoader from '@/components/PageLoader';

const Winners = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { dataChanged } = useData();

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setLoading(true);
        const data = await getWinners();
        setWinners(data);
        setError(null);
      } catch (err) {
        setError('Failed to load winners');
        console.error('Error fetching winners:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, [dataChanged]);

  if (loading) return <PageLoader />;

  if (error) {
    return (
      <div className="page-bg-clean">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg-clean">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <Trophy className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4 text-gradient-navy">All Winners</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Celebrating all our champions and their achievements
          </p>
        </div>

        {winners.length === 0 ? (
          <Card className="clean-card">
            <CardContent className="p-12 text-center">
              <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-primary">No Winners Yet</h3>
              <p className="text-muted-foreground">
                Winners will be displayed here once they are announced.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {winners.map((winner, index) => (
              <div key={winner.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <WinnerCard
                  winner={winner}
                  featured={winner.position === 1}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Winners;
