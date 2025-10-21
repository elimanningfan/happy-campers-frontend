import { Campground } from '@/types/campground';

export const campgrounds: Campground[] = [
  {
    id: '1',
    name: 'Elk Lake Resort Campground',
    slug: 'elk-lake-resort-campground',
    location: 'Deschutes National Forest',
    region: 'Central Oregon',
    state: 'Oregon',
    distanceFrom: [
      {
        city: 'Bend',
        distance: '30 miles',
        driveTime: 'Under 1 hour'
      }
    ],
    description: 'Elk Lake Resort Campground is a scenic retreat nestled in the heart of the Deschutes National Forest, offering the perfect blend of rustic camping and stunning natural beauty. Located under an hour\'s RV drive from Bend, this family-friendly campground provides a peaceful escape with spectacular views of Mount Bachelor, South Sister, and the surrounding Cascade peaks. The resort offers dry camping sites (no hookups) that accommodate various RV sizes, making it ideal for those seeking an authentic outdoor experience without sacrificing comfort. The pristine lake environment is perfect for water activities, while the surrounding forest provides excellent hiking opportunities. What sets Elk Lake Resort apart is its combination of wilderness beauty and convenient amenities, including an on-site restaurant famous for its "Elk Burger" and rustic American fare.',
    excerpt: 'A scenic dry camping retreat in Deschutes National Forest with stunning Cascade Mountain views, famous Elk Burger restaurant, and excellent water activities.',
    featuredImage: '/images/campgrounds/elk-lake-hero.jpg',
    images: [
      '/images/campgrounds/elk-lake-1.jpg',
      '/images/campgrounds/elk-lake-2.jpg',
      '/images/campgrounds/elk-lake-3.jpg'
    ],
    amenities: {
      rvSites: true,
      electricHookups: false,
      waterHookups: false,
      sewerHookups: false,
      pullThroughSites: true,
      backInSites: true,
      dumpStation: false,
      wifi: false,
      restrooms: true,
      showers: true,
      laundry: false,
      petFriendly: true,
      picnicTables: true,
      firePits: true,
      generalStore: true,
      restaurant: true,
      boatRamp: true,
      boatRentals: true,
      fishing: true,
      swimming: true,
      hikingTrails: true,
      playground: false
    },
    activities: [
      'Paddleboarding',
      'Boating',
      'Fishing',
      'Swimming',
      'Hiking',
      'Wildlife viewing',
      'Photography',
      'Stargazing'
    ],
    uniqueFeatures: [
      'Dry camping only (no hookups) - authentic wilderness experience',
      'Famous "Elk Burger" at on-site restaurant with rustic American fare',
      'Stunning views of Mount Bachelor, South Sister, and Cascade peaks',
      'Spacious sites accommodate various RV sizes',
      'Direct lake access for water activities',
      'Reservations must be made directly with resort (not recreation.gov)'
    ],
    contact: {
      website: 'https://elklakeresort.net/',
      reservationUrl: 'https://elklakeresort.net/resort/camping-rv-sites/'
    },
    googleReviewsSummary: {
      sentiment: 'mostly positive',
      highlights: [
        'Breathtaking Cascade Mountain views',
        'Serene lake environment',
        'Excellent restaurant with famous Elk Burger',
        'Family-friendly atmosphere',
        'Great water activities'
      ],
      commonPraise: [
        'Beautiful location',
        'Stunning scenery',
        'Good restaurant food',
        'Peaceful setting',
        'Ideal for outdoor enthusiasts'
      ],
      summary: 'Guests consistently praise Elk Lake Resort for its spectacular natural setting with stunning Cascade Mountain views and serene lake environment. The resort\'s restaurant receives special mention for its famous "Elk Burger" and rustic American fare. While most reviews are positive about the beautiful location and family-friendly atmosphere, some guests note concerns about potential crowds during peak season and pricing. The dry camping format (no hookups) is generally appreciated by those seeking an authentic wilderness experience.'
    },
    coordinates: {
      lat: 43.9606,
      lng: -121.8022
    },
    campingTypes: ['RV', 'Tent'],
    seasonality: {
      openMonths: ['May', 'June', 'July', 'August', 'September', 'October'],
      peakSeason: ['July', 'August'],
      offSeason: ['May', 'October']
    },
    status: 'published',
    publishedAt: new Date('2024-12-20'),
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-20')
  },
  {
    id: '2',
    name: 'Crane Prairie Resort Campground',
    slug: 'crane-prairie-resort-campground',
    location: 'Deschutes National Forest',
    region: 'Central Oregon',
    state: 'Oregon',
    distanceFrom: [
      {
        city: 'Bend',
        distance: '45 miles',
        driveTime: '1 hour'
      }
    ],
    description: 'Crane Prairie Resort Campground is a premier destination for fishing enthusiasts and outdoor lovers, renowned throughout the Pacific Northwest for its world-class fishing opportunities. Located in the stunning Deschutes National Forest with dramatic views of South Sister, Broken Top, and Mt. Bachelor, this full-service campground offers the perfect base for exploring the Cascade Lakes region. The resort is famous for its "Cranebow" trout - massive rainbow trout that can grow to impressive sizes in the nutrient-rich waters. With full hookups including 30-amp power, water, and sewer connections, RV travelers can enjoy modern convenience while being surrounded by pristine wilderness. The resort also features Eastern Brook Trout and Kokanee Salmon, making it a true angler\'s paradise. Beyond fishing, the location offers stunning natural beauty, wildlife viewing opportunities, and access to numerous outdoor activities.',
    excerpt: 'World-renowned fishing destination famous for massive "Cranebow" trout, with full hookups and spectacular Cascade Mountain views.',
    featuredImage: '/images/campgrounds/crane-prairie-hero.jpg',
    images: [
      '/images/campgrounds/crane-prairie-1.jpg',
      '/images/campgrounds/crane-prairie-2.jpg',
      '/images/campgrounds/crane-prairie-3.jpg'
    ],
    amenities: {
      rvSites: true,
      electricHookups: true,
      waterHookups: true,
      sewerHookups: true,
      pullThroughSites: true,
      backInSites: true,
      dumpStation: true,
      wifi: false,
      restrooms: true,
      showers: true,
      laundry: true,
      petFriendly: true,
      picnicTables: true,
      firePits: true,
      generalStore: true,
      restaurant: false,
      boatRamp: true,
      boatRentals: true,
      fishing: true,
      swimming: true,
      hikingTrails: true,
      playground: false
    },
    activities: [
      'World-class fishing for "Cranebow" trout (massive rainbow trout)',
      'Eastern Brook Trout fishing',
      'Kokanee Salmon fishing',
      'Guided fishing services available',
      'Boating and water sports',
      'Kayaking and canoeing',
      'Wildlife viewing (osprey nesting sites, eagles)',
      'Bird watching',
      'Photography',
      'Mountain biking',
      'Hiking and nature walks'
    ],
    uniqueFeatures: [
      'Famous for "Cranebow" trout - massive rainbow trout unique to this location',
      'Full hookups: 30-amp electrical, water, and sewer connections',
      'Multiple fish species: Rainbow, Eastern Brook Trout, Kokanee Salmon',
      'Guided fishing services with local expertise',
      'Dramatic views of South Sister, Broken Top, and Mt. Bachelor',
      'Direct booking required through resort website only',
      'Well-stocked general store with fishing supplies',
      'Osprey nesting sites for wildlife viewing'
    ],
    contact: {
      website: 'https://www.craneprairieresort.com/',
      reservationUrl: 'https://crane-prairie-resort.checkfront.com/reserve/'
    },
    googleReviewsSummary: {
      sentiment: 'overwhelmingly positive',
      highlights: [
        'Exceptional fishing with massive "Cranebow" trout',
        'Stunning natural beauty with mountain views',
        'Friendly and knowledgeable staff',
        'Well-maintained facilities',
        'Convenient general store'
      ],
      commonPraise: [
        'World-class fishing opportunities',
        'Beautiful scenic location',
        'Clean and well-maintained sites',
        'Helpful staff with fishing expertise',
        'Peaceful mountain setting'
      ],
      summary: 'Crane Prairie Resort receives overwhelmingly positive reviews for its exceptional fishing opportunities, particularly the famous "Cranebow" trout that draw anglers from across the region. Guests consistently praise the stunning natural beauty with dramatic mountain views, friendly and knowledgeable staff who provide excellent fishing advice, and well-maintained facilities with full hookups. The convenient general store and peaceful mountain setting add to the overall excellent experience.'
    },
    coordinates: {
      lat: 43.7847,
      lng: -121.8486
    },
    campingTypes: ['RV', 'Tent'],
    seasonality: {
      openMonths: ['April', 'May', 'June', 'July', 'August', 'September', 'October'],
      peakSeason: ['June', 'July', 'August'],
      offSeason: ['April', 'October']
    },
    status: 'published',
    publishedAt: new Date('2024-12-20'),
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-20')
  },
  {
    id: '3',
    name: 'Twin Lakes Resort',
    slug: 'twin-lakes-resort',
    location: 'Deschutes National Forest',
    region: 'Central Oregon',
    state: 'Oregon',
    distanceFrom: [
      {
        city: 'Bend',
        distance: '50 miles',
        driveTime: '45 minutes southwest'
      }
    ],
    description: 'Twin Lakes Resort offers a uniquely serene camping experience on the shores of pristine South Twin Lake, one of the region\'s most peaceful non-motorized lakes. Located in the heart of the Deschutes National Forest, this family-friendly resort combines the tranquility of nature with comprehensive amenities, making it perfect for those seeking a peaceful retreat with all the comforts. The resort features full hook-up RV sites with 30-amp electrical connections, water hookups, and septic facilities, along with an on-site RV dump station. What makes Twin Lakes Resort truly special is its location on a non-motorized lake, ensuring a quiet, peaceful environment perfect for relaxation and nature enjoyment. The RV park is conveniently located across from the lake near the Deschutes Channel and Wickiup Reservoir, offering excellent fishing for rainbow trout and easy access to the scenic 1.6-mile South Twin Lake Trail loop.',
    excerpt: 'Uniquely peaceful non-motorized lakeside resort with full hookups, on-site restaurant, and excellent rainbow trout fishing.',
    featuredImage: '/images/campgrounds/twin-lakes-hero.jpg',
    images: [
      '/images/campgrounds/twin-lakes-1.jpg',
      '/images/campgrounds/twin-lakes-2.jpg',
      '/images/campgrounds/twin-lakes-3.jpg'
    ],
    amenities: {
      rvSites: true,
      electricHookups: true,
      waterHookups: true,
      sewerHookups: true,
      pullThroughSites: true,
      backInSites: true,
      dumpStation: true,
      wifi: true,
      restrooms: true,
      showers: true,
      laundry: true,
      petFriendly: true,
      picnicTables: true,
      firePits: true,
      generalStore: true,
      restaurant: true,
      boatRamp: true,
      boatRentals: true,
      fishing: true,
      swimming: true,
      hikingTrails: true,
      playground: true
    },
    activities: [
      'Rainbow trout fishing on South Twin Lake',
      'Non-motorized boating (canoes, kayaks, paddleboards)',
      'South Twin Lake Trail - scenic 1.6-mile loop hike',
      'Canoeing on peaceful waters',
      'Kayaking exploration',
      'Paddleboarding',
      'Swimming in pristine lake',
      'Wildlife viewing and bird watching',
      'Photography of scenic landscapes',
      'Family-friendly water activities',
      'Relaxation and quiet enjoyment'
    ],
    uniqueFeatures: [
      'South Twin Lake - pristine non-motorized lake ensuring peaceful environment',
      'Full hook-up RV sites with 30-amp electrical, water, and septic',
      'On-site RV dump station for convenience',
      'On-site restaurant with quality dining',
      'Located across from lake near Deschutes Channel/Wickiup Reservoir',
      'South Twin Lake Trail - beautiful 1.6-mile loop hike',
      'Family-friendly atmosphere with quiet environment',
      'Rainbow trout fishing opportunities',
      'Comprehensive amenities including WiFi',
      'Lakeside cabins also available'
    ],
    contact: {
      website: 'https://twinlakesresort.net/',
      reservationUrl: 'https://twinlakesresort.net/accommodations/make-a-reservation'
    },
    googleReviewsSummary: {
      sentiment: 'consistently positive',
      highlights: [
        'Beautiful scenery with pristine lake views',
        'Peaceful non-motorized lake environment',
        'Variety of outdoor activities',
        'Friendly and helpful staff',
        'Quality dining at on-site restaurant',
        'Clean and quiet campground'
      ],
      commonPraise: [
        'Tranquil and peaceful setting',
        'Beautiful natural scenery',
        'Excellent staff service',
        'Well-maintained facilities',
        'Great restaurant food',
        'Perfect for families'
      ],
      summary: 'Twin Lakes Resort receives consistently positive reviews for its beautiful scenery, peaceful non-motorized lake setting, and comprehensive amenities. Guests particularly appreciate the tranquil environment that the non-motorized lake provides, making it perfect for relaxation and family enjoyment. The resort is praised for its variety of activities, friendly staff, quality dining options, and clean, well-maintained facilities. The combination of natural beauty and convenient amenities makes it a favorite destination for those seeking a peaceful retreat.'
    },
    coordinates: {
      lat: 43.7139,
      lng: -121.7814
    },
    campingTypes: ['RV', 'Tent', 'Cabin'],
    seasonality: {
      openMonths: ['May', 'June', 'July', 'August', 'September'],
      peakSeason: ['July', 'August'],
      offSeason: ['May', 'September']
    },
    status: 'published',
    publishedAt: new Date('2024-12-20'),
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-20')
  }
];

// Helper functions
export function getCampgroundBySlug(slug: string): Campground | undefined {
  return campgrounds.find(campground => campground.slug === slug);
}

export function getCampgroundsByRegion(region: string): Campground[] {
  return campgrounds.filter(campground => 
    campground.region.toLowerCase() === region.toLowerCase()
  );
}

export function getCampgroundsByAmenity(amenity: keyof Campground['amenities']): Campground[] {
  return campgrounds.filter(campground => campground.amenities[amenity]);
}

export function getCampgroundsByActivity(activity: string): Campground[] {
  return campgrounds.filter(campground => 
    campground.activities.some(a => a.toLowerCase().includes(activity.toLowerCase()))
  );
}

export function getPublishedCampgrounds(): Campground[] {
  return campgrounds.filter(campground => campground.status === 'published');
}