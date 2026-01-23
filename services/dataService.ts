import { Property, SiteSettings, Testimonial, BlogPost, ContactMessage } from '../types';
import { properties as defaultProperties } from '../data/properties';

const STORAGE_KEYS = {
  PROPERTIES: 'modelLandProperties',
  SETTINGS: 'modelLandSettings',
  TESTIMONIALS: 'modelLandTestimonials',
  BLOG: 'modelLandBlog',
  MESSAGES: 'modelLandMessages'
};

const defaultSettings: SiteSettings = {
  logoUrl: "https://i.ibb.co/RTYQxH6x/logo-png.png",
  heroImageUrl: "https://i.ibb.co/cXVKpwLb/494587849-122220979700179532-2068541873255690295-n.jpg",
  heroImages: [
    "https://i.ibb.co/cXVKpwLb/494587849-122220979700179532-2068541873255690295-n.jpg",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  ],
  aboutImageUrl: "https://i.ibb.co/fzHDJP6S/Whats-App-Image-2026-01-22-at-4-48-28-PM.jpg",
  whyUsImageUrl: "https://i.ibb.co/1G9QszBJ/Gemini-Generated-Image-lrkbqjlrkbqjlrkb.png",
  contactPhone: "+254 794 132 637",
  contactEmail: "modelland18@gmail.com",
  testimonialVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder",
  socialFacebook: "https://www.facebook.com/modellandinvestment",
  socialInstagram: "https://www.instagram.com/modellandinvestment",
  socialX: "https://x.com/modellandinvestment",
  socialYoutube: "https://www.youtube.com/@modellandinvestment",
  socialTiktok: "https://www.tiktok.com/@modellandinvestment"
};

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "James Kamau",
    role: "Homeowner, Hope Gardens",
    quote: "Model Land Investment made my dream of owning land a reality. The process was transparent, and I received my title deed within 30 days as promised. Highly recommended!",
    image: "https://picsum.photos/100/100?random=101"
  },
  {
    id: "2",
    name: "Sarah Wanjiku",
    role: "Investor, KCA Phase 5",
    quote: "I was looking for a secure investment for my family. The team at Model Land was professional and guided me to the perfect plot near KCA University. Great value for money.",
    image: "https://picsum.photos/100/100?random=102"
  },
  {
    id: "3",
    name: "David Omondi",
    role: "Business Owner, Kitengela",
    quote: "The payment plans are very flexible. I managed to pay for my plot in Royal Gardens in installments without any pressure. Thank you Model Land for empowering us.",
    image: "https://picsum.photos/100/100?random=103"
  },
  {
    id: "4",
    name: "Mercy Njeri",
    role: "Diaspora Client",
    quote: "Investing from abroad can be scary, but Model Land Investment kept me updated at every step with photos and videos. I felt like I was there in person. Honest and reliable.",
    image: "https://picsum.photos/100/100?random=104"
  }
];

const defaultBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Why Investing in Kitengela is a Goldmine",
    excerpt: "Kitengela has grown from a dusty town to a real estate hotspot. Here is why you should consider investing now.",
    content: "Kitengela is currently one of the fastest-growing towns in Kenya. With the expansion of the Namanga road and the influx of industries, land value has appreciated by over 200% in the last 5 years. \n\nInvestors are flocking to areas like Kisaju and Naserian because of the affordability and the promise of infrastructure development. At Model Land Investment, we have seen first-hand how our clients have reaped benefits by buying early. \n\nWhether you are looking for residential land to build a home or commercial land for speculation, Kitengela offers a diverse range of options.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "2024-02-15",
    author: "Model Land Team"
  },
  {
    id: "2",
    title: "Understanding Title Deeds in Kenya",
    excerpt: "The process of land ownership can be complex. We break down the different types of title deeds and what to look for.",
    content: "A title deed is the ultimate proof of land ownership. In Kenya, there are Freehold and Leasehold titles. \n\n1. **Freehold**: Absolute ownership of the land for an indefinite period. Most agricultural lands are freehold. \n2. **Leasehold**: Ownership for a specific period (e.g., 99 years), usually subject to paying annual rates to the government.\n\nAt Model Land Investment, we ensure all our plots have ready Freehold title deeds, giving you peace of mind and absolute ownership.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "2024-03-10",
    author: "Legal Department"
  }
];

class DataService {
  private listeners: (() => void)[] = [];

