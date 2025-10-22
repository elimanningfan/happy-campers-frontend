"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message
    console.log("Contact form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h1>
              <p className="mt-4 text-lg text-gray-600">
                We're here to help you plan your perfect RV adventure
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Phone */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <a href="tel:+15416405045" className="mt-1 text-gray-600 hover:text-primary">
                          541-640-5045
                        </a>
                        <p className="text-sm text-gray-500 mt-1">Mon-Fri 8AM-5PM PST</p>
                        <p className="text-sm text-red-600 mt-2">After-Hours Emergency:<br />
                          <a href="tel:+18553885385" className="hover:text-red-700">855-388-5385</a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <a href="mailto:Kristina@BeaverCoachSales.com" className="mt-1 text-gray-600 hover:text-primary break-all">
                          Kristina@BeaverCoachSales.com
                        </a>
                        <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <a
                          href="https://maps.google.com/maps?cid=13469071973827556344"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 text-gray-600 hover:text-primary"
                        >
                          62955 Boyd Acres Rd<br />
                          Bend, OR 97701
                        </a>
                        <p className="text-sm text-gray-500 mt-1">
                          Subsidiary of Beaver Coach Sales & Service
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Hours */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Office Hours</h3>
                        <div className="mt-1 space-y-1 text-sm text-gray-600">
                          <p><strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM</p>
                          <p><strong>Saturday - Sunday:</strong> Closed</p>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-700">Check-in & Check-out</h4>
                          <p className="text-sm text-gray-600 mt-1">Pick-up: 11:00 AM - 2:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Have a question or need help planning your trip? We'd love to hear from you!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <select
                          id="subject"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={formData.subject}
                          onChange={(e) => updateFormData("subject", e.target.value)}
                          required
                        >
                          <option value="">Select a topic...</option>
                          <option value="availability">RV Availability</option>
                          <option value="pricing">Pricing Question</option>
                          <option value="booking">Booking Assistance</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Customer Support</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={(e) => updateFormData("message", e.target.value)}
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">What do I need to rent an RV?</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        You'll need a valid driver's license, be at least 25 years old, and provide a credit card for the security deposit.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Can I take the RV out of state?</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        Yes! Our RVs can travel anywhere in the continental United States. Just let us know your travel plans.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Do you offer delivery?</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        We offer delivery and setup services within a 50-mile radius of our location for an additional fee.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">What's included with the rental?</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        All rentals include basic kitchen supplies, bedding, and camping chairs. Additional amenities can be added to your rental.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
