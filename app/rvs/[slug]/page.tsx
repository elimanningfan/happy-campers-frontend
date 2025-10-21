import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRVBySlug, rvData } from "@/lib/rv-data";
import Link from "next/link";
import { Users, Ruler, Fuel, Calendar, Check, ArrowLeft } from "lucide-react";
import { ImageCarousel } from "@/components/rv/image-carousel";
import type { Metadata } from 'next';

// Generate static params for all RV pages at build time
export async function generateStaticParams() {
  return rvData.map((rv) => ({
    slug: rv.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const rv = getRVBySlug(params.slug);

  if (!rv) {
    return {
      title: 'RV Not Found | Happy Campers',
    };
  }

  return {
    title: `${rv.name} | Happy Campers RV Rentals`,
    description: rv.description,
    openGraph: {
      title: rv.name,
      description: rv.description,
      images: [{ url: rv.images[0] }],
    },
  };
}

export default function RVDetail({ params }: { params: { slug: string } }) {
  const rv = getRVBySlug(params.slug);

  if (!rv) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">RV Not Found</h1>
            <p className="mt-2 text-gray-600">The requested RV could not be found.</p>
            <Link href="/rvs">
              <Button className="mt-4">Browse All RVs</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
              <span className="text-gray-400" aria-hidden="true">/</span>
              <Link href="/rvs" className="text-gray-500 hover:text-gray-700">
                RVs
              </Link>
              <span className="text-gray-400" aria-hidden="true">/</span>
              <span className="text-gray-900">{rv.name}</span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/rvs" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to all RVs
          </Link>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Image Gallery - Now a Client Component */}
            <ImageCarousel images={rv.images} name={rv.name} />

            {/* RV Details */}
            <div>
              <div className="sticky top-20">
                <h1 className="text-3xl font-bold text-gray-900">{rv.name}</h1>
                <div className="mt-2 flex items-center gap-4 text-gray-600">
                  <span>{rv.type}</span>
                  <span>•</span>
                  <span>{rv.category}</span>
                  <span>•</span>
                  <span>{rv.year} {rv.make} {rv.model}</span>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">${rv.pricePerDay}</span>
                  <span className="text-gray-600">per day</span>
                </div>

                {/* Key Specs */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Sleeps</p>
                      <p className="font-semibold">{rv.sleeps} people</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Ruler className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Length</p>
                      <p className="font-semibold">{rv.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Fuel className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Fuel Type</p>
                      <p className="font-semibold">{rv.fuelType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Minimum Rental</p>
                      <p className="font-semibold">3 nights</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex gap-4">
                  <Link href={`/inquiry?rv=${rv.slug}`} className="flex-1">
                    <Button size="lg" className="w-full">
                      Request a Quote
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Check Availability
                  </Button>
                </div>

                {/* Highlights */}
                <Card className="mt-8">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Highlights</h3>
                    <ul className="space-y-2">
                      {rv.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Description */}
            <Card className="lg:col-span-2">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-gray-600">{rv.description}</p>
                
                {rv.idealFor && (
                  <>
                    <h4 className="text-md font-semibold mt-6 mb-3">Ideal For</h4>
                    <ul className="space-y-1">
                      {rv.idealFor.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 bg-primary rounded-full" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <div className="space-y-4">
                  {Object.entries(rv.features).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                      </h4>
                      <ul className="space-y-1">
                        {items.map((item: string, index: number) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
