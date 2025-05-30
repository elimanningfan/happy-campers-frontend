"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  Copy,
  CheckCircle,
  AlertCircle,
  Wrench,
  Calendar,
  Eye,
  DollarSign,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { rvData } from "@/lib/rv-data";
import { cn } from "@/lib/utils";

// Extended RV data with additional admin fields
const adminRVData = rvData.map(rv => ({
  ...rv,
  status: Math.random() > 0.8 ? "maintenance" : Math.random() > 0.3 ? "available" : "booked",
  lastBooking: `2025-05-${Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')}`,
  monthlyRevenue: rv.pricePerDay * Math.floor(Math.random() * 20 + 5),
  monthlyBookings: Math.floor(Math.random() * 15 + 3),
  nextMaintenance: `2025-06-${Math.floor(Math.random() * 30 + 1).toString().padStart(2, '0')}`,
  mileage: Math.floor(Math.random() * 50000 + 10000),
  condition: Math.random() > 0.7 ? "Excellent" : Math.random() > 0.3 ? "Good" : "Fair"
}));

const statusColors = {
  available: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
  booked: { bg: "bg-blue-100", text: "text-blue-700", icon: Calendar },
  maintenance: { bg: "bg-orange-100", text: "text-orange-700", icon: Wrench },
  unavailable: { bg: "bg-gray-100", text: "text-gray-700", icon: AlertCircle }
};

export default function RVManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRVs, setSelectedRVs] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");

  // Filter and sort RVs
  const filteredRVs = adminRVData
    .filter(rv => {
      const matchesSearch = searchQuery === "" || 
        rv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rv.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rv.model.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === "all" || rv.type === filterType;
      const matchesStatus = filterStatus === "all" || rv.status === filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return b.pricePerDay - a.pricePerDay;
        case "revenue":
          return b.monthlyRevenue - a.monthlyRevenue;
        case "bookings":
          return b.monthlyBookings - a.monthlyBookings;
        default:
          return 0;
      }
    });

  const toggleRVSelection = (rvId: string) => {
    setSelectedRVs(prev =>
      prev.includes(rvId)
        ? prev.filter(id => id !== rvId)
        : [...prev, rvId]
    );
  };

  const selectAllRVs = () => {
    if (selectedRVs.length === filteredRVs.length) {
      setSelectedRVs([]);
    } else {
      setSelectedRVs(filteredRVs.map(rv => rv.id));
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const { bg, text, icon: Icon } = statusColors[status as keyof typeof statusColors];
    return (
      <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs", bg, text)}>
        <Icon className="h-3 w-3" />
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">RV Fleet Management</h1>
          <p className="text-muted-foreground">
            Manage your entire RV fleet inventory
          </p>
        </div>
        <Link href="/admin/fleet/rvs/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New RV
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search RVs by name, make, or model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Class A">Class A</SelectItem>
                <SelectItem value="Class B">Class B</SelectItem>
                <SelectItem value="Class B+">Class B+</SelectItem>
                <SelectItem value="Class C">Class C</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="bookings">Bookings</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedRVs.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selectedRVs.length} RV{selectedRVs.length > 1 ? 's' : ''} selected
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Update Status
                </Button>
                <Button variant="outline" size="sm">
                  Export Data
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* RV Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRVs.length === filteredRVs.length && filteredRVs.length > 0}
                  onCheckedChange={selectAllRVs}
                />
              </TableHead>
              <TableHead>RV</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price/Day</TableHead>
              <TableHead>Monthly Revenue</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Next Maintenance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRVs.map((rv) => (
              <TableRow key={rv.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRVs.includes(rv.id)}
                    onCheckedChange={() => toggleRVSelection(rv.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 overflow-hidden rounded">
                      <Image
                        src={rv.images[0] || "/images/placeholder.svg"}
                        alt={rv.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{rv.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {rv.year} • {rv.length} • Sleeps {rv.sleeps}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{rv.type}</TableCell>
                <TableCell>
                  <StatusBadge status={rv.status} />
                </TableCell>
                <TableCell>${rv.pricePerDay}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    ${rv.monthlyRevenue.toLocaleString()}
                    {rv.monthlyRevenue > 5000 ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                  </div>
                </TableCell>
                <TableCell>{rv.monthlyBookings}</TableCell>
                <TableCell>
                  <span className={cn(
                    "text-sm",
                    rv.condition === "Excellent" && "text-green-600",
                    rv.condition === "Good" && "text-blue-600",
                    rv.condition === "Fair" && "text-orange-600"
                  )}>
                    {rv.condition}
                  </span>
                </TableCell>
                <TableCell>{rv.nextMaintenance}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/rvs/${rv.slug}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/fleet/rvs/${rv.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
