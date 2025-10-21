export interface Amenity {
  rvSites: boolean;
  electricHookups: boolean;
  waterHookups: boolean;
  sewerHookups: boolean;
  pullThroughSites: boolean;
  backInSites: boolean;
  dumpStation: boolean;
  wifi: boolean;
  restrooms: boolean;
  showers: boolean;
  laundry: boolean;
  petFriendly: boolean;
  picnicTables: boolean;
  firePits: boolean;
  generalStore: boolean;
  restaurant: boolean;
  boatRamp: boolean;
  boatRentals: boolean;
  fishing: boolean;
  swimming: boolean;
  hikingTrails: boolean;
  playground: boolean;
}

export interface Campground {
  id: string;
  name: string;
  slug: string;
  location: string;
  region: string;
  state: string;
  distanceFrom: {
    city: string;
    distance: string;
    driveTime: string;
  }[];
  description: string;
  excerpt: string;
  featuredImage: string;
  images: string[];
  amenities: Amenity;
  activities: string[];
  uniqueFeatures: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    reservationUrl?: string;
  };
  googleReviewsSummary: {
    sentiment: string;
    highlights: string[];
    commonPraise: string[];
    summary: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  campingTypes: ('RV' | 'Tent' | 'Cabin')[];
  seasonality: {
    openMonths: string[];
    peakSeason: string[];
    offSeason: string[];
  };
  pricing?: {
    rvSite?: {
      min: number;
      max: number;
      unit: string;
    };
    notes?: string;
  };
  status: 'published' | 'draft';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}