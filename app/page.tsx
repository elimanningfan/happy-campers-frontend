import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeaturedRVs } from "@/lib/rv-data";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Calendar, ArrowRight } from "lucide-react";

export default function HomePage() {
  const featuredRVs = getFeaturedRVs();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1600&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Adventure Awaits</span>
              <span className="block text-secondary">Your Journey Starts Here</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-100 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Experience the freedom of the open road with Happy Campers RV Rentals. 
              Premium RVs for unforgettable Pacific Northwest adventures.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/rvs">
                  <Button size="lg" className="w-full">
                    Browse RVs
                  </Button>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/inquiry">
                  <Button size="lg" variant="outline" className="w-full">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="relative bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">10+</p>
                <p className="mt-2 text-lg text-gray-600">Premium RVs</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">500+</p>
                <p className="mt-2 text-lg text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">5★</p>
                <p className="mt-2 text-lg text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured RVs */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured RVs
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Handpicked selections for your perfect adventure
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredRVs.map((rv) => (
              <Card key={rv.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative h-48 w-full">
                  <Image
                    src={rv.images[0]}
                    alt={rv.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${rv.pricePerDay}/day
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{rv.name}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Sleeps {rv.sleeps}
                    </span>
                    <span>{rv.type}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {rv.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {rv.highlights.slice(0, 2).map((highlight, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/rvs/${rv.slug}`} className="w-full">
                    <Button className="w-full" variant="outline">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/rvs">
              <Button size="lg">
                View All RVs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Happy Campers?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We make RV rental easy and enjoyable
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-primary">
                <MapPin className="h-full w-full" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Prime Locations</h3>
              <p className="mt-2 text-gray-600">
                Conveniently located for easy access to Pacific Northwest adventures
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-primary">
                <Users className="h-full w-full" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Expert Support</h3>
              <p className="mt-2 text-gray-600">
                Friendly staff ready to help you plan the perfect trip
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-primary">
                <Calendar className="h-full w-full" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Flexible Booking</h3>
              <p className="mt-2 text-gray-600">
                Easy online booking with flexible cancellation policies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Start Your Adventure?
          </h2>
          <p className="mt-4 text-lg text-green-100">
            Browse our selection of premium RVs and find your perfect match
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/rvs">
              <Button size="lg" variant="secondary">
                Browse RVs
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-12">
            Happy Campers RV Rentals v0.4.6 &copy; {new Date().getFullYear()}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
