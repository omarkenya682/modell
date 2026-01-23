import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import { db } from '../services/dataService';
import { ContactMessage } from '../types';

const Contact: React.FC = () => {
  const phone = "+254 794 132 637";
  const email = "modelland18@gmail.com";

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      alert("Please fill in required fields.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate slight network delay for better UX
    setTimeout(async () => {
        const newMessage: ContactMessage = {
            id: Date.now().toString(),
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            date: new Date().toISOString(),
            status: 'New'
        };

        await db.addMessage(newMessage);
        
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subject: 'General Inquiry',
            message: ''
        });

        // Reset success message after a few seconds
        setTimeout(() => setIsSuccess(false), 5000);
    }, 800);
  };

  return (
    <div className="py-16 bg-white animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our plots or want to book a site visit? We are here to help you every step of the way.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-green-600 mt-1 mr-4" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Betty Business Center</h4>
                    <p className="text-gray-600">Kitengela, Opposite Kitengela Mall</p>
                    <p className="text-gray-600">2nd Floor Room No.215</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-green-600 mt-1 mr-4" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-gray-600 hover:text-green-600 transition-colors block">{phone}</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="text-green-600 mt-1 mr-4" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <a href={`mailto:${email}`} className="text-gray-600 hover:text-green-600 transition-colors block">{email}</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="text-green-600 mt-1 mr-4" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Working Hours</h4>
                    <p className="text-gray-600">Mon - Fri: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Sat: 8:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md h-64">
              <iframe 
                title="Office Location"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://maps.google.com/maps?q=Betty+Business+Center,+Kitengela&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              {isSuccess && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded flex items-center gap-2">
                      <CheckCircle size={20} className="text-green-600" />
                      <div>
                          <span className="font-bold">Success!</span> Your message has been sent. We will contact you shortly.
                      </div>
                  </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input 
                        type="text" 
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" 
                        placeholder="John" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" 
                        placeholder="Doe" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" 
                        placeholder="john@example.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" 
                        placeholder="+254..." 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  >
                    <option>General Inquiry</option>
                    <option>Book Site Visit</option>
                    <option>Plot Availability</option>
                    <option>Payment Plan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea 
                    name="message"
                    required
                    rows={4} 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full md:w-auto gap-2" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                     {isSubmitting ? 'Sending...' : (
                         <>
                            Send Message <Send size={18} />
                         </>
                     )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;