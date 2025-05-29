"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Upload, X, Plus, Trash2, DollarSign, ImageIcon, FileText, Settings, Shield, Search } from "lucide-react";
import { rvData } from "@/lib/rv-data";
import { cn } from "@/lib/utils";
import { MediaPicker } from "@/components/admin/media-picker";
import { MediaItem } from "@/lib/types/media";

// Features list
const availableFeatures = [
  { id: "pet-friendly", label: "Pet Friendly", category: "policies" },
  { id: "wifi", label: "WiFi Available", category: "connectivity" },
  { id: "solar", label: "Solar Power", category: "power" },
  { id: "generator", label: "Generator", category: "power" },
  { id: "awning", label: "Awning", category: "exterior" },
  { id: "backup-camera", label: "Backup Camera", category: "safety" },
  { id: "leveling-jacks", label: "Automatic Leveling Jacks", category: "setup" },
  { id: "slideouts", label: "Slide-outs", category: "space" },
  { id: "outdoor-kitchen", label: "Outdoor Kitchen", category: "amenities" },
  { id: "outdoor-entertainment", label: "Outdoor Entertainment", category: "amenities" },
  { id: "bike-rack", label: "Bike Rack", category: "storage" },
  { id: "tow-hitch", label: "Tow Hitch", category: "towing" },
];

// Helper function to extract feature IDs from RV features object
const extractFeatureIds = (rvFeatures: any): string[] => {
  if (!rvFeatures || typeof rvFeatures !== 'object') return [];
  
  const featureIds: string[] = [];
  
  // Map RV feature strings to our feature IDs
  Object.values(rvFeatures).forEach((categoryFeatures: any) => {
    if (Array.isArray(categoryFeatures)) {
      categoryFeatures.forEach((feature: string) => {
        const lowerFeature = feature.toLowerCase();
        if (lowerFeature.includes('pet')) featureIds.push('pet-friendly');
        if (lowerFeature.includes('wifi') || lowerFeature.includes('wi-fi')) featureIds.push('wifi');
        if (lowerFeature.includes('solar')) featureIds.push('solar');
        if (lowerFeature.includes('generator')) featureIds.push('generator');
        if (lowerFeature.includes('awning')) featureIds.push('awning');
        if (lowerFeature.includes('backup camera')) featureIds.push('backup-camera');
        if (lowerFeature.includes('leveling')) featureIds.push('leveling-jacks');
        if (lowerFeature.includes('slide') || lowerFeature.includes('slideout')) featureIds.push('slideouts');
        if (lowerFeature.includes('outdoor kitchen')) featureIds.push('outdoor-kitchen');
        if (lowerFeature.includes('outdoor entertainment')) featureIds.push('outdoor-entertainment');
        if (lowerFeature.includes('bike rack')) featureIds.push('bike-rack');
        if (lowerFeature.includes('tow') || lowerFeature.includes('hitch')) featureIds.push('tow-hitch');
      });
    }
  });
  
  return [...new Set(featureIds)]; // Remove duplicates
};

