import React, { useEffect, useState } from 'react';
import { Star, Quote, PlayCircle } from 'lucide-react';
import { Testimonial, SiteSettings } from '../types';
import { db } from '../services/dataService';

interface TestimonialsProps {
  settings?: SiteSettings;
}

const Testimonials: React.FC<TestimonialsProps> = ({ settings }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // ✅ VIDEO COMES FROM ADMIN SETTINGS (OPTIONAL)
  const videoUrl = settings?.testimonialVideoUrl?.trim();

  useEffect(() => {
    const loadData = async () => {
      const items = await db.getTestimonials();

      // ⭐ ONLY FEATURED TESTIMONIALS
      setTestimonials(items.filter(t => t.featured));
    };

    loadData();
    const unsubscribe = db.subscribe(loadData);
    return () => unsubscribe();
  }, []);

  return (
    <div className="py-16 bg-gray-50 animate-fade-in">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h1>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We take pride in our impeccable reputation. Hear from the families and investors we've helped on their journey to property ownership.
          </p>
        </div>

        {/* ⭐ FEATURED WRITTEN TESTIMONIALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {testimonials.map(item => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 relative hover:shadow-xl transition-shadow"
            >
              <Quote className="absolute top-6 right-6 text-green-100" size={48} />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={e =>
                    ((e.target as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${item.name}&background=random`)
                  }
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
                />

                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  <p className="text-green-600 text-sm font-medium">{item.role}</p>

                  <div className="flex text-[#FF2C2C] mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 italic leading-relaxed">
                “{item.quote}”
              </p>
            </div>
          ))}

          {testimonials.length === 0 && (
            <div className="col-span-2 text-center text-gray-500 italic">
              No featured testimonials yet.
            </div>
          )}
        </div>

        {/* 🎥 VIDEO TESTIMONIAL (ONLY IF ADMIN ADDS LINK) */}
        {videoUrl && (
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                See It To Believe It
              </h2>
              <p className="text-gray-600">
                Real stories from real people investing with Model Land.
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl">
              <div className="relative pb-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={videoUrl}
                  title="Client Testimonial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="bg-green-900 text-white p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Client Testimonial</h3>
                  <p className="text-green-200 text-sm">
                    Hear directly from our happy land owners.
                  </p>
                </div>

                <div className="w-12 h-12 bg-[#FF2C2C] rounded-full flex items-center justify-center">
                  <PlayCircle size={24} className="text-white ml-1" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-green-900 rounded-2xl p-10 text-white text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join 1,000+ Happy Land Owners
            </h2>
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
