import React from 'react';
import { Facebook, Twitter, Instagram, Send, Mail, Phone, MapPin, Lock, Youtube, Music } from 'lucide-react';
import { ViewState, SiteSettings } from '../types';
import Logo from './Logo';

interface FooterProps {
  setView?: (view: ViewState) => void;
  settings?: SiteSettings;
}

const Footer: React.FC<FooterProps> = ({ setView, settings }) => {
  const logoUrl = settings?.logoUrl;
  const contactPhone = settings?.contactPhone || "+254 794 132 637";
  const contactEmail = settings?.contactEmail || "modelland18@gmail.com";

  // Default fallbacks handled in dataService, but adding safety check
  const links = {
    fb: settings?.socialFacebook || "#",
    x: settings?.socialX || "#",
    insta: settings?.socialInstagram || "#",
    yt: settings?.socialYoutube || "#",
    tiktok: settings?.socialTiktok || "#"
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div>
            <div className="mb-6">
               <div className="inline-block">
                 <Logo url={logoUrl} className="h-48 w-auto" darkBackground={true} />
               </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Model Land Investment is a premier real estate company launched in 2020. We enrich lives by connecting technology to enhance your land ownership journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={links.yt} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-colors" title="YouTube">
                <Youtube size={18} />
              </a>
              <a href={links.x} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black hover:text-white transition-colors" title="X (Twitter)">
                <Twitter size={18} />
              </a>
              <a href={links.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black hover:text-[#00f2ea] transition-colors" title="TikTok">
                <Music size={18} />
              </a>
              <a href={links.insta} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors" title="Instagram">
                <Instagram size={18} />
              </a>
               <a href={links.fb} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors" title="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b-2 border-green-600 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li><button onClick={() => setView?.(ViewState.HOME)} className="text-gray-400 hover:text-green-500 transition-colors text-left">Home</button></li>
              <li><button onClick={() => setView?.(ViewState.PROJECTS)} className="text-gray-400 hover:text-green-500 transition-colors text-left">Our Projects</button></li>
              <li><button onClick={() => setView?.(ViewState.BLOG)} className="text-gray-400 hover:text-green-500 transition-colors text-left">Blog</button></li>
              <li><button onClick={() => setView?.(ViewState.ABOUT)} className="text-gray-400 hover:text-green-500 transition-colors text-left">About Us</button></li>
              <li><button onClick={() => setView?.(ViewState.TESTIMONIALS)} className="text-gray-400 hover:text-green-500 transition-colors text-left">Testimonials</button></li>
              <li><button onClick={() => setView?.(ViewState.CONTACT)} className="text-gray-400 hover:text-green-500 transition-colors text-left">Contact Us</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b-2 border-green-600 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-green-500 mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">Betty Business Center, Kitengela<br/>Opposite Kitengela Mall<br/>2nd Floor Room No.215</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-green-500 mr-3 flex-shrink-0" size={18} />
                <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="text-gray-400 hover:text-green-500 transition-colors">{contactPhone}</a>
              </li>
              <li className="flex items-center">
                <Mail className="text-green-500 mr-3 flex-shrink-0" size={18} />
                <a href={`mailto:${contactEmail}`} className="text-gray-400 hover:text-green-500 transition-colors">{contactEmail}</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b-2 border-green-600 pb-2 inline-block">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-green-600"
              />
              <button className="bg-green-700 text-white font-bold py-3 px-4 rounded hover:bg-green-800 transition-colors flex items-center justify-center">
                Subscribe <Send size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Model Land Investment. All Rights Reserved.</p>
          {setView && (
            <button 
              onClick={() => setView(ViewState.ADMIN)} 
              className="flex items-center gap-1 hover:text-green-500 transition-colors mt-4 md:mt-0"
            >
              <Lock size={12} /> Admin Login
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;