export default function EditRVPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  
  // Find the RV data
  const rvId = params.id as string;
  const initialRV = rvData.find(rv => rv.slug === rvId);

  // Form state
  const [formData, setFormData] = useState({
    // Basic Information
    name: initialRV?.name || "",
    type: initialRV?.type || "Class A",
    category: initialRV?.category || "Luxury RV",
    year: initialRV?.year || new Date().getFullYear(),
    make: initialRV?.make || "",
    model: initialRV?.model || "",
    
    // Specifications
    sleeps: initialRV?.sleeps || 2,
    length: initialRV?.length || "",
    fuelType: initialRV?.fuelType || "Gas",
    mileage: Math.floor(Math.random() * 50000 + 10000),
    vin: `1HGCM${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    licensePlate: `CA${Math.floor(Math.random() * 9000 + 1000)}RV`,
    
    // Description
    description: initialRV?.description || "",
    
    // Pricing
    pricePerDay: initialRV?.pricePerDay || 250,
    weeklyDiscount: 10,
    monthlyDiscount: 20,
    cleaningFee: 150,
    deliveryFee: 200,
    securityDeposit: 500,
    minimumRentalDays: 2,
    
    // Features
    features: initialRV?.features || {},
    
    // Images
    images: initialRV?.images || [],
    
    // Status
    status: "available",
    featured: initialRV?.featured || false,
    
    // SEO
    metaTitle: initialRV?.name || "",
    metaDescription: initialRV?.description?.substring(0, 160) || "",
    slug: initialRV?.slug || "",
    
    // Insurance
    insuranceRequired: true,
    insurancePerDay: 35,
    insuranceProvider: "RV Rental Insurance Co."
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    extractFeatureIds(initialRV?.features)
  );

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleImageAdd = () => {
    setIsMediaPickerOpen(true);
  };

  const handleImageSelect = (media: MediaItem) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, media.url]
    }));
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update features in form data
    const updatedFormData = { ...formData, features: selectedFeatures };
    
    console.log("Saving RV data:", updatedFormData);
    setSaving(false);
    
    // Show success message (in a real app, use a toast notification)
    alert("RV details saved successfully!");
    
    // Redirect back to RV list
    router.push("/admin/fleet/rvs");
  };

  if (!initialRV) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">RV not found</p>
            <Link href="/admin/fleet/rvs">
              <Button className="mt-4">Back to RV List</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/fleet/rvs">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Edit RV</h1>
          <p className="text-muted-foreground">Update {formData.name} details</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Form Tabs */}
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>General details about the RV</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">RV Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., 2024 Winnebago Vista"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">RV Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Class A">Class A</SelectItem>
                      <SelectItem value="Class B">Class B</SelectItem>
                      <SelectItem value="Class B+">Class B+</SelectItem>
                      <SelectItem value="Class C">Class C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange("year", parseInt(e.target.value))}
                    min="2000"
                    max={new Date().getFullYear() + 1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    value={formData.make}
                    onChange={(e) => handleInputChange("make", e.target.value)}
                    placeholder="e.g., Winnebago"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                    placeholder="e.g., Vista 27P"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the RV, its features, and what makes it special..."
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange("featured", checked)}
                />
                <Label htmlFor="featured" className="font-normal">
                  Feature this RV on the homepage
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Specifications */}
        <TabsContent value="specifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
              <CardDescription>Technical details and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="sleeps">Sleeps</Label>
                  <Input
                    id="sleeps"
                    type="number"
                    value={formData.sleeps}
                    onChange={(e) => handleInputChange("sleeps", parseInt(e.target.value))}
                    min="1"
                    max="12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Length</Label>
                  <Input
                    id="length"
                    value={formData.length}
                    onChange={(e) => handleInputChange("length", e.target.value)}
                    placeholder="e.g., 27 ft"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select
                    value={formData.fuelType}
                    onValueChange={(value) => handleInputChange("fuelType", value)}
                  >
                    <SelectTrigger id="fuelType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gas">Gas</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="mileage">Current Mileage</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange("mileage", parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vin">VIN</Label>
                  <Input
                    id="vin"
                    value={formData.vin}
                    onChange={(e) => handleInputChange("vin", e.target.value)}
                    placeholder="Vehicle Identification Number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    value={formData.licensePlate}
                    onChange={(e) => handleInputChange("licensePlate", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Features & Amenities</Label>
                <div className="grid gap-4 md:grid-cols-3">
                  {availableFeatures.map((feature) => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature.id}
                        checked={selectedFeatures.includes(feature.id)}
                        onCheckedChange={() => handleFeatureToggle(feature.id)}
                      />
                      <Label htmlFor={feature.id} className="font-normal">
                        {feature.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing */}
        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Settings</CardTitle>
              <CardDescription>Set rental rates and fees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pricePerDay">Base Price per Day</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="pricePerDay"
                      type="number"
                      value={formData.pricePerDay}
                      onChange={(e) => handleInputChange("pricePerDay", parseInt(e.target.value))}
                      className="pl-10"
                      min="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumRentalDays">Minimum Rental Days</Label>
                  <Input
                    id="minimumRentalDays"
                    type="number"
                    value={formData.minimumRentalDays}
                    onChange={(e) => handleInputChange("minimumRentalDays", parseInt(e.target.value))}
                    min="1"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="weeklyDiscount">Weekly Discount (%)</Label>
                  <Input
                    id="weeklyDiscount"
                    type="number"
                    value={formData.weeklyDiscount}
                    onChange={(e) => handleInputChange("weeklyDiscount", parseInt(e.target.value))}
                    min="0"
                    max="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyDiscount">Monthly Discount (%)</Label>
                  <Input
                    id="monthlyDiscount"
                    type="number"
                    value={formData.monthlyDiscount}
                    onChange={(e) => handleInputChange("monthlyDiscount", parseInt(e.target.value))}
                    min="0"
                    max="50"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="cleaningFee">Cleaning Fee</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="cleaningFee"
                      type="number"
                      value={formData.cleaningFee}
                      onChange={(e) => handleInputChange("cleaningFee", parseInt(e.target.value))}
                      className="pl-10"
                      min="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryFee">Delivery Fee</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="deliveryFee"
                      type="number"
                      value={formData.deliveryFee}
                      onChange={(e) => handleInputChange("deliveryFee", parseInt(e.target.value))}
                      className="pl-10"
                      min="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="securityDeposit">Security Deposit</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="securityDeposit"
                      type="number"
                      value={formData.securityDeposit}
                      onChange={(e) => handleInputChange("securityDeposit", parseInt(e.target.value))}
                      className="pl-10"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images */}
        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>Upload and manage RV photos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video relative overflow-hidden rounded-lg border">
                      <Image
                        src={image}
                        alt={`RV image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleImageRemove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="aspect-video flex flex-col gap-2"
                  onClick={handleImageAdd}
                >
                  <Upload className="h-8 w-8" />
                  <span>Select from Library</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                First image will be used as the primary display image. Drag to reorder.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Search engine optimization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="e.g., 2024-winnebago-vista-27p"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                  placeholder="Page title for search engines"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                  placeholder="Brief description for search results"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  {formData.metaDescription.length}/160 characters
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insurance Requirements</CardTitle>
              <CardDescription>Set insurance policies for this RV</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="insuranceRequired"
                  checked={formData.insuranceRequired}
                  onCheckedChange={(checked) => handleInputChange("insuranceRequired", checked)}
                />
                <Label htmlFor="insuranceRequired" className="font-normal">
                  Insurance required for rental
                </Label>
              </div>
              {formData.insuranceRequired && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="insurancePerDay">Insurance Cost per Day</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="insurancePerDay"
                          type="number"
                          value={formData.insurancePerDay}
                          onChange={(e) => handleInputChange("insurancePerDay", parseInt(e.target.value))}
                          className="pl-10"
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                      <Input
                        id="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={(e) => handleInputChange("insuranceProvider", e.target.value)}
                        placeholder="e.g., RV Rental Insurance Co."
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status & Availability</CardTitle>
              <CardDescription>Control RV availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Current Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Media Picker Dialog */}
      <MediaPicker
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleImageSelect}
        title="Select RV Image"
      />
    </div>
  );
}
