import { BlogPost, Category, Tag, Author } from '@/types/blog';

export const authors: Author[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@happycampersrv.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    bio: 'RV enthusiast and adventure seeker with 10+ years of experience exploring the Pacific Northwest.'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@happycampersrv.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    bio: 'Outdoor photographer and RV lifestyle blogger. Passionate about sustainable travel.'
  }
];

export const categories: Category[] = [
  { id: '1', name: 'RV Tips', slug: 'rv-tips', description: 'Expert advice for RV owners and renters', postCount: 8 },
  { id: '2', name: 'Destinations', slug: 'destinations', description: 'Best places to visit with your RV', postCount: 12 },
  { id: '3', name: 'Maintenance', slug: 'maintenance', description: 'Keep your RV in top condition', postCount: 6 },
  { id: '4', name: 'Lifestyle', slug: 'lifestyle', description: 'Living the RV dream', postCount: 10 }
];

export const tags: Tag[] = [
  { id: '1', name: 'Beginners', slug: 'beginners', postCount: 15 },
  { id: '2', name: 'Pacific Northwest', slug: 'pacific-northwest', postCount: 20 },
  { id: '3', name: 'Camping', slug: 'camping', postCount: 18 },
  { id: '4', name: 'Road Trip', slug: 'road-trip', postCount: 22 },
  { id: '5', name: 'Safety', slug: 'safety', postCount: 8 },
  { id: '6', name: 'Budget Travel', slug: 'budget-travel', postCount: 12 }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Essential RV Camping Tips for Beginners',
    slug: '10-essential-rv-camping-tips-beginners',
    excerpt: 'New to RV camping? These essential tips will help you have a smooth and enjoyable first adventure on the road.',
    content: `<h2>Getting Started with RV Camping</h2>
    <p>RV camping offers the perfect blend of adventure and comfort, allowing you to explore the great outdoors without sacrificing the conveniences of home. Whether you're planning your first RV trip or looking to improve your camping experience, these essential tips will help you make the most of your journey.</p>
    
    <h3>1. Practice Driving and Parking</h3>
    <p>Before hitting the road, spend time practicing in an empty parking lot. Get comfortable with the size of your RV, practice backing up, and learn how much space you need for turns.</p>
    
    <h3>2. Make Reservations Early</h3>
    <p>Popular campgrounds fill up quickly, especially during peak season. Book your spots well in advance to ensure you have a place to stay.</p>
    
    <h3>3. Pack Light but Smart</h3>
    <p>RVs have weight limits, so pack only what you need. Focus on multi-purpose items and remember that many campgrounds have laundry facilities.</p>
    
    <h3>4. Learn Your RV's Systems</h3>
    <p>Before your trip, familiarize yourself with your RV's water, electrical, and waste systems. Know how to hook up utilities and troubleshoot common issues.</p>
    
    <h3>5. Create a Pre-Trip Checklist</h3>
    <p>Develop a comprehensive checklist for setting up and breaking down camp. This ensures you don't forget important steps like retracting awnings or disconnecting utilities.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80',
    author: authors[0],
    categories: [categories[0], categories[3]],
    tags: [tags[0], tags[2]],
    status: 'published',
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
    seo: {
      title: '10 Essential RV Camping Tips for Beginners | Happy Campers Blog',
      description: 'Learn the essential RV camping tips every beginner needs to know for a successful adventure.',
      keywords: ['RV camping', 'beginners guide', 'camping tips', 'RV travel']
    },
    views: 1250,
    readingTime: 5
  },
  {
    id: '2',
    title: 'Best RV-Friendly Destinations in the Pacific Northwest',
    slug: 'best-rv-destinations-pacific-northwest',
    excerpt: 'Discover the most stunning RV-friendly destinations in the Pacific Northwest, from coastal highways to mountain retreats.',
    content: `<h2>Exploring the Pacific Northwest by RV</h2>
    <p>The Pacific Northwest is a paradise for RV travelers, offering diverse landscapes, stunning natural beauty, and well-maintained campgrounds. From rugged coastlines to towering mountains, this region has something for every outdoor enthusiast.</p>
    
    <h3>1. Oregon Coast Highway 101</h3>
    <p>This scenic route offers breathtaking ocean views, charming coastal towns, and numerous RV-friendly campgrounds. Don't miss Cannon Rock, the Sea Lion Caves, and the historic lighthouses along the way.</p>
    
    <h3>2. Mount Rainier National Park</h3>
    <p>Experience the majesty of Mount Rainier with several RV-accessible campgrounds. The park offers hiking trails, wildflower meadows, and stunning mountain vistas.</p>
    
    <h3>3. Columbia River Gorge</h3>
    <p>This dramatic canyon offers waterfalls, hiking trails, and scenic viewpoints. Many campgrounds accommodate RVs and provide easy access to attractions like Multnomah Falls.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&q=80',
    author: authors[1],
    categories: [categories[1]],
    tags: [tags[1], tags[3]],
    status: 'published',
    publishedAt: new Date('2024-01-22'),
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-22'),
    seo: {
      title: 'Best RV Destinations in Pacific Northwest | Happy Campers',
      description: 'Explore the top RV-friendly destinations in the Pacific Northwest with our comprehensive guide.',
      keywords: ['Pacific Northwest', 'RV destinations', 'camping spots', 'road trip']
    },
    views: 980,
    readingTime: 7
  },
  {
    id: '3',
    title: 'RV Maintenance Checklist: Keep Your Home on Wheels Running Smoothly',
    slug: 'rv-maintenance-checklist',
    excerpt: 'Regular maintenance is key to a trouble-free RV experience. Follow this comprehensive checklist to keep your RV in top condition.',
    content: `<h2>Essential RV Maintenance Guide</h2>
    <p>Proper maintenance is crucial for ensuring your RV remains safe, comfortable, and ready for adventure. This comprehensive checklist will help you stay on top of essential maintenance tasks.</p>
    
    <h3>Monthly Maintenance Tasks</h3>
    <ul>
      <li>Check tire pressure and condition</li>
      <li>Test all lights and signals</li>
      <li>Inspect battery connections</li>
      <li>Run generator for at least 2 hours</li>
      <li>Check and clean air filters</li>
    </ul>
    
    <h3>Seasonal Maintenance</h3>
    <p>Before each camping season, perform these important checks:</p>
    <ul>
      <li>Inspect roof seals and caulking</li>
      <li>Service air conditioning units</li>
      <li>Flush and sanitize water systems</li>
      <li>Test all appliances</li>
      <li>Lubricate moving parts</li>
    </ul>`,
    featuredImage: 'https://images.unsplash.com/photo-1563784462041-5f97ac9523dd?w=800&q=80',
    author: authors[0],
    categories: [categories[2]],
    tags: [tags[4]],
    status: 'published',
    publishedAt: new Date('2024-02-01'),
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-02-01'),
    seo: {
      title: 'Complete RV Maintenance Checklist | Happy Campers Blog',
      description: 'Keep your RV running smoothly with our comprehensive maintenance checklist and expert tips.',
      keywords: ['RV maintenance', 'maintenance checklist', 'RV care', 'preventive maintenance']
    },
    views: 1560,
    readingTime: 6
  },
  {
    id: '4',
    title: 'Budget-Friendly RV Travel: How to Save Money on the Road',
    slug: 'budget-friendly-rv-travel-tips',
    excerpt: 'Learn how to stretch your travel budget further with these money-saving tips for RV adventures.',
    content: `<h2>Travel More, Spend Less</h2>
    <p>RV travel doesn't have to break the bank. With smart planning and these budget-friendly tips, you can enjoy amazing adventures while keeping costs under control.</p>
    
    <h3>Fuel-Saving Strategies</h3>
    <p>Fuel is often the biggest expense. Save money by:</p>
    <ul>
      <li>Driving at moderate speeds</li>
      <li>Using apps to find cheapest gas stations</li>
      <li>Planning efficient routes</li>
      <li>Staying longer in each location</li>
    </ul>
    
    <h3>Free and Low-Cost Camping</h3>
    <p>Discover alternatives to expensive RV parks:</p>
    <ul>
      <li>Boondocking on public lands</li>
      <li>Harvest Hosts locations</li>
      <li>Walmart overnight parking</li>
      <li>State park campgrounds</li>
    </ul>`,
    featuredImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80',
    author: authors[1],
    categories: [categories[3]],
    tags: [tags[5], tags[3]],
    status: 'published',
    publishedAt: new Date('2024-02-10'),
    createdAt: new Date('2024-02-08'),
    updatedAt: new Date('2024-02-10'),
    seo: {
      title: 'Budget RV Travel Tips | Save Money on Your RV Adventure',
      description: 'Discover practical tips for budget-friendly RV travel without sacrificing comfort or fun.',
      keywords: ['budget travel', 'RV tips', 'save money', 'cheap camping']
    },
    views: 2100,
    readingTime: 5
  }
];

// Helper functions
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.categories.some(cat => cat.slug === categorySlug)
  );
}

export function getPostsByTag(tagSlug: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.tags.some(tag => tag.slug === tagSlug)
  );
}

export function getRelatedPosts(post: BlogPost, limit: number = 3): BlogPost[] {
  const categoryIds = post.categories.map(c => c.id);
  const tagIds = post.tags.map(t => t.id);
  
  return blogPosts
    .filter(p => p.id !== post.id)
    .map(p => ({
      post: p,
      score: p.categories.filter(c => categoryIds.includes(c.id)).length * 2 +
             p.tags.filter(t => tagIds.includes(t.id)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}
