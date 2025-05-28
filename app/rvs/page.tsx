"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { rvData, filterRVs, type FilterOptions } from "@/lib/rv-data";
import Link from "next/link";
import Image from "next/image";
import { Users, Ruler, Fuel, DollarSign, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

const rvTypes = ["Class B", "Class B+", "Class C"];
const sleepOptions = [2, 4, 6, 8];
const priceRanges = [
  { label: "Under $300/day", value: [0, 299] as [number, number] },
  { label: "$300-$350/day", value: [300, 350] as [number, number] },
  { label: "Over $350/day", value: [351, 999] as [number, number] },
];

export default function BrowseRVs() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(true);

  const filteredRVs = useMemo(() => {
    return filterRVs(filters);
  }, [filters]);

  const handleTypeFilter = (type: string) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type === type ? undefined : type as any,
    }));
  };

  const handleSleepsFilter = (sleeps: number) => {
    setFilters(prev => ({
      ...prev,
      sleeps: prev.sleeps === sleeps ? undefined : sleeps,
    }));
  };

  const handlePriceFilter = (range: [number, number]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange?.[0] === range[0] ? undefined : range,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== undefined).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Browse Our RVs</h1>
            <p className="mt-2 text-gray-600">
              Find the perfect RV for your Pacific Northwest adventure
            </p>
          </div>

          {/* Filter Toggle for Mobile */}
          <div className="mb-4 lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full justify-between"
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </span>
              {showFilters ? <X className="h-4 w-4" /> : null}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <div className={cn("lg:col-span-1", !showFilters && "hidden lg:block")}>
              <div className="sticky top-20 space-y-6 bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  {activeFilterCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear all
                    </Button>
                  )}
                </div>

                {/* RV Type Filter */}
                <div>
                  <h3 className="font-medium mb-3">RV Type</h3>
                  <div className="space-y-2">
                    {rvTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => handleTypeFilter(type)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                          filters.type === type
                            ? "bg-primary text-white"
                            : "hover:bg-gray-100"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sleeps Filter */}
                <div>
                  <h3 className="font-medium mb-3">Sleeps</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {sleepOptions.map(num => (
                      <button
                        key={num}
                        onClick={() => handleSleepsFilter(num)}
                        className={cn(
                          "px-3 py-2 rounded-md text-sm transition-colors",
                          filters.sleeps === num
                            ? "bg-primary text-white"
                            : "hover:bg-gray-100 border border-gray-200"
                        )}
                      >
                        {num}+
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <button
                        key={range.label}
                        onClick={() => handlePriceFilter(range.value)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                          filters.priceRange?.[0] === range.value[0]
                            ? "bg-primary text-white"
                            : "hover:bg-gray-100"
                        )}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RV Grid */}
            <div className="lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredRVs.length} of {rvData.length} RVs
                </p>
              </div>

              {filteredRVs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-gray-500">No RVs match your filters.</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredRVs.map((rv) => (
                    <Card key={rv.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 w-full">
                        <Image
                          src={rv.images[0] || "/images/placeholder.svg"}
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
                        <CardDescription>{rv.type} • {rv.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span>Sleeps {rv.sleeps}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Ruler className="h-4 w-4 text-gray-400" />
                            <span>{rv.length}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Fuel className="h-4 w-4 text-gray-400" />
                            <span>{rv.fuelType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span className="font-semibold">${rv.pricePerDay}</span>
                          </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                          {rv.description}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Link href={`/rvs/${rv.slug}`} className="w-full">
                          <Button className="w-full">View Details</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
