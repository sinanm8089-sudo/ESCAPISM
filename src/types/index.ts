export interface Memory {
  id: string;
  src: string;
  title: string;
  category: Category;
  tags: string[];
  location?: string;
  date?: string;
  likes: number;
  isLiked: boolean;
  width: number;
  height: number;
  tripId?: string;
  reactions: {
    love: number;
    amazing: number;
    adventure: number;
  };
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
}

export type Category =
  | "all"
  | "mountains"
  | "camping"
  | "homestays"
  | "food"
  | "people"
  | "sunsets"
  | "travel"
  | "nature";

export interface CategoryInfo {
  id: Category;
  label: string;
  emoji: string;
  count: number;
}

export interface Trip {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  location: string;
  days: TripDay[];
  memories: Memory[];
}

export interface TripDay {
  day: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface Homestay {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  gallery: string[];
  amenities: string[];
  rating: number;
  location: string;
  coordinates: { lat: number; lng: number };
  priceRange: string;
}

export interface AdminStats {
  totalPhotos: number;
  totalTrips: number;
  totalUsers: number;
  totalDownloads: number;
  popularCategories: { category: string; count: number }[];
  uploadActivity: { date: string; count: number }[];
  downloadActivity: { date: string; count: number }[];
  categoryDistribution: { category: string; count: number }[];
}