  // Subscribe to changes (Observer Pattern)
  subscribe(callback: () => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  // --- Properties ---

  async getProperties(): Promise<Property[]> {
    const stored = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(defaultProperties));
      return defaultProperties;
    }
    return JSON.parse(stored);
  }

  async addProperty(property: Property): Promise<void> {
    const props = await this.getProperties();
    const newProps = [...props, property];
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(newProps));
    this.notify();
  }

  async updateProperty(property: Property): Promise<void> {
    const props = await this.getProperties();
    const newProps = props.map(p => p.id === property.id ? property : p);
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(newProps));
    this.notify();
  }

  async deleteProperty(id: string): Promise<void> {
    const props = await this.getProperties();
    const newProps = props.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(newProps));
    this.notify();
  }

  // --- Testimonials ---

  async getTestimonials(): Promise<Testimonial[]> {
    const stored = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(defaultTestimonials));
      return defaultTestimonials;
    }
    return JSON.parse(stored);
  }

  async addTestimonial(testimonial: Testimonial): Promise<void> {
    const items = await this.getTestimonials();
    const newItems = [...items, testimonial];
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(newItems));
    this.notify();
  }

  async updateTestimonial(testimonial: Testimonial): Promise<void> {
    const items = await this.getTestimonials();
    const newItems = items.map(t => t.id === testimonial.id ? testimonial : t);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(newItems));
    this.notify();
  }

  async deleteTestimonial(id: string): Promise<void> {
    const items = await this.getTestimonials();
    const newItems = items.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(newItems));
    this.notify();
  }

  // --- Blog Posts ---

  async getBlogPosts(): Promise<BlogPost[]> {
    const stored = localStorage.getItem(STORAGE_KEYS.BLOG);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(defaultBlogPosts));
      return defaultBlogPosts;
    }
    return JSON.parse(stored);
  }

  async addBlogPost(post: BlogPost): Promise<void> {
    const items = await this.getBlogPosts();
    const newItems = [post, ...items]; // Newest first
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(newItems));
    this.notify();
  }

  async updateBlogPost(post: BlogPost): Promise<void> {
    const items = await this.getBlogPosts();
    const newItems = items.map(p => p.id === post.id ? post : p);
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(newItems));
    this.notify();
  }

  async deleteBlogPost(id: string): Promise<void> {
    const items = await this.getBlogPosts();
    const newItems = items.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(newItems));
    this.notify();
  }

  // --- Contact Messages ---

  async getMessages(): Promise<ContactMessage[]> {
    const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored);
  }

  async addMessage(message: ContactMessage): Promise<void> {
    const items = await this.getMessages();
    const newItems = [message, ...items]; // Newest first
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(newItems));
    this.notify();
  }

  async updateMessage(message: ContactMessage): Promise<void> {
    const items = await this.getMessages();
    const newItems = items.map(m => m.id === message.id ? message : m);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(newItems));
    this.notify();
  }

  async deleteMessage(id: string): Promise<void> {
    const items = await this.getMessages();
    const newItems = items.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(newItems));
    this.notify();
  }

  // --- Settings ---

  async getSettings(): Promise<SiteSettings> {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    const parsed = JSON.parse(stored);
    const merged = { ...defaultSettings, ...parsed };
    if (!merged.heroImages || merged.heroImages.length === 0) {
        merged.heroImages = defaultSettings.heroImages;
    }
    return merged;
  }

  async updateSettings(settings: SiteSettings): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    this.notify();
  }

  // --- Backup/Restore ---

  async exportData(): Promise<string> {
    const properties = await this.getProperties();
    const settings = await this.getSettings();
    const testimonials = await this.getTestimonials();
    const blog = await this.getBlogPosts();
    const messages = await this.getMessages();
    return JSON.stringify({
      properties,
      settings,
      testimonials,
      blog,
      messages,
      timestamp: new Date().toISOString()
    }, null, 2);
  }

  async importData(jsonString: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonString);
      if (data.properties && data.settings) {
        localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(data.properties));
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
        if (data.testimonials) localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(data.testimonials));
        if (data.blog) localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(data.blog));
        if (data.messages) localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(data.messages));
        
        this.notify();
        return true;
      }
    } catch (e) {
      console.error("Import failed:", e);
    }
    return false;
  }

  async resetToDefaults(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.PROPERTIES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.BLOG);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    this.notify();
    window.location.reload();
  }
}

export const db = new DataService();