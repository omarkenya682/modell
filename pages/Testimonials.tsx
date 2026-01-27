import React from 'react';
import { Star, Quote, PlayCircle } from 'lucide-react';
import { Testimonial, SiteSettings } from '../types';
import testimonialsData from '../public/testimonials.json';
import settingsData from '../public/settings.json';

interface TestimonialsProps {
  settings?: SiteSettings;
}

const Testimonials: React.FC<TestimonialsProps> = () => {
  const testimonials: Testimonial[] = testimonialsData.testimonials || [];

  const {
    showTestimonialVideos = true,
    testimonialVideos = []
  } = settingsData as any;

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
            Hear directly from investors who trusted Model Land Investment.
          </p>
        </div>

        {/* WRITTEN TESTIMONIALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 relative"
            >
              <Quote className="absolute top-6 right-6 text-green-100" size={48} />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${item.name}`)
                  }
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
                />

                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-green-600 text-sm">{item.role}</p>

                  <div className="flex text-red-600 mt-1">
                    {Array.from({ length: item.stars || 5 }).map((_, i) => (
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
            <div className="col-span-2 text-center text-gray-500 italic">
              No testimonials available yet.
            </div>
          )}
        </div>

        {/* VIDEO TESTIMONIALS */}
        {showTestimonialVideos && testimonialVideos.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Video Testimonials
              </h2>
              <p className="text-gray-600">
                Watch real clients share their experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {testimonialVideos.map((vid: any, index: number) => (
                <div
                  key={index}
                  className="bg-black rounded-xl overflow-hidden shadow-xl"
                >
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={vid.video.replace('watch?v=', 'embed/')}
                      title={`Testimonial video ${index + 1}`}
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-green-900 rounded-2xl p-10 text-white text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Join 1,000+ Happy Land Owners
          </h2>
          <p className="text-green-100 mb-6">
            Your land investment journey starts with trust.
          </p>
          <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-bold">
            Become Our Next Success Story
          </button>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
