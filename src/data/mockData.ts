export interface Winner {
  id: string;
  name: string;
  event: string;
  date: string;
  photo: string;
  year: string;
  isThisWeekWinner?: boolean;
}

export interface Activity {
  id: string;
  name: string;
  date: string;
  description: string;
  poster?: string;
  photos?: string[];
  status: 'upcoming' | 'completed';
}

export const winners: Winner[] = [
  {
    id: '1',
    name: 'Yamini CSE-4',
    event: 'Code Quest 2024',
    date: '2024-01-15',
    photo: '/api/placeholder/150/150',
    year: '2024',
    isThisWeekWinner: true
  },
  {
    id: '2',
    name: 'Priya Patel',
    event: 'Algorithm Championship',
    date: '2024-01-10',
    photo: '/api/placeholder/150/150',
    year: '2024',
    isThisWeekWinner: true
  },
  {
    id: '3',
    name: 'Arjun Reddy',
    event: 'Web Design Competition',
    date: '2024-01-08',
    photo: '/api/placeholder/150/150',
    year: '2024',
    isThisWeekWinner: true
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    event: 'Data Science Challenge',
    date: '2023-12-20',
    photo: '/api/placeholder/150/150',
    year: '2023'
  },
  {
    id: '5',
    name: 'Kiran Kumar',
    event: 'Mobile App Contest',
    date: '2023-12-15',
    photo: '/api/placeholder/150/150',
    year: '2023'
  },
  {
    id: '6',
    name: 'Anita Singh',
    event: 'AI Innovation Summit',
    date: '2023-12-10',
    photo: '/api/placeholder/150/150',
    year: '2023'
  }
];

export const activities: Activity[] = [
  {
    id: '1',
    name: 'Tech Symposium 2024',
    date: '2024-02-15',
    description: 'A comprehensive technical symposium featuring presentations on cutting-edge technologies in computer science and engineering.',
    poster: '/api/placeholder/400/600',
    status: 'upcoming'
  },
  {
    id: '2',
    name: 'Hackathon Weekend',
    date: '2024-02-20',
    description: '48-hour coding marathon where students compete to build innovative solutions to real-world problems.',
    poster: '/api/placeholder/400/600',
    status: 'upcoming'
  },
  {
    id: '3',
    name: 'Industry Expert Talk',
    date: '2024-02-25',
    description: 'Guest lecture by industry professionals sharing insights on current trends and career opportunities in technology.',
    status: 'upcoming'
  },
  {
    id: '4',
    name: 'Code Quest 2024',
    date: '2024-01-15',
    description: 'Programming competition testing algorithmic thinking and coding skills across multiple programming languages.',
    photos: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
    status: 'completed'
  },
  {
    id: '5',
    name: 'Algorithm Championship',
    date: '2024-01-10',
    description: 'Advanced algorithm design and optimization competition for senior students.',
    photos: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    status: 'completed'
  },
  {
    id: '6',
    name: 'Web Design Competition',
    date: '2024-01-08',
    description: 'Creative web design contest focusing on user experience and modern design principles.',
    photos: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
    status: 'completed'
  }
];

export const thisWeekWinners = winners.slice(0, 3);
