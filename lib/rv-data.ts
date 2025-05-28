// Real RV data from Happy Campers RV Rentals

export interface RVFeatures {
  sleeping: string[];
  kitchen: string[];
  bathroom: string[];
  comfort: string[];
  entertainment: string[];
  safety: string[];
}

export interface RV {
  id: string;
  name: string;
  slug: string;
  type: 'Class A' | 'Class B' | 'Class B+' | 'Class C';
  category: 'Luxury RV' | 'Family RV' | 'Compact RV' | 'Van Life';
  year: number;
  make: string;
  model: string;
  sleeps: number;
  length: string;
  fuelType: 'Gas' | 'Diesel';
  transmission: 'Automatic' | 'Manual';
  class: string;
  pricePerDay: number;
  featured: boolean;
  description: string;
  highlights: string[];
  features: RVFeatures;
  images: string[];
  idealFor: string[];
}

export interface FilterOptions {
  type?: 'Class A' | 'Class B' | 'Class B+' | 'Class C';
  sleeps?: number;
  priceRange?: [number, number];
  length?: string;
}

export const rvData: RV[] = [
  {
    id: '2024-entegra-ethos-20d',
    name: '2024 Entegra Ethos 20D',
    slug: '2024-entegra-ethos-20d',
    type: 'Class B',
    category: 'Van Life',
    year: 2024,
    make: 'Entegra',
    model: 'Ethos 20D',
    sleeps: 2,
    length: '20 ft',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    class: 'Class B Camper Van',
    pricePerDay: 300,
    featured: true,
    description: 'Embark on your next adventure with the 2024 Entegra Ethos 20D, a cornerstone between luxury and versatility in the world of Class-B campers. Engineered for those who seek unrivaled comfort and unmatched capabilities on the road, this compact yet spacious camper is your gateway to limitless exploration.',
    highlights: [
      'Compact luxury with Mercedes-Benz chassis',
      'Diesel efficiency for long-range travel',
      'Premium finishes and intelligent storage',
      'Perfect for couples seeking adventure'
    ],
    features: {
      sleeping: ['Queen-size bed', 'Premium bedding'],
      kitchen: ['Fully-equipped kitchenette', 'Refrigerator', 'Microwave', 'Induction cooktop'],
      bathroom: ['Wet bath with shower', 'Toilet', 'Vanity'],
      comfort: ['Air conditioning', 'Heating system', 'LED lighting throughout'],
      entertainment: ['Smart TV', 'Bluetooth sound system'],
      safety: ['Backup camera', 'Lane assist', 'Collision prevention']
    },
    images: [
      'https://www.happycampersrvrentals.com/wp-content/uploads/2024/09/2024-Entegra-Ethos-20D-5-2-344x230.jpg',
      'https://www.happycampersrvrentals.com/wp-content/uploads/2024/02/ethos-344x230.jpg'
    ],
    idealFor: ['Couples', 'Solo travelers', 'Weekend getaways', 'Cross-country trips']
  },
  {
    id: '2023-thor-twist-2ab',
    name: '2023 Thor Twist 2AB',
    slug: '2023-thor-twist-2ab',
    type: 'Class B+',
    category: 'Compact RV',
    year: 2023,
    make: 'Thor',
    model: 'Twist 2AB',
    sleeps: 4,
    length: '21 ft',
    fuelType: 'Gas',
    transmission: 'Automatic',
    class: 'Class B+ Motorhome',
    pricePerDay: 300,
    featured: false,
    description: 'The 2023 Thor Twist 2AB offers versatile sleeping arrangements and efficient design in a compact package. Built on a RAM ProMaster chassis, this nimble RV is perfect for small families or couples who want extra sleeping capacity.',
    highlights: [
      'Sleeps up to 4 people comfortably',
      'RAM ProMaster reliability',
      'Easy to drive and park',
      'Great fuel economy'
    ],
    features: {
      sleeping: ['Rear twin beds convertible to king', 'Pop-top sleeping area'],
      kitchen: ['2-burner stove', 'Refrigerator/freezer', 'Microwave', 'Sink'],
      bathroom: ['Wet bath', 'Toilet', 'Shower'],
      comfort: ['Air conditioning', 'Furnace', 'Screen door'],
      entertainment: ['TV/DVD combo', 'Bluetooth stereo'],
      safety: ['Airbags', 'ABS brakes', 'Backup camera']
    },
    images: [
      'https://www.happycampersrvrentals.com/wp-content/uploads/2024/06/102A0483-344x230.jpg'
    ],
    idealFor: ['Small families', 'Couples with guests', 'First-time RVers']
  },
  {
    id: '2024-entegra-ethos-20t',
    name: '2024 Entegra Ethos 20T',
    slug: '2024-entegra-ethos-20t',
    type: 'Class B',
    category: 'Van Life',
    year: 2024,
    make: 'Entegra',
    model: 'Ethos 20T',
    sleeps: 2,
    length: '20 ft',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    class: 'Class B Camper Van',
    pricePerDay: 300,
    featured: true,
    description: 'Experience the freedom of the open road with the 2024 Entegra Ethos 20T. This premium Class B camper van combines Mercedes-Benz engineering with luxurious amenities, creating the perfect vehicle for discerning travelers.',
    highlights: [
      'Mercedes-Benz Sprinter chassis',
      'Turbo diesel engine',
      'Luxury interior appointments',
      'All-season capability'
    ],
    features: {
      sleeping: ['Murphy bed system', 'Premium mattress'],
      kitchen: ['Induction cooktop', 'Convection microwave', 'Compressor refrigerator'],
      bathroom: ['Spacious wet bath', 'Residential-style fixtures'],
      comfort: ['Truma Combi heating/hot water', 'Roof air conditioner', 'Power awning'],
      entertainment: ['HD TV', 'WiFi ready', 'USB charging stations'],
      safety: ['Advanced driver assistance', 'Crosswind assist', 'Attention assist']
    },
    images: [
      'https://www.happycampersrvrentals.com/wp-content/uploads/2024/02/ethos-344x230.jpg'
    ],
    idealFor: ['Luxury travelers', 'Couples', 'Business travelers', 'Long-term adventures']
  },
  {
    id: '2022-forest-river-sunseeker-3250ds-le',
    name: '2022 Forest River Sunseeker 3250DS LE',
    slug: '2022-forest-river-sunseeker-3250ds-le',
    type: 'Class C',
    category: 'Family RV',
    year: 2022,
    make: 'Forest River',
    model: 'Sunseeker 3250DS LE',
    sleeps: 8,
    length: '32 ft',
    fuelType: 'Gas',
    transmission: 'Automatic',
    class: 'Class C Motorhome',
    pricePerDay: 350,
    featured: true,
    description: 'The 2022 Forest River Sunseeker 3250DS LE is a spacious Class C motorhome perfect for large families. With double slide-outs and sleeping for 8, this RV offers all the comforts of home on the road.',
    highlights: [
      'Double slide-outs for maximum space',
      'Sleeps up to 8 people',
      'Bunk beds for kids',
      'Full-size residential amenities'
    ],
    features: {
      sleeping: ['Master bedroom with queen bed', 'Bunk beds', 'Dinette converts to bed', 'Sofa bed'],
      kitchen: ['Full kitchen with residential appliances', '3-burner stove', 'Oven', 'Large refrigerator'],
      bathroom: ['Full bathroom with separate shower', 'Toilet', 'Sink with vanity'],
      comfort: ['Ducted A/C', 'Furnace', 'Electric fireplace', 'Power awning with LED'],
      entertainment: ['Multiple TVs', 'DVD player', 'Outdoor entertainment center'],
      safety: ['Smoke detector', 'Carbon monoxide detector', 'Fire extinguisher']
    },
    images: [
      'https://www.happycampersrvrentals.com/wp-content/uploads/2020/05/2U1A0711-1-1-360x204.jpg'
    ],
    idealFor: ['Large families', 'Group travel', 'Extended vacations', 'Full-timing']
  },
  {
    id: '2022-forest-river-sunseeker-2850s-le',
    name: '2022 Forest River Sunseeker 2850S LE',
    slug: '2022-forest-river-sunseeker-2850s-le',
    type: 'Class C',
    category: 'Family RV',
    year: 2022,
    make: 'Forest River',
    model: 'Sunseeker 2850S LE',
    sleeps: 6,
    length: '30 ft',
    fuelType: 'Gas',
    transmission: 'Automatic',
    class: 'Class C Motorhome',
    pricePerDay: 325,
    featured: false,
    description: 'The 2022 Forest River Sunseeker 2850S LE offers the perfect balance of space and maneuverability. With a single slide-out and thoughtful design, it\'s ideal for families who want comfort without excessive size.',
    highlights: [
      'Single slide-out for extra living space',
      'Sleeps 6 comfortably',
      'Easy to drive and park',
      'Great for national parks'
    ],
    features: {
      sleeping: ['Queen bed in rear', 'Overhead bunk', 'Convertible dinette'],
      kitchen: ['3-burner stove', 'Microwave', 'Double-door refrigerator'],
      bathroom: ['Corner shower', 'Toilet', 'Medicine cabinet'],
      comfort: ['A/C with heat pump', 'LED lighting', 'MaxxAir fan'],
      entertainment: ['32" TV', 'Bluetooth stereo', 'Cable/satellite ready'],
      safety: ['Backup camera', 'Side-view cameras', 'Tire pressure monitoring']
    },
    images: [
      'https://www.happycampersrvrentals.com/wp-content/uploads/2020/05/2U1A0711-1-1-360x204.jpg'
    ],
    idealFor: ['Medium-sized families', 'First-time Class C renters', 'State park camping']
  },
  {
    id: '2022-forest-river-sunseeker-2440ds',
    name: '2022 Forest River Sunseeker 2440DS',
    slug: '2022-forest-river-sunseeker-2440ds',
    type: 'Class C',
    category: 'Compact RV',
    year: 2022,
    make: 'Forest River',
    model: 'Sunseeker 2440DS',
    sleeps: 5,
    length: '26 ft',
    fuelType: 'Gas',
    transmission: 'Automatic',
    class: 'Class C Motorhome',
    pricePerDay: 275,
    featured: false,
    description: 'The compact 2022 Forest River Sunseeker 2440DS is perfect for couples or small families. Despite its smaller size, it doesn\'t compromise on amenities, offering a full kitchen, bathroom, and comfortable sleeping arrangements.',
    highlights: [
      'Compact and maneuverable',
      'Diesel engine for better fuel economy',
      'Full amenities in a small package',
      'Perfect for couples'
    ],
    features: {
      sleeping: ['Queen bed', 'Overhead bunk', 'Dinette bed conversion'],
      kitchen: ['2-burner stove', 'Convection microwave', 'Compact refrigerator'],
      bathroom: ['Wet bath', 'Skylight', 'Power vent'],
      comfort: ['Roof A/C', 'Furnace', 'LED interior lighting'],
      entertainment: ['24" TV', 'AM/FM/Bluetooth stereo'],
      safety: ['Ford safety features', 'Backup camera', 'Smoke/CO detectors']
    },
    images: [
      'https://www.happycampersrvrentals.com/wp-content/uploads/2020/05/2U1A0711-1-1-360x204.jpg'
    ],
    idealFor: ['Couples', 'Small families', 'Weekend warriors', 'Easy driving experience']
  },
  {
    id: '2022-forest-river-sunseeker-2860ds',
    name: '2022 Forest River Sunseeker 2860DS',
    slug: '2022-forest-river-sunseeker-2860ds',
    type: 'Class C',
    category: 'Family RV',
    year: 2022,
    make: 'Forest River',
    model: 'Sunseeker 2860DS',
    sleeps: 6,
    length: '30 ft',
    fuelType: 'Gas',
    transmission: 'Automatic',
    class: 'Class C Motorhome',
    pricePerDay: 325,
    featured: false,
    description: 'The 2022 Forest River Sunseeker 2860DS features a rear bedroom layout that provides privacy and comfort. With dual slides, this motorhome maximizes living space while maintaining easy drivability.',
    highlights: [
      'Private rear bedroom',
      'Dual slide-outs',
      'Spacious living area',
      'Family-friendly layout'
    ],
    features: {
      sleeping: ['Queen bed in private bedroom', 'Overhead bunk', 'Sofa bed', 'Dinette conversion'],
      kitchen: ['Residential refrigerator', '3-burner stove with oven', 'Pantry storage'],
      bathroom: ['Glass shower door', 'Porcelain toilet', 'Large vanity'],
      comfort: ['15K BTU A/C', '30K BTU furnace', 'Heated tanks'],
      entertainment: ['40" TV in living area', 'Bedroom TV', 'Outdoor speakers'],
      safety: ['Emergency exit windows', 'Carbon monoxide detector', 'LP detector']
    },
    images: [
      'https://www.happycampersrvrentals.com/wp-content/uploads/2020/05/2U1A0711-1-1-360x204.jpg'
    ],
    idealFor: ['Families wanting privacy', 'Extended trips', 'Full-time RVing', 'Entertaining guests']
  },
  {
    id: '2021-winnebago-minnie-winnie-31k',
    name: '2021 Winnebago Minnie Winnie 31K',
    slug: '2021-winnebago-minnie-winnie-31k',
    type: 'Class C',
    category: 'Family RV',
    year: 2021,
    make: 'Winnebago',
    model: 'Minnie Winnie 31K',
    sleeps: 8,
    length: '31 ft',
    fuelType: 'Gas',
    transmission: 'Automatic',
    class: 'Class C Motorhome',
    pricePerDay: 350,
    featured: true,
    description: 'The 2021 Winnebago Minnie Winnie 31K is a family favorite with its bunk bed layout and spacious interior. Winnebago quality construction ensures reliability and comfort for your adventures.',
    highlights: [
      'Bunk beds perfect for kids',
      'Winnebago build quality',
      'Large holding tanks',
      'Outdoor entertainment center'
    ],
    features: {
      sleeping: ['Queen bed', 'Bunk beds', 'Overhead bunk', 'Dinette bed', 'Sofa bed'],
      kitchen: ['3-burner stove', 'Convection microwave', '10.7 cu ft refrigerator', 'Pantry'],
      bathroom: ['Radius shower', 'Porcelain toilet', 'Medicine cabinet', 'Skylight'],
      comfort: ['Coleman A/C', 'Truma AquaGo water heater', 'Powered patio awning'],
      entertainment: ['HDTV', 'King Connect WiFi extender', 'JBL premium sound'],
      safety: ['Rand McNally GPS', 'Backup camera system', 'ESP stability control']
    },
    images: [
      'https://www.happycampersrvrentals.com/wp-content/uploads/2020/06/2021-Minnie-Winnie-31H_noText.png'
    ],
    idealFor: ['Large families', 'Families with children', 'Long road trips', 'Group camping']
  },
  {
    id: '2021-winnebago-minnie-winnie-22m',
    name: '2021 Winnebago Minnie Winnie 22M',
    slug: '2021-winnebago-minnie-winnie-22m',
    type: 'Class C',
    category: 'Compact RV',
    year: 2021,
    make: 'Winnebago',
    model: 'Minnie Winnie 22M',
    sleeps: 4,
    length: '24 ft',
    fuelType: 'Gas',
    transmission: 'Automatic',
    class: 'Class C Motorhome',
    pricePerDay: 250,
    featured: false,
    description: 'The 2021 Winnebago Minnie Winnie 22M is the most compact in the Minnie Winnie lineup, perfect for couples or small families who want Winnebago quality in a more maneuverable package.',
    highlights: [
      'Most compact Minnie Winnie',
      'Easy to drive and park',
      'Full amenities',
      'Great fuel economy'
    ],
    features: {
      sleeping: ['Corner bed', 'Overhead bunk', 'Dinette conversion'],
      kitchen: ['2-burner stove', 'Microwave', '6 cu ft refrigerator'],
      bathroom: ['Corner shower', 'Toilet', 'Sink with storage'],
      comfort: ['13.5K BTU A/C', 'Furnace', 'LED lighting throughout'],
      entertainment: ['24" HDTV', 'Dash radio with backup camera'],
      safety: ['Ford SYNC', 'Airbags', 'Stability control']
    },
    images: [
      'https://www.happycampersrvrentals.com/wp-content/uploads/2020/06/2021-Minnie-Winnie-31H_noText.png'
    ],
    idealFor: ['Couples', 'Small families', 'First-time RVers', 'City exploration']
  },
  {
    id: '2021-winnebago-minnie-winnie-31h',
    name: '2021 Winnebago Minnie Winnie 31H',
    slug: '2021-winnebago-minnie-winnie-31h',
    type: 'Class C',
    category: 'Family RV',
    year: 2021,
    make: 'Winnebago',
    model: 'Minnie Winnie 31H',
    sleeps: 7,
    length: '31 ft',
    fuelType: 'Gas',
    transmission: 'Automatic',
    class: 'Class C Motorhome',
    pricePerDay: 350,
    featured: true,
    description: 'The 2021 Winnebago Minnie Winnie 31H features a unique floor plan with a rear entertainment center and versatile sleeping arrangements. Perfect for families who want space to relax and entertain.',
    highlights: [
      'Rear entertainment center',
      'Multiple sleeping options',
      'Spacious living area',
      'Premium Winnebago features'
    ],
    features: {
      sleeping: ['Queen bed', 'Bunk over cab', 'Jack-knife sofa', 'U-shaped dinette'],
      kitchen: ['3-burner range', 'Convection microwave', 'Double-door refrigerator', 'Flip-up countertop extension'],
      bathroom: ['24" x 36" shower', 'Porcelain toilet', 'Powered roof vent'],
      comfort: ['15K BTU A/C', 'Auto transfer switch', 'Heated holding tanks'],
      entertainment: ['40" HDTV', 'Soundbar', 'Blu-ray player', 'Exterior TV'],
      safety: ['Collision mitigation', 'Adaptive cruise control', '7" touchscreen dash radio']
    },
    images: [
      'https://www.happycampersrvrentals.com/wp-content/uploads/2020/06/2021-Minnie-Winnie-31H_NoText_.png'
    ],
    idealFor: ['Entertainment lovers', 'Families', 'Tailgating', 'Extended stays']
  }
];

