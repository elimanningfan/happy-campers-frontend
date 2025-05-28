"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { getRVBySlug, rvData } from "@/lib/rv-data";
import { ArrowLeft, ArrowRight, Check, Calendar, Users, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: "rv-selection", title: "RV Selection", icon: "🚐" },
  { id: "trip-details", title: "Trip Details", icon: "📅" },
  { id: "contact-info", title: "Contact Info", icon: "👤" },
  { id: "additional-info", title: "Additional Info", icon: "📝" },
  { id: "review", title: "Review & Submit", icon: "✓" },
];

export default function InquiryForm() {
  const searchParams = useSearchParams();
  const rvSlug = searchParams.get("rv");
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    rvId: "",
    rvName: "",
    startDate: "",
    endDate: "",
    pickupLocation: "Portland",
    dropoffLocation: "Portland",
    adultsCount: "2",
    childrenCount: "0",
    petsCount: "0",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    tripPurpose: "",
    specialRequests: "",
    firstTimeRenter: "no",
    internationalDriver: "no",
  });

  useEffect(() => {
    if (rvSlug) {
      const rv = getRVBySlug(rvSlug);
      if (rv) {
        setFormData(prev => ({
          ...prev,
          rvId: rv.id,
          rvName: rv.name,
        }));
      }
    }
  }, [rvSlug]);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We'll be in touch within 24 hours.");
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gray-50 py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex flex-col items-center",
                    index <= currentStep ? "text-primary" : "text-gray-400"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2",
                      index < currentStep ? "bg-primary text-white" : 
                      index === currentStep ? "bg-primary text-white ring-4 ring-primary/20" :
                      "bg-gray-200"
                    )}
                  >
                    {index < currentStep ? <Check className="h-5 w-5" /> : step.icon}
                  </div>
                  <span className="text-xs text-center hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>
                {currentStep === 0 && "Select the RV you'd like to rent"}
                {currentStep === 1 && "Tell us about your trip plans"}
                {currentStep === 2 && "How can we reach you?"}
                {currentStep === 3 && "Any special requests or requirements?"}
                {currentStep === 4 && "Review your information and submit"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: RV Selection */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rv">Select an RV</Label>
                    <select
                      id="rv"
                      className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2"
                      value={formData.rvId}
                      onChange={(e) => {
                        const rv = rvData.find(r => r.id === e.target.value);
                        updateFormData("rvId", e.target.value);
                        updateFormData("rvName", rv?.name || "");
                      }}
                    >
                      <option value="">Choose an RV...</option>
                      {rvData.map(rv => (
                        <option key={rv.id} value={rv.id}>
                          {rv.name} - ${rv.pricePerDay}/day (Sleeps {rv.sleeps})
                        </option>
                      ))}
                    </select>
                  </div>
                  {formData.rvId && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">
                        Great choice! The {formData.rvName} is perfect for your adventure.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Trip Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Pickup Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateFormData("startDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Return Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => updateFormData("endDate", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <select
                        id="pickup"
                        className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2"
                        value={formData.pickupLocation}
                        onChange={(e) => updateFormData("pickupLocation", e.target.value)}
                      >
                        <option value="Portland">Portland, OR</option>
                        <option value="Seattle">Seattle, WA</option>
                        <option value="Eugene">Eugene, OR</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="dropoff">Dropoff Location</Label>
                      <select
                        id="dropoff"
                        className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2"
                        value={formData.dropoffLocation}
                        onChange={(e) => updateFormData("dropoffLocation", e.target.value)}
                      >
                        <option value="Portland">Portland, OR</option>
                        <option value="Seattle">Seattle, WA</option>
                        <option value="Eugene">Eugene, OR</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="adults">Adults</Label>
                      <Input
                        id="adults"
                        type="number"
                        min="1"
                        value={formData.adultsCount}
                        onChange={(e) => updateFormData("adultsCount", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="children">Children</Label>
                      <Input
                        id="children"
                        type="number"
                        min="0"
                        value={formData.childrenCount}
                        onChange={(e) => updateFormData("childrenCount", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pets">Pets</Label>
                      <Input
                        id="pets"
                        type="number"
                        min="0"
                        value={formData.petsCount}
                        onChange={(e) => updateFormData("petsCount", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Info */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateFormData("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => updateFormData("state", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={formData.zipCode}
                        onChange={(e) => updateFormData("zipCode", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Additional Info */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="purpose">Trip Purpose</Label>
                    <select
                      id="purpose"
                      className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2"
                      value={formData.tripPurpose}
                      onChange={(e) => updateFormData("tripPurpose", e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="vacation">Vacation/Leisure</option>
                      <option value="relocation">Relocation</option>
                      <option value="event">Special Event</option>
                      <option value="business">Business</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="requests">Special Requests or Notes</Label>
                    <Textarea
                      id="requests"
                      rows={4}
                      value={formData.specialRequests}
                      onChange={(e) => updateFormData("specialRequests", e.target.value)}
                      placeholder="Tell us about any special needs, destinations, or questions..."
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="firstTimeYes"
                        name="firstTime"
                        value="yes"
                        checked={formData.firstTimeRenter === "yes"}
                        onChange={(e) => updateFormData("firstTimeRenter", e.target.value)}
                      />
                      <Label htmlFor="firstTimeYes">This is my first time renting an RV</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="firstTimeNo"
                        name="firstTime"
                        value="no"
                        checked={formData.firstTimeRenter === "no"}
                        onChange={(e) => updateFormData("firstTimeRenter", e.target.value)}
                      />
                      <Label htmlFor="firstTimeNo">I've rented RVs before</Label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="international"
                        checked={formData.internationalDriver === "yes"}
                        onChange={(e) => updateFormData("internationalDriver", e.target.checked ? "yes" : "no")}
                      />
                      <Label htmlFor="international">I have an international driver's license</Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Trip Summary</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">RV:</dt>
                        <dd className="font-medium">{formData.rvName}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Dates:</dt>
                        <dd className="font-medium">{formData.startDate} to {formData.endDate}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Pickup/Dropoff:</dt>
                        <dd className="font-medium">{formData.pickupLocation} / {formData.dropoffLocation}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Travelers:</dt>
                        <dd className="font-medium">
                          {formData.adultsCount} adults, {formData.childrenCount} children, {formData.petsCount} pets
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Name:</dt>
                        <dd className="font-medium">{formData.firstName} {formData.lastName}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Email:</dt>
                        <dd className="font-medium">{formData.email}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Phone:</dt>
                        <dd className="font-medium">{formData.phone}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>What happens next?</strong> After you submit this inquiry, our team will review your request and send you a detailed quote within 24 hours. No payment is required at this time.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < steps.length - 1 ? (
                  <Button
                    onClick={nextStep}
                    disabled={currentStep === 0 && !formData.rvId}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Submit Inquiry
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
