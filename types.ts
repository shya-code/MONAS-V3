
export type UserRole = 'viewer' | 'streamer' | null;

export interface Channel {
  id: string;
  name: string;
  title: string;
  category: string;
  viewers: string;
  thumbnail: string;
  followers: string;
}

export interface Transaction {
  id: string;
  amount: number;
  timestamp: Date;
  type: 'payment' | 'earning';
  status: 'confirmed' | 'pending';
}

export interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: Date;
  isPoll?: boolean;
  pollData?: {
    question: string;
    options: { text: string; votes: number }[];
    totalVotes: number;
  };
  isIgnite?: boolean;
  igniteAmount?: string;
  tier?: 'Diamond' | 'Platinum' | 'Gold' | 'Silver';
}

export interface GameVote {
  id: string;
  title: string;
  votes: number;
}