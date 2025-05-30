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
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '(555) 123-4567',
    rvSlug: '2024-entegra-ethos-20d',
    rvName: '2024 Entegra Ethos 20D',
    tripStartDate: '2024-01-15',
    tripEndDate: '2024-01-22',
    pickupLocation: 'Sacramento, CA',
    dropoffLocation: 'Sacramento, CA',
    numberOfGuests: 2,
    specialRequests: 'First time RV rental. Would appreciate orientation on RV systems.',
    howDidYouHear: 'Google Search',
    assignedTo: '2',
    priority: 'high',
    notes: generateMockNotes('1'),
    customerHistory: {
      previousInquiries: 0,
      previousBookings: 0,
      totalRevenue: 0
    }
  },
  {
    id: '2',
    status: 'contacted',
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '(555) 234-5678',
    rvSlug: '2022-thor-four-winds-28a',
    rvName: '2022 Thor Four Winds 28A',
    tripStartDate: '2024-02-01',
    tripEndDate: '2024-02-14',
    pickupLocation: 'San Francisco, CA',
    dropoffLocation: 'San Francisco, CA',
    numberOfGuests: 4,
    specialRequests: 'Traveling with 2 small dogs. Need pet-friendly options.',
    howDidYouHear: 'Friend Referral',
    assignedTo: '3',
    notes: generateMockNotes('2'),
    customerHistory: {
      previousInquiries: 2,
      previousBookings: 1,
      totalRevenue: 3500
    },
    internalNotes: 'Customer previously rented a Class B van. Upgrading to Class C for more space.'
  },
  {
    id: '3',
    status: 'quoted',
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    customerName: 'Mike Chen',
    customerEmail: 'mchen@business.com',
    customerPhone: '(555) 345-6789',
    rvSlug: '2021-winnebago-minnie-winnie-31h',
    rvName: '2021 Winnebago Minnie Winnie 31H',
    tripStartDate: '2024-03-15',
    tripEndDate: '2024-03-30',
    pickupLocation: 'Los Angeles, CA',
    dropoffLocation: 'Los Angeles, CA',
    numberOfGuests: 6,
    specialRequests: 'Need delivery to LAX area hotel. Business conference attendees.',
    howDidYouHear: 'Corporate Travel Department',
    assignedTo: '2',
    priority: 'medium',
    customerNotes: 'Prefers morning pickup times',
    internalNotes: 'Quoted premium rate for peak season. Customer considering.',
    notes: generateMockNotes('3'),
    customerHistory: {
      previousInquiries: 1,
      previousBookings: 0,
      totalRevenue: 0
    }
  },
  {
    id: '4',
    status: 'booked',
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@gmail.com',
    customerPhone: '(555) 456-7890',
    rvSlug: '2023-thor-twist-2ab',
    rvName: '2023 Thor Twist 2AB',
    tripStartDate: '2024-01-25',
    tripEndDate: '2024-01-28',
    pickupLocation: 'Sacramento, CA',
    dropoffLocation: 'Sacramento, CA',
    numberOfGuests: 3,
    specialRequests: 'Planning to visit Yosemite. Need camping equipment package.',
    howDidYouHear: 'Returning Customer',
    assignedTo: '3',
    priority: 'high',
    customerNotes: 'VIP customer - always takes excellent care of our RVs',
    notes: generateMockNotes('4'),
    customerHistory: {
      previousInquiries: 5,
      previousBookings: 3,
      totalRevenue: 8750
    }
  },
  {
    id: '5',
    status: 'closed',
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    customerName: 'Robert Wilson',
    customerEmail: 'rwilson@email.com',
    customerPhone: '(555) 567-8901',
    rvSlug: '2024-thor-four-winds-22b',
    rvName: '2024 Thor Four Winds 22B',
    tripStartDate: '2024-01-10',
    tripEndDate: '2024-01-17',
    pickupLocation: 'San Diego, CA',
    dropoffLocation: 'San Diego, CA',
    numberOfGuests: 3,
    howDidYouHear: 'Google Search',
    internalNotes: 'Customer decided to book with competitor due to availability',
    notes: generateMockNotes('5'),
    customerHistory: {
      previousInquiries: 1,
      previousBookings: 0,
      totalRevenue: 0
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
