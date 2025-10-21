// Campground data extracted from Happy Campers RV Rentals website

export interface Amenity {
  name: string;
  available: boolean;
}

export interface Campground {
  id: string;
  name: string;
  location: {
    area: string;
    distanceFromBend: string;
    specificLocation?: string;
  };
  description: string;
  amenities: Amenity[];
  activities: string[];
  contact: {
    website?: string;
    reservationsUrl?: string;
    phone?: string;
    address?: string;
  };
  googleReviewsSummary: {
    sentiment: string;
    highlights: string[];
    potentialIssues?: string[];
  };
  uniqueFeatures?: string[];
}

export const campgrounds: Campground[] = [
  {
    id: 'elk-lake-resort',
    name: 'Elk Lake Resort Campground',
    location: {
      area: 'Deschutes National Forest, Oregon',
      distanceFromBend: 'Under 1 hour RV drive',
    },
    description: 'Scenic campground in Deschutes National Forest offering rustic camping with beautiful lake and Cascade Mountain views. Features a restaurant with rustic American fare.',
    amenities: [
      { name: 'Bathrooms', available: true },
      { name: 'General Store', available: true },
      { name: 'Restaurant', available: true },
      { name: 'Electric Hookups', available: false },
      { name: 'Water Hookups', available: false },
      { name: 'Sewer Hookups', available: false },
      { name: 'RV Dump Station', available: false },
    ],
    activities: [
      'Paddleboarding',
      'Boating',
      'Fishing',
      'Kayaking',
      'Hiking',
    ],
    contact: {
      website: 'https://elklakeresort.net/',
      reservationsUrl: 'https://elklakeresort.net/resort/camping-rv-sites/',
    },
    googleReviewsSummary: {
      sentiment: 'Mostly positive',
      highlights: [
        'Beautiful lake and mountain views',
        'Great outdoor activities',
        'Quality restaurant food',
        'Famous Elk Burger',
      ],
      potentialIssues: [
        'Can be crowded',
        'Occasionally high prices',
        'Some service and cleanliness issues',
      ],
    },
    uniqueFeatures: [
      'Dry camping only',
      'Boat and equipment rentals available',
      'Restaurant on-site with recommended Elk Burger',
      'Accommodates various RV sizes',
    ],
  },
  {
    id: 'crane-prairie-resort',
    name: 'Crane Prairie Resort Campground',
    location: {
      area: 'Deschutes National Forest, Oregon',
      distanceFromBend: 'Under 1 hour RV drive',
      specificLocation: 'Near South Sister, Broken Top, and Mt. Bachelor',
    },
    description: 'Premier fishing destination in Deschutes National Forest known for its "Cranebow" trout. Offers full hookup RV sites with stunning mountain views.',
    amenities: [
      { name: 'Electric Hookups', available: true },
      { name: 'Water Hookups', available: true },
      { name: 'Sewer Hookups', available: true },
      { name: 'RV Dump Station', available: false },
      { name: 'Bathrooms', available: true },
      { name: 'General Store', available: true },
      { name: 'Restaurant', available: false },
    ],
    activities: [
      'Fishing (famous for Cranebow trout)',
      'Kayaking',
      'Guided fishing services',
      'Mountain and landscape viewing',
    ],
    contact: {
      website: 'https://www.craneprairieresort.com/',
      reservationsUrl: 'https://crane-prairie-resort.checkfront.com/reserve/',
    },
    googleReviewsSummary: {
      sentiment: 'Overwhelmingly positive',
      highlights: [
        'Stunning natural beauty',
        'Friendly staff',
        'Convenient store',
        'Excellent fishing opportunities',
        '5-star ratings common',
      ],
    },
    uniqueFeatures: [
      'Home to Eastern Brook Trout and Kokanee Salmon',
      'Full hookup RV sites available',
      'Famous for "Cranebow" trout fishing',
      'Scenic views of Central Oregon mountains',
    ],
  },
  {
    id: 'twin-lakes-resort',
    name: 'Twin Lakes Resort Campground',
    location: {
      area: 'Deschutes National Forest, Oregon',
      distanceFromBend: '45 minutes southwest',
      specificLocation: 'On South Twin Lake, near Deschutes Channel/Wickiup Reservoir',
    },
    description: 'Family-friendly resort on South Twin Lake offering full hookup RV sites, restaurant, and diverse water activities on a non-motorized lake.',
    amenities: [
      { name: 'Electric Hookups', available: true },
      { name: 'Water Hookups', available: true },
      { name: 'Sewer Hookups', available: true },
      { name: 'RV Dump Station', available: true },
      { name: 'Bathrooms', available: true },
      { name: 'General Store', available: true },
      { name: 'Restaurant', available: true },
    ],
    activities: [
      'Fishing (rainbow trout)',
      'Boating',
      'Kayaking',
      'Canoeing',
      'Paddleboarding',
      'Hiking (South Twin Lake Trail - 1.6 mile loop)',
    ],
    contact: {
      website: 'https://twinlakesresort.net/',
      reservationsUrl: 'https://twinlakesresort.net/accommodations/make-a-reservation',
    },
    googleReviewsSummary: {
      sentiment: 'Overwhelmingly positive',
      highlights: [
        'Beautiful scenery',
        'Variety of activities',
        'Friendly staff',
        'Good restaurant',
        'Clean, quiet campground',
      ],
    },
    uniqueFeatures: [
      'Non-motorized lake policy',
      'Lakeside cabins available',
      'Full hook-up RV sites with 30 amp electrical',
      'RV park across from lake',
      'South Twin Lake Trail for hiking',
    ],
  },
];

// Helper function to get campground by ID
export const getCampgroundById = (id: string): Campground | undefined => {
  return campgrounds.find(campground => campground.id === id);
};

// Helper function to filter campgrounds by amenity
export const getCampgroundsByAmenity = (amenityName: string): Campground[] => {
  return campgrounds.filter(campground => 
    campground.amenities.some(amenity => 
      amenity.name === amenityName && amenity.available
    )
  );
};

// Helper function to filter campgrounds by activity
export const getCampgroundsByActivity = (activity: string): Campground[] => {
  return campgrounds.filter(campground => 
    campground.activities.some(act => 
      act.toLowerCase().includes(activity.toLowerCase())
    )
  );
};