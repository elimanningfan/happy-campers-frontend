"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { rvData, filterRVs, type FilterOptions } from "@/lib/rv-data";
import Link from "next/link";
import Image from "next/image";
import { 
  Users, 
  Ruler, 
  Fuel, 
  DollarSign, 
  Filter, 
  X, 
  Grid3X3, 
  List, 
  Search,
  Check,
  ChevronDown,
  Calendar,
  Wifi,
  Dog,
  Zap,
  MapPin,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

// Enhanced filter options
const rvTypes = [
  { value: "Class A", label: "Class A", description: "Largest and most luxurious" },
  { value: "Class B", label: "Class B", description: "Compact van conversions" },
  { value: "Class B+", label: "Class B+", description: "Larger than Class B" },
  { value: "Class C", label: "Class C", description: "Perfect for families" },
];

const sleepOptions = [
  { value: 2, label: "2 People" },
  { value: 4, label: "4 People" },
  { value: 6, label: "6 People" },
  { value: 8, label: "8+ People" },
];

const features = [
  { id: "pet-friendly", label: "Pet Friendly", icon: Dog },
  { id: "wifi", label: "WiFi Available", icon: Wifi },
  { id: "solar", label: "Solar Power", icon: Zap },
  { id: "generator", label: "Generator", icon: Zap },
];

const sortOptions = [
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "size-small", label: "Size: Small to Large" },
  { value: "size-large", label: "Size: Large to Small" },
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
];

export default function BrowseRVs() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Filter and sort RVs
  const filteredAndSortedRVs = useMemo(() => {
    let filtered = filterRVs(filters);
    
    // Apply price range filter
    filtered = filtered.filter(rv => 
      rv.pricePerDay >= priceRange[0] && rv.pricePerDay <= priceRange[1]
    );
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(rv =>
        rv.name.toLowerCase().includes(query) ||
        rv.description.toLowerCase().includes(query) ||
        rv.make.toLowerCase().includes(query) ||
        rv.model.toLowerCase().includes(query) ||
        rv.type.toLowerCase().includes(query)
      );
    }
    
    // Apply feature filters (mock implementation)
    if (selectedFeatures.length > 0) {
      // In a real app, you'd filter based on actual RV features
      filtered = filtered.filter(rv => {
        // Mock: assume some RVs have certain features
        if (selectedFeatures.includes("pet-friendly") && rv.pricePerDay < 300) return false;
        if (selectedFeatures.includes("wifi") && rv.year < 2020) return false;
        return true;
      });
    }
    
    // Sort results
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case "price-high":
        sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case "size-small":
        sorted.sort((a, b) => parseInt(a.length) - parseInt(b.length));
        break;
      case "size-large":
        sorted.sort((a, b) => parseInt(b.length) - parseInt(a.length));
        break;
      case "newest":
        sorted.sort((a, b) => b.year - a.year);
        break;
      case "popular":
        // Featured RVs first
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    return sorted;
  }, [filters, priceRange, searchQuery, selectedFeatures, sortBy]);

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

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  const clearFilters = () => {
    setFilters({});
    setPriceRange([0, 500]);
    setSelectedFeatures([]);
    setSearchQuery("");
  };

  const activeFilterCount = 
    Object.values(filters).filter(v => v !== undefined).length +
    (priceRange[0] !== 0 || priceRange[1] !== 500 ? 1 : 0) +
    selectedFeatures.length +
    (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold">Browse Our RV Fleet</h1>
            <p className="mt-2 text-lg text-green-100">
              Find the perfect RV for your Pacific Northwest adventure
            </p>
            
            {/* Search Bar */}
            <div className="mt-6 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by make, model, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white text-gray-900 h-12"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Controls Bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {/* Filter Toggle for Mobile */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
              
              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="px-3"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-sm text-gray-600">
                {filteredAndSortedRVs.length} RVs available
              </p>
            </div>
            
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Enhanced Filters Sidebar */}
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

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={500}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}/day</span>
                      <span>${priceRange[1]}/day</span>
                    </div>
                  </div>
                </div>

                {/* RV Type Filter */}
                <div>
                  <h3 className="font-medium mb-3">RV Type</h3>
                  <div className="space-y-2">
                    {rvTypes.map(type => (
                      <button
                        key={type.value}
                        onClick={() => handleTypeFilter(type.value)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md transition-colors",
                          filters.type === type.value
                            ? "bg-primary text-white"
                            : "hover:bg-gray-100"
                        )}
                      >
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs opacity-80">{type.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sleeping Capacity Filter */}
                <div>
                  <h3 className="font-medium mb-3">Sleeps</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {sleepOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleSleepsFilter(option.value)}
                        className={cn(
                          "px-3 py-2 rounded-md text-sm transition-colors",
                          filters.sleeps === option.value
                            ? "bg-primary text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features Filter */}
                <div>
                  <h3 className="font-medium mb-3">Features</h3>
                  <div className="space-y-3">
                    {features.map(feature => {
                      const Icon = feature.icon;
                      return (
                        <label
                          key={feature.id}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <Checkbox
                            checked={selectedFeatures.includes(feature.id)}
                            onCheckedChange={() => toggleFeature(feature.id)}
                          />
                          <Icon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">{feature.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* RV Grid/List */}
            <div className="lg:col-span-3">
              {filteredAndSortedRVs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-gray-500">No RVs match your filters.</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    Clear filters
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredAndSortedRVs.map((rv) => (
                    <Card key={rv.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 w-full">
                        <Image
                          src={rv.images[0] || "/images/placeholder.svg"}
                          alt={rv.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {rv.featured && (
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              Featured
                            </span>
                          )}
                        </div>
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
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{rv.year}</span>
                          </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                          {rv.description}
                        </p>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Link href={`/rvs/${rv.slug}`} className="flex-1">
                          <Button className="w-full">View Details</Button>
                        </Link>
                        <Link href={`/inquiry?rv=${rv.slug}`}>
                          <Button variant="outline">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                // List View
                <div className="space-y-4">
                  {filteredAndSortedRVs.map((rv) => (
                    <Card key={rv.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-48 md:h-auto md:w-72">
                          <Image
                            src={rv.images[0] || "/images/placeholder.svg"}
                            alt={rv.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 288px"
                            className="object-cover"
                          />
                          {rv.featured && (
                            <div className="absolute top-4 left-4">
                              <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                Featured
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold">{rv.name}</h3>
                              <p className="text-gray-600">{rv.type} • {rv.category}</p>
                              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                {rv.description}
                              </p>
                              <div className="mt-4 flex flex-wrap gap-4 text-sm">
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
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  <span>{rv.year}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-6 text-right">
                              <div className="text-2xl font-bold text-primary">
                                ${rv.pricePerDay}
                                <span className="text-sm font-normal text-gray-600">/day</span>
                              </div>
                              <div className="mt-4 flex flex-col gap-2">
                                <Link href={`/rvs/${rv.slug}`}>
                                  <Button className="w-full">View Details</Button>
                                </Link>
                                <Link href={`/inquiry?rv=${rv.slug}`}>
                                  <Button variant="outline" className="w-full">
                                    Check Availability
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
