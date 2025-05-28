"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Car, DollarSign, TrendingUp, Activity, Clock, Mail, FileText, BarChart3, Eye, Edit } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { rvData } from "@/lib/rv-data";

// Mock data for demo
const mockInquiries = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    rv: "2024 Entegra Ethos 20D",
    dates: "Mar 15-22, 2024",
    status: "new",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    rv: "2022 Forest River Sunseeker 3250DS LE",
    dates: "Apr 1-7, 2024",
    status: "contacted",
    createdAt: "2024-01-09",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@example.com",
    rv: "2021 Winnebago Minnie Winnie 31K",
    dates: "Mar 20-25, 2024",
    status: "booked",
    createdAt: "2024-01-08",
  },
];

const tabs = ["Dashboard", "Inquiries", "RVs", "Settings"];

const statsCards = [
  {
    title: 'Total Revenue',
    value: '$42,500',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Active Bookings',
    value: '12',
    change: '+4',
    trend: 'up',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Available RVs',
    value: '8',
    change: '-2',
    trend: 'down',
    icon: Car,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'New Customers',
    value: '18',
    change: '+25%',
    trend: 'up',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Blog Posts',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: FileText,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    title: 'Blog Views',
    value: '12.5K',
    change: '+18%',
    trend: 'up',
    icon: BarChart3,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gray-50">
        {/* Admin Header */}
        <div className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="text-sm text-gray-600">
                Welcome back, Admin
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "py-4 px-1 border-b-2 font-medium text-sm",
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Dashboard Tab */}
          {activeTab === "Dashboard" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((stat) => (
                  <Card key={stat.title}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <stat.icon className={`h-8 w-8 ${stat.color} opacity-20`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/admin/inquiries">
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        View Inquiries
                      </Button>
                    </Link>
                    <Link href="/admin/fleet/add">
                      <Button variant="outline" className="w-full justify-start">
                        <Car className="h-4 w-4 mr-2" />
                        Add New RV
                      </Button>
                    </Link>
                    <Link href="/admin/blog/posts/new">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Write Blog Post
                      </Button>
                    </Link>
                    <Link href="/admin/blog">
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Blog Dashboard
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Inquiries */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                  <CardDescription>Latest rental inquiries from customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockInquiries.slice(0, 3).map((inquiry) => (
                      <div key={inquiry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{inquiry.name}</p>
                          <p className="text-sm text-gray-600">{inquiry.rv} • {inquiry.dates}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "px-2 py-1 text-xs font-medium rounded-full",
                            inquiry.status === "new" && "bg-orange-100 text-orange-700",
                            inquiry.status === "contacted" && "bg-blue-100 text-blue-700",
                            inquiry.status === "booked" && "bg-green-100 text-green-700"
                          )}>
                            {inquiry.status}
                          </span>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Inquiries Tab */}
          {activeTab === "Inquiries" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Inquiries</CardTitle>
                    <CardDescription>Manage rental inquiries and customer communications</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium text-gray-900">Customer</th>
                        <th className="text-left p-4 font-medium text-gray-900">RV</th>
                        <th className="text-left p-4 font-medium text-gray-900">Dates</th>
                        <th className="text-left p-4 font-medium text-gray-900">Status</th>
                        <th className="text-left p-4 font-medium text-gray-900">Created</th>
                        <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockInquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{inquiry.name}</p>
                              <p className="text-sm text-gray-600">{inquiry.email}</p>
                            </div>
                          </td>
                          <td className="p-4">{inquiry.rv}</td>
                          <td className="p-4">{inquiry.dates}</td>
                          <td className="p-4">
                            <span className={cn(
                              "px-2 py-1 text-xs font-medium rounded-full",
                              inquiry.status === "new" && "bg-orange-100 text-orange-700",
                              inquiry.status === "contacted" && "bg-blue-100 text-blue-700",
                              inquiry.status === "booked" && "bg-green-100 text-green-700"
                            )}>
                              {inquiry.status}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-gray-600">{inquiry.createdAt}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                Reply
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* RVs Tab */}
          {activeTab === "RVs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Manage RVs</h2>
                <Button>
                  Add New RV
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rvData.map((rv) => (
                  <Card key={rv.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{rv.name}</CardTitle>
                      <CardDescription>{rv.type} • ${rv.pricePerDay}/day</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className="font-medium text-green-600">Available</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sleeps:</span>
                          <span className="font-medium">{rv.sleeps}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Next Booking:</span>
                          <span className="font-medium">Mar 20, 2024</span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "Settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your admin preferences and system settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Notification Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Email me about new inquiries</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Daily summary report</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">SMS alerts for urgent inquiries</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Business Hours</h3>
                    <p className="text-sm text-gray-600">Set your availability for customer inquiries</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="openTime">Opening Time</label>
                        <input id="openTime" type="time" defaultValue="09:00" />
                      </div>
                      <div>
                        <label htmlFor="closeTime">Closing Time</label>
                        <input id="closeTime" type="time" defaultValue="18:00" />
                      </div>
                    </div>
                  </div>
                  
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
