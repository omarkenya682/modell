import React, { useState, useEffect } from 'react';
import { Star, Quote, PlayCircle } from 'lucide-react';
import { Testimonial, SiteSettings } from '../types';
import { db } from '../services/dataService';

interface TestimonialsProps {
  settings?: SiteSettings;
}

const Testimonials: React.FC<TestimonialsProps> = ({ settings }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  // Video URL editable via admin settings
  const videoUrl = settings?.testimonialVideoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ";

  useEffect(() => {
    const loadData = async () => {
      const items = await db.getTestimonials();
      setTestimonials(items);
    };
    loadData();
    const unsubscribe = db.subscribe(loadData);
    return () => unsubscribe();
  }, []);

  return (
    <div className="py-16 bg-gray-50 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h1>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from the families and investors we've helped on their journey to property ownership.
          </p>
        </div>

        {/* Written Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {testimonials.length > 0 ? (
            testimonials.map((item) => (
              <div key={item.id} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 relative hover:shadow-xl transition-shadow duration-300">
                <Quote className="absolute top-6 right-6 text-green-100" size={48} />
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={item.image.startsWith('/assets/uploads/') ? item.image : `/assets/uploads/${item.image}`} 
                    alt={item.name} 
                    onError={(e) => (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + item.name + "&background=random"}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                    <p className="text-green-600 text-sm font-medium">{item.role} | {item.project}</p>
                    <div className="flex text-[#FF2C2C] mt-1">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed relative z-10">
                  "{item.quote}"
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500 italic">
              No testimonials available at the moment.
            </div>
          )}
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See It To Believe It</h2>
            <p className="text-gray-600">Real stories from real people investing with Model Land.</p>
          </div>
          <div className="max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl relative">
             <div className="aspect-w-16 aspect-h-9 relative" style={{ paddingBottom: '56.25%' }}>
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src={videoUrl}
                  title="Model Land Client Testimonial" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                />
             </div>
             <div className="bg-green-900 text-white p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Title Issuance Day at Hope Gardens</h3>
                  <p className="text-green-200 text-sm">Watch the joy of our clients receiving their title deeds.</p>
                </div>
                <div className="w-12 h-12 bg-[#FF2C2C] rounded-full flex items-center justify-center animate-pulse">
                  <PlayCircle size={24} className="text-white ml-1" />
                </div>
             </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-green-900 rounded-2xl p-10 text-white text-center max-w-4xl mx-auto relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="relative z-10">
             <h2 className="text-2xl md:text-3xl font-bold mb-4">Join 1,000+ Happy Land Owners</h2>
             <p className="text-green-100 mb-8 max-w-2xl mx-auto">
               Start your journey with Model Land Investment today. We promise a transparent, secure, and rewarding experience.
             </p>
             <button className="bg-[#FF2C2C] hover:bg-[#d91b1b] text-white font-bold py-3 px-8 rounded-full transition-colors">
               Become Our Next Success Story
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
