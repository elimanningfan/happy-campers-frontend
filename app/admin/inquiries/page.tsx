'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MoreHorizontal,
  Eye,
  MessageSquare,
  CheckCircle,
  Search,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Filter
} from 'lucide-react';
import { loadInquiries, saveInquiry } from '@/data/mock-inquiries';
import { Inquiry, InquiryStatus } from '@/lib/types/inquiry';
import { formatDistanceToNow, format } from 'date-fns';

const statusConfig: Record<InquiryStatus, { label: string; color: string }> = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-800' },
  contacted: { label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
  quoted: { label: 'Quoted', color: 'bg-purple-100 text-purple-800' },
  booked: { label: 'Booked', color: 'bg-green-100 text-green-800' },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-800' },
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = loadInquiries();
    setInquiries(data);
    setFilteredInquiries(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = inquiries;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(inquiry => inquiry.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(inquiry =>
        inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.rvName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredInquiries(filtered);
  }, [searchTerm, statusFilter, inquiries]);

  const updateInquiryStatus = (id: string, newStatus: InquiryStatus) => {
    const inquiry = inquiries.find(i => i.id === id);
    if (inquiry) {
      const updated = {
        ...inquiry,
        status: newStatus,
        lastUpdated: new Date().toISOString(),
      };
      saveInquiry(updated);
      setInquiries(prev => prev.map(i => i.id === id ? updated : i));
    }
  };

  // Calculate statistics
  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    quoted: inquiries.filter(i => i.status === 'quoted').length,
    booked: inquiries.filter(i => i.status === 'booked').length,
  };

  const conversionRate = stats.total > 0 
    ? ((stats.booked / stats.total) * 100).toFixed(1)
    : '0';

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Rental Inquiries</h1>
        <p className="text-muted-foreground mt-2">
          Manage and respond to customer rental inquiries
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <MessageSquare className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.contacted + stats.quoted}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booked</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.booked}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{conversionRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Inquiries</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[250px]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="quoted">Quoted</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>RV Requested</TableHead>
                <TableHead>Trip Dates</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>
                    <Badge className={statusConfig[inquiry.status].color}>
                      {statusConfig[inquiry.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{format(new Date(inquiry.submittedAt), 'MMM d, yyyy')}</div>
                      <div className="text-muted-foreground">
                        {formatDistanceToNow(new Date(inquiry.submittedAt), { addSuffix: true })}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{inquiry.customerName}</div>
                      <div className="text-sm text-muted-foreground">
                        {inquiry.customerHistory && inquiry.customerHistory.previousBookings > 0 && (
                          <span className="text-green-600">
                            Returning ({inquiry.customerHistory.previousBookings} bookings)
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{inquiry.rvName}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{format(new Date(inquiry.tripStartDate), 'MMM d')} - </div>
                      <div>{format(new Date(inquiry.tripEndDate), 'MMM d, yyyy')}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {inquiry.numberOfGuests}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{inquiry.customerEmail}</div>
                      <div className="text-muted-foreground">{inquiry.customerPhone}</div>
                    </div>
                  </TableCell>
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
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/inquiries/${inquiry.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Send Reply
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        {Object.entries(statusConfig).map(([status, config]) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => updateInquiryStatus(inquiry.id, status as InquiryStatus)}
                            disabled={inquiry.status === status}
                          >
                            <Badge 
                              className={`mr-2 ${config.color}`}
                              variant="outline"
                            >
                              {config.label}
                            </Badge>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
