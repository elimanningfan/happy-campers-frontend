import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Tent, Zap, Wifi, Dog, Store } from 'lucide-react';
import { getPublishedCampgrounds } from '@/data/campgrounds';

const amenityIcons = {
  electricHookups: { icon: Zap, label: 'Electric' },
  wifi: { icon: Wifi, label: 'WiFi' },
  petFriendly: { icon: Dog, label: 'Pet Friendly' },
  generalStore: { icon: Store, label: 'Store' },
  rvSites: { icon: Tent, label: 'RV Sites' },
};

export default function CampgroundsPage() {
  const campgrounds = getPublishedCampgrounds();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Happy Campgrounds
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Discover the best RV-friendly campgrounds in the Pacific Northwest. 
                Each location is carefully selected for its amenities, natural beauty, 
                and accessibility for RV travelers.
              </p>
            </div>
          </div>
        </section>

        {/* Campgrounds Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {campgrounds.map((campground) => (
                <Card key={campground.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Featured Image */}
                  <div className="relative h-48 bg-gray-200">
                    {campground.featuredImage && (
                      <Image
                        src={campground.featuredImage}
                        alt={campground.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-900">
                        {campground.region}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <h3 className="text-xl font-semibold">
                      <Link
                        href={`/campgrounds/${campground.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {campground.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {campground.location}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {campground.excerpt}
                    </p>

                    {/* Key Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.entries(amenityIcons).map(([key, { icon: Icon, label }]) => {
                        if (campground.amenities[key as keyof typeof campground.amenities]) {
                          return (
                            <div
                              key={key}
                              className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                            >
                              <Icon className="h-3 w-3" />
                              <span>{label}</span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>

                    {/* Distance Info */}
                    {campground.distanceFrom[0] && (
                      <p className="text-sm text-gray-600">
                        {campground.distanceFrom[0].distance} from {campground.distanceFrom[0].city}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Coming Soon Message */}
            <div className="mt-12 text-center">
              <Card className="inline-block">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">More Campgrounds Coming Soon!</h3>
                  <p className="text-gray-600">
                    We're continuously adding new campground profiles. Check back regularly
                    for updates on locations like Lake Billy Chinook, Crater Lake, Tumalo State Park,
                    and many more!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}