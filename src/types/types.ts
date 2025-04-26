// Types
// User/Client types

export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    measurements?: Measurements;
}

// Measurement type
export interface Measurements {
    neck?: number;
    chest?: number;
    waist?: number;
    hip?: number;
    shoulder?: number;
    sleeve?: number;
    inseam?: number;
    outseam?: number;
    thigh?: number;
    calf?: number;
    ankle?: number;
    wrist?: number;
    armLength?: number;
    height?: number;
    other?: string; 
}

// Services 
export type ServiceCategory =
    | 'native'
    | 'corporate'
    | 'casual'
    | 'sportswear'
    | 'custom';

// Service definition
export interface Service {
    id: string;
    title: string;
    description: string;
    category: ServiceCategory;
    priceRange: string;
    imageUrl: string[];
    estimatedDays: number;
    features?: string[];
}

// Portfolio
export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    category: ServiceCategory;
    imageUrl: string;
    featured: boolean;
    tags?: string[];
}

//Booking / Appointment
export interface Booking {
    id: string;
    clientId: string;
    serviceType: ServiceCategory;
    specificStyle?: string;
    date: string;
    status:  'pending' | 'confirmed' | 'completed' | 'cancelled';
    measurements?: Measurements;
    inspirationPhotoUrl?: string;
    notes?: string;
}


// Testimonials
export interface Testimonials {
    id: string;
    clientName: string;
    clientImage?: string;
    rating: number;
    text: string;
    date: string;
    serviceType: ServiceCategory;
}


// Form submission for bookings
export interface BookingFormData {
    name: string;
    email: string;
    phone: string;
    serviceType: ServiceCategory;
    specificStyle?: string;
    preferredDate: string;
    measurements: Measurements;
    inspiratonPhoto?: File;
    message?: string;
}

// Contact form data
export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}


// Theme Mode
export type ThemeMode = 'light' | 'dark';




