import React, { useEffect, useState } from 'react';
import { Star, Quote, PlayCircle } from 'lucide-react';
import { Testimonial, SiteSettings } from '../types';
import testimonialsData from '../public/testimonials.json';
import settingsData from '../public/settings.json';

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialVideos, setTestimonialVideos] = useState<{ url: string; show: boolean }[]>([]);

  // Load testimonials and videos from JSON
  useEffect(() => {
    if (testimonialsData?.testimonials) setTestimonials(testimonialsData.testimonials);
    if (settingsData?.testimonialVideos) setTestimonialVideos(settingsData.testimonialVideos);
  }, []);

  return (
    <div className="py-16 bg-gray-50 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h1>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We take pride in our impeccable reputation. Hear from the families and investors we've helped on their journey to property ownership.
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
                    src={item.image}
                    alt={item.name}
                    onError={(e) => (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${item.name}&background=random`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                    <p className="text-green-600 text-sm font-medium">{item.role}</p>
                    <div className="flex text-[#FF2C2C] mt-1">
                      {Array.from({ length: item.stars }, (_, i) => (
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

        {/* Video Testimonials */}
        {testimonialVideos.filter((v) => v.show).length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">See It To Believe It</h2>
              <p className="text-gray-600">Real stories from real people investing with Model Land.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {testimonialVideos.filter((v) => v.show).map((video, idx) => (
                <div key={idx} className="bg-black rounded-xl overflow-hidden shadow-2xl relative">
                  <div className="aspect-w-16 aspect-h-9 relative" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={video.url.includes('youtube.com') || video.url.includes('youtu.be') ? video.url.replace('watch?v=', 'embed/') : video.url}
                      title={`Testimonial Video ${idx + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="bg-green-900 text-white p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">Client Story {idx + 1}</h3>
                      <p className="text-green-200 text-sm">Watch the joy of our clients receiving their title deeds.</p>
                    </div>
                    <div className="w-12 h-12 bg-[#FF2C2C] rounded-full flex items-center justify-center animate-pulse">
                      <PlayCircle size={24} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
