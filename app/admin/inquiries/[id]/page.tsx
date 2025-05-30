'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  User,
  DollarSign,
  AlertCircle,
  Send,
  Star,
  Package,
  FileText,
  History
} from 'lucide-react';
import { getInquiryById, saveInquiry, teamMembers } from '@/data/mock-inquiries';
import { Inquiry, InquiryStatus, InquiryNote } from '@/lib/types/inquiry';
import { getRVBySlug } from '@/lib/rv-data';
import { format, formatDistanceToNow } from 'date-fns';

const statusConfig: Record<InquiryStatus, { label: string; color: string; icon: any }> = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
  contacted: { label: 'Contacted', color: 'bg-yellow-100 text-yellow-800', icon: MessageSquare },
  quoted: { label: 'Quoted', color: 'bg-purple-100 text-purple-800', icon: DollarSign },
  booked: { label: 'Booked', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-800', icon: FileText },
};

export default function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [replySubject, setReplySubject] = useState('');

  useEffect(() => {
    const data = getInquiryById(id);
    if (data) {
      setInquiry(data);
      // Set default reply subject
      setReplySubject(`Re: RV Rental Inquiry - ${data.rvName}`);
    }
    setLoading(false);
  }, [id]);

  const handleStatusChange = (newStatus: InquiryStatus) => {
    if (!inquiry) return;

    const statusNote: InquiryNote = {
      id: `${inquiry.id}-note-${Date.now()}`,
      inquiryId: inquiry.id,
      authorId: '1',
      authorName: 'Admin',
      content: `Status changed from ${statusConfig[inquiry.status].label} to ${statusConfig[newStatus].label}`,
      type: 'status_change',
      createdAt: new Date().toISOString(),
      metadata: {
        previousStatus: inquiry.status,
        newStatus: newStatus
      }
    };

    const updated = {
      ...inquiry,
      status: newStatus,
      lastUpdated: new Date().toISOString(),
      notes: [...inquiry.notes, statusNote]
    };

    saveInquiry(updated);
    setInquiry(updated);
  };

  const handleAssignmentChange = (assignedTo: string) => {
    if (!inquiry) return;

    const assignmentNote: InquiryNote = {
      id: `${inquiry.id}-note-${Date.now()}`,
      inquiryId: inquiry.id,
      authorId: '1',
      authorName: 'Admin',
      content: assignedTo === 'unassigned' ? 'Unassigned' : `Assigned to ${teamMembers.find(m => m.id === assignedTo)?.name}`,
      type: 'assignment',
      createdAt: new Date().toISOString(),
      metadata: {
        assignedTo: assignedTo === 'unassigned' ? undefined : assignedTo
      }
    };

    const updated = {
      ...inquiry,
      assignedTo: assignedTo === 'unassigned' ? undefined : assignedTo,
      lastUpdated: new Date().toISOString(),
      notes: [...inquiry.notes, assignmentNote]
    };

    saveInquiry(updated);
    setInquiry(updated);
  };

  const handleAddNote = () => {
    if (!inquiry || !newNote.trim()) return;

    const note: InquiryNote = {
      id: `${inquiry.id}-note-${Date.now()}`,
      inquiryId: inquiry.id,
      authorId: '1',
      authorName: 'Admin',
      content: newNote,
      type: 'internal',
      createdAt: new Date().toISOString()
    };

    const updated = {
      ...inquiry,
      internalNotes: (inquiry.internalNotes || '') + '\n' + newNote,
      lastUpdated: new Date().toISOString(),
      notes: [...inquiry.notes, note]
    };

    saveInquiry(updated);
    setInquiry(updated);
    setNewNote('');
  };

  const handleSendReply = () => {
    if (!inquiry || !replyMessage.trim()) return;

    const emailNote: InquiryNote = {
      id: `${inquiry.id}-note-${Date.now()}`,
      inquiryId: inquiry.id,
      authorId: '1',
      authorName: 'Admin',
      content: replyMessage,
      type: 'email',
      createdAt: new Date().toISOString(),
      metadata: {
        emailSubject: replySubject
      }
    };

    const updated = {
      ...inquiry,
      status: inquiry.status === 'new' ? 'contacted' : inquiry.status,
      lastUpdated: new Date().toISOString(),
      notes: [...inquiry.notes, emailNote]
    };

    saveInquiry(updated);
    setInquiry(updated);
    setReplyMessage('');
    
    // Show success message
    alert('Email sent successfully!');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!inquiry) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Inquiry not found</h2>
        <Button onClick={() => router.push('/admin/inquiries')}>
          Back to Inquiries
        </Button>
      </div>
    );
  }

  const rv = getRVBySlug(inquiry.rvSlug);
  const StatusIcon = statusConfig[inquiry.status].icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/admin/inquiries')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Inquiry #{inquiry.id}</h1>
            <p className="text-muted-foreground mt-1">
              Submitted {formatDistanceToNow(new Date(inquiry.submittedAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge className={`${statusConfig[inquiry.status].color} text-sm px-3 py-1`}>
            <StatusIcon className="h-4 w-4 mr-2" />
            {statusConfig[inquiry.status].label}
          </Badge>
          <Select value={inquiry.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusConfig).map(([status, config]) => (
                <SelectItem key={status} value={status}>
                  <div className="flex items-center">
                    <Badge className={`${config.color} mr-2`} variant="outline">
                      {config.label}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Inquiry Details */}
          <Card>
            <CardHeader>
              <CardTitle>Inquiry Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* RV Information */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  {rv && (
                    <img
                      src={rv.images[0]}
                      alt={rv.name}
                      className="w-24 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{inquiry.rvName}</h3>
                    <Link 
                      href={`/rvs/${inquiry.rvSlug}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View RV Details →
                    </Link>
                  </div>
                </div>
                {rv && (
                  <div className="text-right">
                    <p className="text-2xl font-bold">${rv.price}</p>
                    <p className="text-sm text-muted-foreground">per night</p>
                  </div>
                )}
              </div>

              {/* Trip Details */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Trip Dates</p>
                    <p className="font-medium">
                      {format(new Date(inquiry.tripStartDate), 'MMM d')} - {format(new Date(inquiry.tripEndDate), 'MMM d, yyyy')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {Math.ceil((new Date(inquiry.tripEndDate).getTime() - new Date(inquiry.tripStartDate).getTime()) / (1000 * 60 * 60 * 24))} nights
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Guests</p>
                    <p className="font-medium">{inquiry.numberOfGuests} people</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup Location</p>
                    <p className="font-medium">{inquiry.pickupLocation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Dropoff Location</p>
                    <p className="font-medium">{inquiry.dropoffLocation}</p>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {inquiry.specialRequests && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Special Requests</p>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm">{inquiry.specialRequests}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Communication */}
          <Card>
            <CardHeader>
              <CardTitle>Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="timeline">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="email">Send Email</TabsTrigger>
                  <TabsTrigger value="notes">Internal Notes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="timeline" className="space-y-4">
                  {inquiry.notes.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No activity yet</p>
                  ) : (
                    <div className="space-y-4">
                      {inquiry.notes.map((note) => (
                        <div key={note.id} className="flex gap-4">
                          <div className="mt-1">
                            {note.type === 'email' && <Mail className="h-4 w-4 text-blue-500" />}
                            {note.type === 'internal' && <MessageSquare className="h-4 w-4 text-gray-500" />}
                            {note.type === 'status_change' && <Clock className="h-4 w-4 text-purple-500" />}
                            {note.type === 'assignment' && <User className="h-4 w-4 text-green-500" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-sm">{note.authorName}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                            {note.type === 'email' && note.metadata?.emailSubject && (
                              <p className="text-sm font-medium mb-1">Subject: {note.metadata.emailSubject}</p>
                            )}
                            <p className="text-sm">{note.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="email" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={replySubject}
                        onChange={(e) => setReplySubject(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="mt-1 min-h-[200px]"
                      />
                    </div>
                    <Button onClick={handleSendReply} className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="space-y-4">
                  <div className="space-y-4">
                    <Textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add an internal note..."
                      className="min-h-[100px]"
                    />
                    <Button onClick={handleAddNote} className="w-full">
                      Add Note
                    </Button>
                    {inquiry.internalNotes && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm whitespace-pre-wrap">{inquiry.internalNotes}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{inquiry.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a href={`mailto:${inquiry.customerEmail}`} className="font-medium text-primary hover:underline">
                  {inquiry.customerEmail}
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <a href={`tel:${inquiry.customerPhone}`} className="font-medium text-primary hover:underline">
                  {inquiry.customerPhone}
                </a>
              </div>
              {inquiry.howDidYouHear && (
                <div>
                  <p className="text-sm text-muted-foreground">How did they hear about us?</p>
                  <p className="font-medium">{inquiry.howDidYouHear}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer History */}
          {inquiry.customerHistory && (
            <Card>
              <CardHeader>
                <CardTitle>Customer History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Previous Inquiries</span>
                  </div>
                  <span className="font-medium">{inquiry.customerHistory.previousInquiries}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Previous Bookings</span>
                  </div>
                  <span className="font-medium">{inquiry.customerHistory.previousBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Revenue</span>
                  </div>
                  <span className="font-medium">${inquiry.customerHistory.totalRevenue.toLocaleString()}</span>
                </div>
                {inquiry.customerHistory.previousBookings > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <Star className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">Returning Customer</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Assignment */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={inquiry.assignedTo || 'unassigned'} onValueChange={handleAssignmentChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Convert to Booking
              </Button>
              <Button className="w-full" variant="outline">
                Generate Quote
              </Button>
              <Button className="w-full" variant="outline">
                Check Availability
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
