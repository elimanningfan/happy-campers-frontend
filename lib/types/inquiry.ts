export type InquiryStatus = 'new' | 'contacted' | 'quoted' | 'booked' | 'closed';

export interface InquiryNote {
  id: string;
  inquiryId: string;
  authorId: string;
  authorName: string;
  content: string;
  type: 'internal' | 'email' | 'status_change' | 'assignment';
  createdAt: string;
  metadata?: {
    previousStatus?: InquiryStatus;
    newStatus?: InquiryStatus;
    assignedTo?: string;
    emailSubject?: string;
  };
}

export interface CustomerHistory {
  previousInquiries: number;
  previousBookings: number;
  totalRevenue: number;
  lastInquiryDate?: string;
  lastBookingDate?: string;
  customerSince: string;
}

export interface Inquiry {
  id: string;
  status: InquiryStatus;
  submittedAt: string;
  lastUpdated: string;
  
  // Customer Info
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  
  // Trip Details
  rvId: string;
  rvName: string;
  rvSlug: string;
  tripStartDate: string;
  tripEndDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  numberOfGuests: number;
  
  // Additional Info
  specialRequests?: string;
  howDidYouHear?: string;
  
  // Admin Fields
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high';
  customerNotes?: string;
  internalNotes?: string;
  
  // Related Data
  notes: InquiryNote[];
  customerHistory?: CustomerHistory;
}