// Helper functions for filtering and searching
export const filterRVs = (filters: FilterOptions): RV[] => {
  return rvData.filter(rv => {
    if (filters.type && rv.type !== filters.type) return false;
    if (filters.sleeps && rv.sleeps < filters.sleeps) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (rv.pricePerDay < min || rv.pricePerDay > max) return false;
    }
    if (filters.length) {
      const filterLength = parseInt(filters.length);
      const rvLength = parseInt(rv.length);
      if (rvLength > filterLength) return false;
    }
    return true;
  });
};

export const searchRVs = (query: string): RV[] => {
  const lowercaseQuery = query.toLowerCase();
  return rvData.filter(rv => 
    rv.name.toLowerCase().includes(lowercaseQuery) ||
    rv.description.toLowerCase().includes(lowercaseQuery) ||
    rv.make.toLowerCase().includes(lowercaseQuery) ||
    rv.model.toLowerCase().includes(lowercaseQuery)
  );
};

export const getRVBySlug = (slug: string): RV | undefined => {
  return rvData.find(rv => rv.slug === slug);
};

export const getFeaturedRVs = (): RV[] => {
  return rvData.filter(rv => rv.featured);
};

export const getRVsByType = (type: string): RV[] => {
  return rvData.filter(rv => rv.type === type);
};
