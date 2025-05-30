import { Inquiry, InquiryNote } from '@/lib/types/inquiry';

export const generateMockNotes = (inquiryId: string): InquiryNote[] => {
  return [
    {
      id: `${inquiryId}-note-1`,
      inquiryId,
      authorId: '1',
      authorName: 'System',
      content: 'New inquiry received',
      type: 'status_change',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      metadata: {
        previousStatus: 'new',
        newStatus: 'new'
      }
    }
  ];
};

// Team members for assignment
export const teamMembers = [
  { id: '1', name: 'Sarah Johnson' },
  { id: '2', name: 'Mike Chen' },
  { id: '3', name: 'Emily Davis' },
  { id: '4', name: 'Tom Wilson' }
];

// Get inquiry by ID
export const getInquiryById = (id: string): Inquiry | null => {
  const inquiries = loadInquiries();
  return inquiries.find(inquiry => inquiry.id === id) || null;
};

// Save a single inquiry
export const saveInquiry = (inquiry: Inquiry): void => {
  const inquiries = loadInquiries();
  const index = inquiries.findIndex(i => i.id === inquiry.id);
  
  if (index !== -1) {
    inquiries[index] = inquiry;
  } else {
    inquiries.push(inquiry);
  }
  
  saveInquiries(inquiries);
};

export const mockInquiries: Inquiry[] = [
  {
    id: '1',
    status: 'new',
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '(555) 123-4567',
    rvId: '1',
    rvName: 'Mountain Explorer Class A',
    rvSlug: 'mountain-explorer-class-a',
    tripStartDate: '2024-07-15',
    tripEndDate: '2024-07-22',
    pickupLocation: 'Main Office - Bend, OR',
    dropoffLocation: 'Main Office - Bend, OR',
    numberOfGuests: 6,
    specialRequests: 'First time RVing, would appreciate a thorough walkthrough. Also interested in bike rack rental.',
    howDidYouHear: 'Google Search',
    assignedTo: '2',
    priority: 'high',
    notes: generateMockNotes('1'),
    customerHistory: {
      previousInquiries: 0,
      previousBookings: 0,
      totalRevenue: 0,
      customerSince: new Date().toISOString()
    }
  },
  {
    id: '2',
    status: 'contacted',
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    customerName: 'Emily Johnson',
    customerEmail: 'emily.j@email.com',
    customerPhone: '(555) 234-5678',
    rvId: '2',
    rvName: 'Coastal Cruiser Class C',
    rvSlug: 'coastal-cruiser-class-c',
    tripStartDate: '2024-08-01',
    tripEndDate: '2024-08-10',
    pickupLocation: 'Main Office - Bend, OR',
    dropoffLocation: 'Portland, OR (Additional Fee)',
    numberOfGuests: 4,
    specialRequests: 'Traveling with 2 small dogs. Need pet-friendly options.',
    howDidYouHear: 'Friend Referral',
    assignedTo: '3',
    notes: generateMockNotes('2'),
    customerHistory: {
      previousInquiries: 2,
      previousBookings: 1,
      totalRevenue: 2850,
      lastBookingDate: '2023-09-15',
      customerSince: '2023-06-01'
    }
  },
  {
    id: '3',
    status: 'quoted',
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    customerName: 'Michael Chen',
    customerEmail: 'mchen@email.com',
    customerPhone: '(555) 345-6789',
    rvId: '4',
    rvName: 'Summit Seeker Travel Trailer',
    rvSlug: 'summit-seeker-travel-trailer',
    tripStartDate: '2024-09-15',
    tripEndDate: '2024-09-25',
    pickupLocation: 'Main Office - Bend, OR',
    dropoffLocation: 'Main Office - Bend, OR',
    numberOfGuests: 5,
    specialRequests: 'Planning to visit multiple national parks. Need advice on campground bookings.',
    howDidYouHear: 'Instagram',
    assignedTo: '2',
    priority: 'medium',
    customerNotes: 'Prefers morning pickup times',
    internalNotes: 'Quoted premium rate for peak season. Customer considering.',
    notes: generateMockNotes('3'),
    customerHistory: {
      previousInquiries: 1,
      previousBookings: 0,
      totalRevenue: 0,
      lastInquiryDate: '2024-01-15',
      customerSince: '2024-01-15'
    }
  },
  {
    id: '4',
    status: 'booked',
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    customerName: 'Sarah Williams',
    customerEmail: 'swilliams@email.com',
    customerPhone: '(555) 456-7890',
    rvId: '3',
    rvName: 'Desert Wanderer Motorhome',
    rvSlug: 'desert-wanderer-motorhome',
    tripStartDate: '2024-06-20',
    tripEndDate: '2024-06-27',
    pickupLocation: 'Main Office - Bend, OR',
    dropoffLocation: 'Main Office - Bend, OR',
    numberOfGuests: 4,
    specialRequests: 'Celebrating 25th anniversary. Any special touches would be appreciated!',
    howDidYouHear: 'Returning Customer',
    assignedTo: '3',
    priority: 'high',
    customerNotes: 'VIP customer - always takes excellent care of our RVs',
    notes: generateMockNotes('4'),
    customerHistory: {
      previousInquiries: 5,
      previousBookings: 3,
      totalRevenue: 8550,
      lastBookingDate: '2023-10-20',
      customerSince: '2022-05-15'
    }
  },
  {
    id: '5',
    status: 'closed',
    submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    customerName: 'Robert Davis',
    customerEmail: 'rdavis@email.com',
    customerPhone: '(555) 567-8901',
    rvId: '5',
    rvName: 'Trailblazer Expedition RV',
    rvSlug: 'trailblazer-expedition-rv',
    tripStartDate: '2024-07-01',
    tripEndDate: '2024-07-05',
    pickupLocation: 'Main Office - Bend, OR',
    dropoffLocation: 'Main Office - Bend, OR',
    numberOfGuests: 3,
    howDidYouHear: 'Google Search',
    internalNotes: 'Customer decided to book with competitor due to availability',
    notes: generateMockNotes('5'),
    customerHistory: {
      previousInquiries: 1,
      previousBookings: 0,
      totalRevenue: 0,
      customerSince: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    }
  }
];

// Helper functions for localStorage management
export const saveInquiries = (inquiries: Inquiry[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('hc_inquiries', JSON.stringify(inquiries));
  }
};

export const loadInquiries = (): Inquiry[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('hc_inquiries');
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return mockInquiries;
};
