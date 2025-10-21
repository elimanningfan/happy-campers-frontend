import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  ChevronRight, 
  ExternalLink, 
  Phone,
  Globe,
  Calendar,
  Check,
  X,
  Tent,
  Car,
  Zap,
  Droplets,
  Trash2,
  Wifi,
  Dog,
  Store,
  Coffee,
  Waves,
  Fish,
  Mountain,
  Trees
} from 'lucide-react';
import { getCampgroundBySlug, campgrounds } from '@/data/campgrounds';
import { cn } from '@/lib/utils';

interface CampgroundPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return campgrounds.map((campground) => ({
    slug: campground.slug,
  }));
}

const amenityIcons: Record<string, any> = {
  rvSites: { icon: Tent, label: 'RV Sites' },
  electricHookups: { icon: Zap, label: 'Electric Hookups' },
  waterHookups: { icon: Droplets, label: 'Water Hookups' },
  sewerHookups: { icon: Trash2, label: 'Sewer Hookups' },
  pullThroughSites: { icon: Car, label: 'Pull-Through Sites' },
  backInSites: { icon: Car, label: 'Back-In Sites' },
  dumpStation: { icon: Trash2, label: 'Dump Station' },
  wifi: { icon: Wifi, label: 'WiFi' },
  petFriendly: { icon: Dog, label: 'Pet Friendly' },
  generalStore: { icon: Store, label: 'General Store' },
  restaurant: { icon: Coffee, label: 'Restaurant' },
  boatRamp: { icon: Waves, label: 'Boat Ramp' },
  fishing: { icon: Fish, label: 'Fishing' },
  hikingTrails: { icon: Mountain, label: 'Hiking Trails' },
};

export default function CampgroundPage({ params }: CampgroundPageProps) {
  const campground = getCampgroundBySlug(params.slug);

  if (!campground || campground.status !== 'published') {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <article className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[400px] md:h-[500px] w-full">
          <Image
            src={campground.featuredImage || '/images/placeholder-image.png'}
            alt={campground.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="mx-auto max-w-7xl">
              <Badge className="mb-4">{campground.region}</Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {campground.name}
              </h1>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="h-5 w-5" />
                <span>{campground.location}, {campground.state}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/campgrounds" className="hover:text-primary">
                Happy Campgrounds
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium truncate">
                {campground.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed">
                  {campground.description}
                </p>
              </section>

              {/* Amenities */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(campground.amenities).map(([key, value]) => {
                    const amenity = amenityIcons[key];
                    if (!amenity) return null;
                    
                    const Icon = amenity.icon;
                    return (
                      <div
                        key={key}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border",
                          value ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                        )}
                      >
                        <Icon className={cn(
                          "h-5 w-5",
                          value ? "text-green-600" : "text-gray-400"
                        )} />
                        <span className={cn(
                          "text-sm",
                          value ? "text-gray-900" : "text-gray-500"
                        )}>
                          {amenity.label}
                        </span>
                        {value ? (
                          <Check className="h-4 w-4 text-green-600 ml-auto" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400 ml-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Activities */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Activities</h2>
                <div className="flex flex-wrap gap-2">
                  {campground.activities.map((activity) => (
                    <Badge key={activity} variant="secondary">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Unique Features */}
              {campground.uniqueFeatures.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Unique Features</h2>
                  <ul className="space-y-2">
                    {campground.uniqueFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Trees className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Google Reviews Summary */}
              {campground.googleReviewsSummary && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">What Visitors Say</h2>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-700 mb-4">
                        {campground.googleReviewsSummary.summary}
                      </p>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-sm uppercase text-gray-600">
                          Common Praise
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {campground.googleReviewsSummary.commonPraise.map((praise, index) => (
                            <Badge key={index} variant="outline">
                              {praise}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Contact & Booking */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Contact & Reservations</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {campground.contact.website && (
                    <Button asChild className="w-full">
                      <a
                        href={campground.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Globe className="h-4 w-4" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                  {campground.contact.reservationUrl && (
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href={campground.contact.reservationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Calendar className="h-4 w-4" />
                        Make Reservation
                      </a>
                    </Button>
                  )}
                  {campground.contact.phone && (
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href={`tel:${campground.contact.phone}`}
                        className="flex items-center justify-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        {campground.contact.phone}
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Distance Information */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Getting There</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {campground.distanceFrom.map((distance, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span className="text-gray-600">From {distance.city}:</span>
                        <span className="font-medium">{distance.distance}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Season Information */}
              {campground.seasonality && (
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Best Time to Visit</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Peak Season</p>
                        <p className="font-medium">
                          {campground.seasonality.peakSeason.join(', ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Open Months</p>
                        <p className="text-sm">
                          {campground.seasonality.openMonths.join(', ')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>

          {/* Map Section Placeholder */}
          <Separator className="my-12" />
          <section>
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <Card>
              <CardContent className="p-6">
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">
                    Interactive map coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </article>

      <Footer />
    </div>
  );
}