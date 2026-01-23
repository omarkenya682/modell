export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  deposit: string;
  paymentPlan: string;
  size: string;
  image: string;
  features: string[];
  status: 'Available' | 'Sold Out' | 'Selling Fast';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}

export interface SiteSettings {
  logoUrl: string;
  heroImageUrl: string; // Kept for backward compatibility, but effectively replaced by heroImages
  heroImages: string[]; // New field for the slider
  aboutImageUrl: string;
  whyUsImageUrl: string;
  contactPhone: string;
  contactEmail: string;
  testimonialVideoUrl: string;
  // Social Media
  socialFacebook: string;
  socialInstagram: string;
  socialX: string;
  socialYoutube: string;
  socialTiktok: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Read' | 'Replied';
}

export enum ViewState {
  HOME = 'HOME',
  PROJECTS = 'PROJECTS',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  TESTIMONIALS = 'TESTIMONIALS',
  BLOG = 'BLOG',
  ADMIN = 'ADMIN'
}