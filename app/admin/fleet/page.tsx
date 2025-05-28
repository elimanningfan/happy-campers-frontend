"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Calendar,
  DollarSign,
  Settings,
  Truck,
  TrendingUp,
  Users,
  Plus,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Wrench
} from "lucide-react";
import { rvData } from "@/lib/rv-data";

// Mock data for dashboard
const mockStats = {
  totalRVs: rvData.length,
  availableRVs: 7,
  bookedRVs: 2,
  maintenanceRVs: 1,
  monthlyRevenue: 45250,
  monthlyBookings: 28,
  averageBookingLength: 4.5,
  occupancyRate: 78
};

const mockUpcomingBookings = [
  {
    id: "1",
    rv: "2024 Entegra Ethos 20D",
    customer: "John Smith",
    startDate: "2025-06-01",
    endDate: "2025-06-05",
    status: "confirmed"
  },
  {
    id: "2",
    rv: "2021 Winnebago Minnie Winnie 31K",
    customer: "Sarah Johnson",
    startDate: "2025-06-02",
    endDate: "2025-06-09",
    status: "pending"
  },
  {
    id: "3",
    rv: "2022 Forest River Sunseeker 3250DS LE",
    customer: "Mike Davis",
    startDate: "2025-06-03",
    endDate: "2025-06-06",
    status: "confirmed"
  }
];

const mockMaintenanceSchedule = [
  {
    id: "1",
    rv: "2023 Thor Twist 2AB",
    task: "Oil Change & Filter",
    dueDate: "2025-06-10",
    priority: "medium"
  },
  {
    id: "2",
    rv: "2022 Forest River Sunseeker 2850S LE",
    task: "Annual Inspection",
    dueDate: "2025-06-15",
    priority: "high"
  }
];

const popularRVs = rvData
  .slice(0, 5)
  .map((rv, index) => ({
    name: rv.name,
    bookings: 15 - index * 2,
    revenue: (15 - index * 2) * rv.pricePerDay * 4
  }));

export default function FleetDashboard() {
  const [dateRange, setDateRange] = useState("month");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fleet Management</h1>
          <p className="text-muted-foreground">
            Manage your RV fleet, bookings, and maintenance
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/fleet/bookings/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Booking
            </Button>
          </Link>
          <Link href="/admin/fleet/rvs/new">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add RV
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fleet</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalRVs}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
              {mockStats.availableRVs} available
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockStats.monthlyRevenue.toLocaleString()}
            </div>
            <div className="flex items-center text-xs">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+12%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.monthlyBookings}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {mockStats.averageBookingLength} days avg
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.occupancyRate}%</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+5%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Status Overview</CardTitle>
          <CardDescription>Current status of all RVs in your fleet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Available</p>
                <p className="text-2xl font-bold">{mockStats.availableRVs}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Booked</p>
                <p className="text-2xl font-bold">{mockStats.bookedRVs}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Wrench className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Maintenance</p>
                <p className="text-2xl font-bold">{mockStats.maintenanceRVs}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Unavailable</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </div>
            <Link href="/admin/fleet/bookings">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockUpcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{booking.rv}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.customer} • {booking.startDate} to {booking.endDate}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular RVs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Popular RVs</CardTitle>
              <CardDescription>Most booked this month</CardDescription>
            </div>
            <Link href="/admin/fleet/rvs">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularRVs.map((rv, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1">{rv.name}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{rv.bookings} bookings</span>
                      <span>${rv.revenue.toLocaleString()} revenue</span>
                    </div>
                  </div>
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(rv.bookings / 15) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Schedule */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Maintenance Schedule</CardTitle>
            <CardDescription>Upcoming maintenance tasks</CardDescription>
          </div>
          <Link href="/admin/fleet/maintenance">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMaintenanceSchedule.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{task.rv}</p>
                  <p className="text-xs text-muted-foreground">
                    {task.task} • Due: {task.dueDate}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {task.priority} priority
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Link href="/admin/fleet/rvs">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Manage RVs</p>
                <p className="text-xs text-muted-foreground">View & edit fleet</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/fleet/bookings">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Bookings</p>
                <p className="text-xs text-muted-foreground">Manage reservations</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/fleet/pricing">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Pricing</p>
                <p className="text-xs text-muted-foreground">Update rates</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/fleet/reports">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Reports</p>
                <p className="text-xs text-muted-foreground">View analytics</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
