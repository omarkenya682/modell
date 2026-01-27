import React, { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [showVideos, setShowVideos] = useState(true);

  useEffect(() => {
    // Load testimonials
    fetch('/testimonials.json')
      .then((res) => res.json())
      .then((data) => setTestimonials(data.testimonials || []))
      .catch(console.error);

    // Load settings
    fetch('/settings.json')
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.testimonialVideos || []);
        setShowVideos(data.showTestimonialVideos !== false);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="py-16 bg-gray-50 animate-fade-in">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">What Our Clients Say</h1>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
        </div>

        {/* TEXT TESTIMONIALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-xl shadow relative">
              <Quote className="absolute top-6 right-6 text-green-100" size={40} />

              <div className="flex gap-4 mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-green-600"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${t.name}`)
                  }
                />
                <div>
                  <h3 className="font-bold">{t.name}</h3>
                  <p className="text-green-600 text-sm">{t.role}</p>
                  <div className="flex text-red-600">
                    {Array.from({ length: t.stars || 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="italic text-gray-600">“{t.quote}”</p>
            </div>
          ))}
        </div>

        {/* VIDEO TESTIMONIALS */}
        {showVideos && videos.length > 0 && (
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
            {videos.map((url, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={url.replace('watch?v=', 'embed/')}
                  className="w-full aspect-video"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Testimonials;
