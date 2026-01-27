import React, { useState, useEffect } from 'react';
import { Star, Quote, PlayCircle } from 'lucide-react';
import { Testimonial } from '../types';
import { db } from '../services/dataService';
import siteSettings from '../public/settings.json';

/* ---------------- VIDEO HELPERS ---------------- */
const getEmbedUrl = (url: string) => {
  if (!url) return '';

  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  if (url.includes('watch?v=')) {
    const id = url.split('watch?v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  if (url.includes('/embed/')) {
    return url;
  }

  return '';
};

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  /* ✅ SETTINGS (SAFE DEFAULTS) */
  const showVideos = siteSettings?.showTestimonialVideos ?? true;
  const videoLinks: string[] = siteSettings?.testimonialVideos ?? [];

  const embedVideos = videoLinks
    .map(getEmbedUrl)
    .filter(Boolean);

  /* ✅ LOAD TESTIMONIALS (UNCHANGED LOGIC) */
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

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h1>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from real investors who trusted Model Land Investment.
          </p>
        </div>

        {/* WRITTEN TESTIMONIALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-xl shadow-md border relative hover:shadow-xl transition"
            >
              <Quote className="absolute top-6 right-6 text-green-100" size={48} />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) =>
                    (e.currentTarget.src =
                      `https://ui-avatars.com/api/?name=${item.name}`)
                  }
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-green-600 text-sm">{item.role}</p>
                  <div className="flex text-red-600 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 italic">
                “{item.quote}”
              </p>
            </div>
          ))}

          {testimonials.length === 0 && (
            <p className="col-span-2 text-center text-gray-500 italic">
              No testimonials available yet.
            </p>
          )}
        </div>

        {/* VIDEO TESTIMONIALS */}
        {showVideos && embedVideos.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Video Testimonials
              </h2>
              <p className="text-gray-600">
                See and hear directly from our happy clients
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {embedVideos.map((url, index) => (
                <div
                  key={index}
                  className="bg-black rounded-xl overflow-hidden shadow-2xl"
                >
                  <div className="relative pt-[56.25%]">
                    <iframe
                      src={url}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                      title={`testimonial-video-${index}`}
                    />
                  </div>

                  <div className="bg-green-900 text-white p-4 flex items-center justify-between">
                    <span className="font-medium">
                      Client Testimonial
                    </span>
                    <PlayCircle className="text-red-600" />
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
