import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, LogOut, Save, Pencil, X, RotateCcw, AlertCircle, Image as ImageIcon, LayoutGrid, Download, Upload, Info, MessageSquare, Quote, Share2, BookOpen, Inbox, Mail, CheckCircle, Clock } from 'lucide-react';
import { Property, ViewState, SiteSettings, Testimonial, BlogPost, ContactMessage } from '../types';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { db } from '../services/dataService';

interface AdminProps {
  setView: (view: ViewState) => void;
}

const Admin: React.FC<AdminProps> = ({ setView }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'properties' | 'testimonials' | 'blog' | 'messages' | 'settings'>('properties');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Data State
  const [properties, setProperties] = useState<Property[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Edit Mode State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  // Message View State
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [isEditingMessage, setIsEditingMessage] = useState(false);

  // Property Form State
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [deposit, setDeposit] = useState('');
  const [paymentPlan, setPaymentPlan] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState<'Available' | 'Sold Out' | 'Selling Fast'>('Available');

  // Testimonial Form State
  const [tName, setTName] = useState('');
  const [tRole, setTRole] = useState('');
  const [tQuote, setTQuote] = useState('');
  const [tImage, setTImage] = useState('');

  // Blog Form State
  const [bTitle, setBTitle] = useState('');
  const [bExcerpt, setBExcerpt] = useState('');
  const [bContent, setBContent] = useState('');
  const [bImage, setBImage] = useState('');
  const [bAuthor, setBAuthor] = useState('');
  const [bDate, setBDate] = useState('');

  // Message Edit State
  const [mFirstName, setMFirstName] = useState('');
  const [mLastName, setMLastName] = useState('');
  const [mEmail, setMEmail] = useState('');
  const [mPhone, setMPhone] = useState('');
  const [mStatus, setMStatus] = useState<'New' | 'Read' | 'Replied'>('New');

  // Settings Form State
  const [tempSettings, setTempSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const p = await db.getProperties();
      const s = await db.getSettings();
      const t = await db.getTestimonials();
      const b = await db.getBlogPosts();
      const m = await db.getMessages();
      setProperties(p);
      setSettings(s);
      setTestimonials(t);
      setBlogPosts(b);
      setMessages(m);
      // Initialize settings form if not already edited
      if (!tempSettings) setTempSettings(s);
    };
    if (isAuthenticated) {
      loadData();
      const unsubscribe = db.subscribe(loadData);
      return () => unsubscribe();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password. Try "admin"');
    }
  };

  // Property Helpers
  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setLocation('');
    setPrice('');
    setDeposit('');
    setPaymentPlan('');
    setImage('');
    setStatus('Available');
  };

  const handleEditClick = (prop: Property) => {
    setEditingId(prop.id);
    setTitle(prop.title);
    setLocation(prop.location);
    setPrice(prop.price);
    setDeposit(prop.deposit || '');
    setPaymentPlan(prop.paymentPlan || '');
    setImage(prop.image);
    setStatus(prop.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !price) {
      alert("Please fill in the required fields (Name, Location, Price)");
      return;
    }

    const propertyData: Property = {
      id: editingId || Date.now().toString(),
      title,
      location,
      price,
      deposit: deposit || 'Contact for details',
      paymentPlan: paymentPlan || 'Flexible',
      size: '1/8 Acre',
      image: image || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: ['Ready Title', 'Flexible Plan'],
      status
    };

    if (editingId) {
      await db.updateProperty(propertyData);
      alert('Property updated successfully!');
    } else {
      await db.addProperty(propertyData);
      alert('Property added successfully!');
    }
    resetForm();
  };

  // Testimonial Helpers
  const resetTestimonialForm = () => {
    setEditingTestimonialId(null);
    setTName('');
    setTRole('');
    setTQuote('');
    setTImage('');
  };

  const handleEditTestimonialClick = (t: Testimonial) => {
    setEditingTestimonialId(t.id);
    setTName(t.name);
    setTRole(t.role);
    setTQuote(t.quote);
    setTImage(t.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tName || !tQuote) {
      alert("Please fill in Name and Quote.");
      return;
    }

    const tData: Testimonial = {
      id: editingTestimonialId || Date.now().toString(),
      name: tName,
      role: tRole || 'Happy Client',
      quote: tQuote,
      image: tImage || 'https://ui-avatars.com/api/?name=' + tName
    };

    if (editingTestimonialId) {
      await db.updateTestimonial(tData);
      alert('Testimonial updated!');
    } else {
      await db.addTestimonial(tData);
      alert('Testimonial added!');
    }
    resetTestimonialForm();
  };

  // Blog Helpers
  const resetBlogForm = () => {
    setEditingBlogId(null);
    setBTitle('');
    setBExcerpt('');
    setBContent('');
    setBImage('');
    setBAuthor('');
    setBDate('');
  };

  const handleEditBlogClick = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setBTitle(post.title);
    setBExcerpt(post.excerpt);
    setBContent(post.content);
    setBImage(post.image);
    setBAuthor(post.author);
    setBDate(post.date);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bTitle || !bContent || !bExcerpt) {
      alert("Please fill in Title, Excerpt and Content.");
      return;
    }

    const postData: BlogPost = {
      id: editingBlogId || Date.now().toString(),
      title: bTitle,
      excerpt: bExcerpt,
      content: bContent,
      image: bImage || 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      author: bAuthor || 'Model Land Team',
      date: bDate || new Date().toISOString().split('T')[0]
    };

    if (editingBlogId) {
      await db.updateBlogPost(postData);
      alert('Blog Post updated!');
    } else {
      await db.addBlogPost(postData);
      alert('Blog Post added!');
    }
    resetBlogForm();
  };

  // Message Helpers
  const getSelectedMessage = () => messages.find(m => m.id === selectedMessageId);

  const startEditMessage = () => {
      const msg = getSelectedMessage();
      if(msg) {
          setIsEditingMessage(true);
          setMFirstName(msg.firstName);
          setMLastName(msg.lastName);
          setMEmail(msg.email);
          setMPhone(msg.phone);
          setMStatus(msg.status);
      }
  };

  const cancelEditMessage = () => {
      setIsEditingMessage(false);
  };

  const saveMessage = async () => {
      const msg = getSelectedMessage();
      if(msg) {
          const updatedMsg: ContactMessage = {
              ...msg,
              firstName: mFirstName,
              lastName: mLastName,
              email: mEmail,
              phone: mPhone,
              status: mStatus
          };
          await db.updateMessage(updatedMsg);
          setIsEditingMessage(false);
          alert('Message updated successfully.');
      }
  };

  const updateMessageStatus = async (id: string, newStatus: 'New' | 'Read' | 'Replied') => {
      const msg = messages.find(m => m.id === id);
      if(msg) {
          await db.updateMessage({...msg, status: newStatus});
      }
  };

  const deleteMessage = async (id: string) => {
      if(window.confirm("Delete this message permanently?")) {
          await db.deleteMessage(id);
          if(selectedMessageId === id) setSelectedMessageId(null);
      }
  };


  // General Helpers
  const handleResetData = async () => {
    if (window.confirm("This will delete all custom changes and restore factory defaults. Are you sure?")) {
      await db.resetToDefaults();
    }
  };

  const handleDownloadBackup = async () => {
    const jsonStr = await db.exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `modelland-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRestoreBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
        const success = await db.importData(event.target?.result as string);
        if (success) {
            alert("Database successfully restored from file.");
        } else {
            alert("Failed to import. Invalid file format.");
        }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tempSettings) {
      await db.updateSettings(tempSettings);
      alert('Site settings updated in database.');
    }
  };

  const updateHeroImage = (index: number, value: string) => {
    if (!tempSettings) return;
    const newImages = [...(tempSettings.heroImages || [])];
    while (newImages.length <= index) newImages.push("");
    newImages[index] = value;
    setTempSettings({ ...tempSettings, heroImages: newImages });
  };

  const newMessagesCount = messages.filter(m => m.status === 'New').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Admin Dashboard</h2>
            <p className="mt-2 text-sm text-gray-600">Please sign in to manage the database</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Password (Try 'admin')"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Button fullWidth type="submit">Sign in</Button>
            </div>
            <div className="text-center">
              <button type="button" onClick={() => setView(ViewState.HOME)} className="text-sm text-green-600 hover:text-green-500">
                Return to Website
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Loading state if data isn't ready
  if (!settings || !tempSettings) return <div className="p-8 text-center">Loading database...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Admin Header */}
      <div className="bg-gray-900 text-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex flex-col xl:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
             <span className="font-bold text-xl">Model Land Admin</span>
             <span className="bg-green-600 text-xs px-2 py-1 rounded">DB Connected</span>
          </div>
          
          <div className="flex bg-gray-800 rounded-lg p-1 overflow-x-auto max-w-full items-center">
             <button 
               onClick={() => setActiveTab('properties')}
               className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'properties' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}
             >
               <LayoutGrid size={16} /> Properties
             </button>
             <button 
               onClick={() => setActiveTab('testimonials')}
               className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'testimonials' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}
             >
               <MessageSquare size={16} /> Testimonials
             </button>
             <button 
               onClick={() => setActiveTab('blog')}
               className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'blog' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}
             >
               <BookOpen size={16} /> Blog
             </button>
             <button 
               onClick={() => setActiveTab('messages')}
               className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 relative ${activeTab === 'messages' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}
             >
               <Inbox size={16} /> Inbox
               {newMessagesCount > 0 && (
                   <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                   </span>
               )}
             </button>
             <button 
               onClick={() => setActiveTab('settings')}
               className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'settings' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}
             >
               <ImageIcon size={16} /> Config
             </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3">
             {/* Backup Controls */}
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded border border-gray-700">
              <button onClick={handleDownloadBackup} className="text-green-400 hover:text-green-300 flex items-center gap-1 text-xs font-bold uppercase" title="Save data to file">
                 <Download size={14} /> Export Data
              </button>
              <div className="w-px h-4 bg-gray-600"></div>
              <label className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-xs font-bold uppercase cursor-pointer" title="Load data from file">
                 <Upload size={14} /> Import
                 <input 
                   type="file" 
                   ref={fileInputRef}
                   accept=".json" 
                   onChange={handleRestoreBackup} 
                   className="hidden" 
                 />
              </label>
            </div>

            <div className="w-px h-6 bg-gray-700 hidden lg:block"></div>

            <button onClick={handleResetData} className="flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium border border-orange-400/30 px-3 py-1 rounded" title="Fix broken data">
              <RotateCcw size={14} /> Reset
            </button>
            <button onClick={() => setView(ViewState.HOME)} className="text-gray-300 hover:text-white text-sm">View Site</button>
            <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r flex items-start">
           <Info className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
           <div className="text-sm text-blue-800">
              <p className="font-bold">Database Mode: Local Browser Storage</p>
              <p>Your data is currently stored in this browser. To save changes permanently or move them to another computer, use the <strong>Export Data</strong> button.</p>
           </div>
        </div>
        
        {/* === PROPERTIES TAB === */}
        {activeTab === 'properties' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                  <div className="flex items-center gap-2">
                      {editingId ? <Pencil className="text-orange-500" /> : <Plus className="text-green-600" />}
                      <h3 className="text-lg font-bold text-gray-800">
                          {editingId ? 'Edit Project' : 'Add New Project'}
                      </h3>
                  </div>
                  {editingId && (
                      <button onClick={resetForm} className="text-gray-400 hover:text-gray-600" title="Cancel Edit">
                          <X size={20} />
                      </button>
                  )}
                </div>
                
                <form onSubmit={handleSubmitProperty} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="e.g. Hope Gardens Phase III" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="e.g. Kitengela" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                      <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="e.g. KES 500k" />
                      </div>
                      <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Deposit</label>
                      <input type="text" value={deposit} onChange={(e) => setDeposit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="e.g. KES 50k" />
                      </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Plan</label>
                    <input type="text" value={paymentPlan} onChange={(e) => setPaymentPlan(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="e.g. 12 Months" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Link (URL)</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="https://..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500">
                      <option value="Available">Available</option>
                      <option value="Selling Fast">Selling Fast</option>
                      <option value="Sold Out">Sold Out</option>
                    </select>
                  </div>

                  <Button fullWidth type="submit" className={`mt-4 gap-2 ${editingId ? 'bg-orange-600 hover:bg-orange-700' : ''}`}>
                    <Save size={18} /> {editingId ? 'Update Project' : 'Save Project'}
                  </Button>
                  
                  {editingId && (
                      <Button fullWidth variant="white" onClick={resetForm} type="button" className="mt-2">Cancel Editing</Button>
                  )}
                </form>
              </div>
            </div>

            {/* Right Column: List of Properties */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Current Portfolio ({properties.length})</h3>
                  <span className="text-xs text-gray-500">Click pencil to edit</span>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {properties.map((prop) => (
                    <div key={prop.id} className={`p-4 flex items-center transition-colors ${editingId === prop.id ? 'bg-orange-50 border-l-4 border-orange-500' : 'hover:bg-gray-50'}`}>
                      <div className="h-16 w-16 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden border border-gray-200 relative group">
                        <img 
                          src={prop.image} 
                          alt={prop.title} 
                          className="h-full w-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"; }}
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h4 className="text-sm font-bold text-gray-900">{prop.title}</h4>
                        <p className="text-xs text-gray-500">{prop.location}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-green-700">{prop.price}</span>
                          {prop.deposit && <span className="text-xs text-gray-500 bg-gray-100 px-1 rounded">Dep: {prop.deposit}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEditClick(prop)} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all" title="Edit Property">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => db.deleteProperty(prop.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all" title="Delete Property">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {properties.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No properties found. Add one on the left!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === TESTIMONIALS TAB === */}
        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                  <div className="flex items-center gap-2">
                      {editingTestimonialId ? <Pencil className="text-orange-500" /> : <Plus className="text-green-600" />}
                      <h3 className="text-lg font-bold text-gray-800">
                          {editingTestimonialId ? 'Edit Testimonial' : 'Add New'}
                      </h3>
                  </div>
                  {editingTestimonialId && (
                      <button onClick={resetTestimonialForm} className="text-gray-400 hover:text-gray-600" title="Cancel Edit">
                          <X size={20} />
                      </button>
                  )}
                </div>
                
                <form onSubmit={handleSubmitTestimonial} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                    <input type="text" value={tName} onChange={(e) => setTName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="e.g. John Doe" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role / Project</label>
                    <input type="text" value={tRole} onChange={(e) => setTRole(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="e.g. Investor, Hope Gardens" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quote *</label>
                    <textarea rows={4} value={tQuote} onChange={(e) => setTQuote(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="Their feedback..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                    <input type="text" value={tImage} onChange={(e) => setTImage(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="Optional URL" />
                  </div>

                  <Button fullWidth type="submit" className={`mt-4 gap-2 ${editingTestimonialId ? 'bg-orange-600 hover:bg-orange-700' : ''}`}>
                    <Save size={18} /> {editingTestimonialId ? 'Update Testimonial' : 'Save Testimonial'}
                  </Button>
                  
                  {editingTestimonialId && (
                      <Button fullWidth variant="white" onClick={resetTestimonialForm} type="button" className="mt-2">Cancel Editing</Button>
                  )}
                </form>
              </div>
            </div>

            {/* Right Column: List of Testimonials */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Client Reviews ({testimonials.length})</h3>
                  <span className="text-xs text-gray-500">Manage feedback</span>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {testimonials.map((t) => (
                    <div key={t.id} className={`p-4 flex items-start gap-4 transition-colors ${editingTestimonialId === t.id ? 'bg-orange-50 border-l-4 border-orange-500' : 'hover:bg-gray-50'}`}>
                      <div className="h-12 w-12 flex-shrink-0 bg-gray-200 rounded-full overflow-hidden border border-gray-200">
                        <img 
                          src={t.image || `https://ui-avatars.com/api/?name=${t.name}`} 
                          alt={t.name} 
                          className="h-full w-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${t.name}`; }}
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">{t.name}</h4>
                                <p className="text-xs text-green-600 font-medium">{t.role}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => handleEditTestimonialClick(t)} className="p-1.5 text-gray-400 hover:text-orange-600 bg-gray-50 hover:bg-orange-50 rounded transition-all" title="Edit">
                                    <Pencil size={14} />
                                </button>
                                <button onClick={() => db.deleteTestimonial(t.id)} className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded transition-all" title="Delete">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 italic relative pl-3 border-l-2 border-gray-200">
                           <Quote size={10} className="absolute -left-1 top-0 text-gray-400" />
                           "{t.quote}"
                        </div>
                      </div>
                    </div>
                  ))}

                  {testimonials.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No testimonials yet. Add some!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === BLOG TAB === */}
        {activeTab === 'blog' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                  <div className="flex items-center gap-2">
                      {editingBlogId ? <Pencil className="text-orange-500" /> : <Plus className="text-green-600" />}
                      <h3 className="text-lg font-bold text-gray-800">
                          {editingBlogId ? 'Edit Post' : 'Add New Post'}
                      </h3>
                  </div>
                  {editingBlogId && (
                      <button onClick={resetBlogForm} className="text-gray-400 hover:text-gray-600" title="Cancel Edit">
                          <X size={20} />
                      </button>
                  )}
                </div>
                
                <form onSubmit={handleSubmitBlog} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input type="text" value={bTitle} onChange={(e) => setBTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="e.g. Land Prices in 2024" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Excerpt *</label>
                    <textarea rows={2} value={bExcerpt} onChange={(e) => setBExcerpt(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="Brief summary displayed on list..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Content *</label>
                    <textarea rows={6} value={bContent} onChange={(e) => setBContent(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="Full article content..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input type="text" value={bImage} onChange={(e) => setBImage(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="Optional URL" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                        <input type="text" value={bAuthor} onChange={(e) => setBAuthor(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" placeholder="e.g. Admin" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" value={bDate} onChange={(e) => setBDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500" />
                      </div>
                  </div>

                  <Button fullWidth type="submit" className={`mt-4 gap-2 ${editingBlogId ? 'bg-orange-600 hover:bg-orange-700' : ''}`}>
                    <Save size={18} /> {editingBlogId ? 'Update Post' : 'Save Post'}
                  </Button>
                  
                  {editingBlogId && (
                      <Button fullWidth variant="white" onClick={resetBlogForm} type="button" className="mt-2">Cancel Editing</Button>
                  )}
                </form>
              </div>
            </div>

            {/* Right Column: List of Blog Posts */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Published Posts ({blogPosts.length})</h3>
                  <span className="text-xs text-gray-500">Manage blog content</span>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {blogPosts.map((post) => (
                    <div key={post.id} className={`p-4 flex items-start gap-4 transition-colors ${editingBlogId === post.id ? 'bg-orange-50 border-l-4 border-orange-500' : 'hover:bg-gray-50'}`}>
                      <div className="h-16 w-16 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden border border-gray-200">
                        <img 
                          src={post.image || 'https://via.placeholder.com/150'} 
                          alt={post.title} 
                          className="h-full w-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/150"; }}
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">{post.title}</h4>
                                <p className="text-xs text-green-600 font-medium">{post.date} • {post.author}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => handleEditBlogClick(post)} className="p-1.5 text-gray-400 hover:text-orange-600 bg-gray-50 hover:bg-orange-50 rounded transition-all" title="Edit">
                                    <Pencil size={14} />
                                </button>
                                <button onClick={() => db.deleteBlogPost(post.id)} className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded transition-all" title="Delete">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
                      </div>
                    </div>
                  ))}

                  {blogPosts.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No blog posts yet. Add your first article!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === MESSAGES TAB === */}
        {activeTab === 'messages' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* List View */}
              <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-[600px] flex flex-col">
                      <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
                          <h3 className="font-bold text-gray-800">Inbox</h3>
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600">{messages.length}</span>
                      </div>
                      <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                          {messages.length === 0 ? (
                              <div className="p-8 text-center text-gray-400">No messages yet.</div>
                          ) : (
                              messages.map(msg => (
                                  <div 
                                      key={msg.id}
                                      onClick={() => {
                                        setSelectedMessageId(msg.id);
                                        setIsEditingMessage(false);
                                      }}
                                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedMessageId === msg.id ? 'bg-green-50 border-l-4 border-green-600' : 'border-l-4 border-transparent'} ${msg.status === 'New' ? 'bg-white' : 'bg-gray-50'}`}
                                  >
                                      <div className="flex justify-between items-start mb-1">
                                          <span className={`text-sm font-semibold truncate ${msg.status === 'New' ? 'text-gray-900' : 'text-gray-600'}`}>
                                              {msg.firstName} {msg.lastName}
                                          </span>
                                          <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                                              {new Date(msg.date).toLocaleDateString()}
                                          </span>
                                      </div>
                                      <div className={`text-xs mb-1 truncate ${msg.status === 'New' ? 'font-medium text-gray-800' : 'text-gray-500'}`}>
                                          {msg.subject}
                                      </div>
                                      <div className="flex items-center gap-2">
                                          {msg.status === 'New' && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded">New</span>}
                                          {msg.status === 'Read' && <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 rounded">Read</span>}
                                          {msg.status === 'Replied' && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 rounded">Replied</span>}
                                      </div>
                                  </div>
                              ))
                          )}
                      </div>
                  </div>
              </div>

              {/* Detail View */}
              <div className="lg:col-span-2">
                  {selectedMessageId ? (
                      (() => {
                          const msg = getSelectedMessage();
                          if(!msg) return null;
                          return (
                            <div className="bg-white rounded-lg shadow-md p-6 h-full min-h-[600px] flex flex-col">
                                {isEditingMessage ? (
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-6">Edit Contact Info</h3>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                                    <input type="text" value={mFirstName} onChange={e => setMFirstName(e.target.value)} className="w-full px-3 py-2 border rounded" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                                    <input type="text" value={mLastName} onChange={e => setMLastName(e.target.value)} className="w-full px-3 py-2 border rounded" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                <input type="email" value={mEmail} onChange={e => setMEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                                <input type="text" value={mPhone} onChange={e => setMPhone(e.target.value)} className="w-full px-3 py-2 border rounded" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                                <select value={mStatus} onChange={e => setMStatus(e.target.value as any)} className="w-full px-3 py-2 border rounded">
                                                    <option value="New">New</option>
                                                    <option value="Read">Read</option>
                                                    <option value="Replied">Replied</option>
                                                </select>
                                            </div>
                                            <div className="pt-4 flex gap-3">
                                                <Button size="sm" onClick={saveMessage}>Save Changes</Button>
                                                <Button size="sm" variant="white" onClick={cancelEditMessage}>Cancel</Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Header */}
                                        <div className="flex justify-between items-start mb-6 border-b pb-4">
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900">{msg.subject}</h2>
                                                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                                    <span className="font-semibold text-gray-700">{msg.firstName} {msg.lastName}</span>
                                                    <span>&lt;{msg.email}&gt;</span>
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    {new Date(msg.date).toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                 <span className={`px-2 py-1 text-xs font-bold rounded uppercase tracking-wide ${
                                                    msg.status === 'New' ? 'bg-green-100 text-green-800' : 
                                                    msg.status === 'Replied' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {msg.status}
                                                </span>
                                                <div className="flex gap-2">
                                                    <button onClick={startEditMessage} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="Edit Info">
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button onClick={() => deleteMessage(msg.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete Message">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 bg-gray-50 p-6 rounded-lg mb-6 whitespace-pre-wrap text-gray-700 border border-gray-100">
                                            {msg.message}
                                        </div>

                                        {/* Footer / Contact Details */}
                                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                            <div className="bg-white p-3 border rounded">
                                                <label className="text-xs text-gray-400 block uppercase font-bold">Phone</label>
                                                <div className="font-medium text-gray-800 flex items-center gap-2">
                                                    {msg.phone || 'N/A'}
                                                    {msg.phone && <a href={`tel:${msg.phone}`} className="text-green-600 hover:underline text-xs">Call</a>}
                                                </div>
                                            </div>
                                            <div className="bg-white p-3 border rounded">
                                                <label className="text-xs text-gray-400 block uppercase font-bold">Email</label>
                                                <div className="font-medium text-gray-800 flex items-center gap-2">
                                                    {msg.email}
                                                    <a href={`mailto:${msg.email}`} className="text-green-600 hover:underline text-xs">Email</a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3 pt-4 border-t">
                                            {msg.status !== 'Read' && msg.status !== 'Replied' && (
                                                <Button size="sm" variant="outline" onClick={() => updateMessageStatus(msg.id, 'Read')}>
                                                    Mark as Read
                                                </Button>
                                            )}
                                            {msg.status !== 'Replied' && (
                                                <Button size="sm" onClick={() => updateMessageStatus(msg.id, 'Replied')}>
                                                    Mark as Replied
                                                </Button>
                                            )}
                                            <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`} target="_blank" rel="noreferrer" className="flex-1">
                                                <Button size="sm" variant="secondary" fullWidth>
                                                    <Mail size={16} className="mr-2" /> Reply via Email
                                                </Button>
                                            </a>
                                        </div>
                                    </>
                                )}
                            </div>
                          );
                      })()
                  ) : (
                      <div className="h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                          <Inbox size={48} className="mb-4 opacity-50" />
                          <p>Select a message to view details</p>
                      </div>
                  )}
              </div>
           </div>
        )}

        {/* === SETTINGS TAB === */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto">
             <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-2 mb-6 border-b pb-4">
                  <ImageIcon className="text-green-600" />
                  <h3 className="text-lg font-bold text-gray-800">Global Website Images</h3>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo URL</label>
                            <input 
                              type="text" 
                              value={tempSettings.logoUrl} 
                              onChange={(e) => setTempSettings({...tempSettings, logoUrl: e.target.value} as any)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500" 
                              placeholder="Leave empty to use Text Logo"
                            />
                            <div className="mt-2 bg-gray-100 p-2 rounded flex justify-center h-20 items-center">
                               <Logo url={tempSettings.logoUrl} className="h-16 w-auto" />
                            </div>
                         </div>
                         
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">About Us Image URL</label>
                            <input 
                              type="text" 
                              value={tempSettings.aboutImageUrl} 
                              onChange={(e) => setTempSettings({...tempSettings, aboutImageUrl: e.target.value} as any)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500" 
                            />
                            <div className="mt-2 rounded overflow-hidden h-32 w-full">
                               <img src={tempSettings.aboutImageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Invalid+Link"} />
                            </div>
                         </div>
                      </div>

                      <div className="space-y-4">
                         {/* Slider Configuration */}
                         <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                             <label className="block text-sm font-bold text-gray-800 mb-2">Home Page Hero Slider Images</label>
                             <div className="space-y-3">
                                {[0, 1, 2, 3].map((index) => (
                                    <div key={index}>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Slide {index + 1} URL</label>
                                        <input 
                                            type="text" 
                                            value={(tempSettings.heroImages && tempSettings.heroImages[index]) || ''} 
                                            onChange={(e) => updateHeroImage(index, e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-green-500" 
                                            placeholder={`Image URL for Slide ${index + 1}`}
                                        />
                                    </div>
                                ))}
                             </div>
                             <p className="text-xs text-gray-500 mt-2 italic">Paste direct image links (e.g. from ImgBB or Unsplash).</p>
                         </div>

                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">"Why Choose Us" Image URL</label>
                            <input 
                              type="text" 
                              value={tempSettings.whyUsImageUrl} 
                              onChange={(e) => setTempSettings({...tempSettings, whyUsImageUrl: e.target.value} as any)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500" 
                            />
                             <div className="mt-2 rounded overflow-hidden h-32 w-full">
                               <img src={tempSettings.whyUsImageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Invalid+Link"} />
                            </div>
                         </div>
                         
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Video Embed URL</label>
                            <input 
                              type="text" 
                              value={tempSettings.testimonialVideoUrl || ''} 
                              onChange={(e) => setTempSettings({...tempSettings, testimonialVideoUrl: e.target.value} as any)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500" 
                              placeholder="https://www.youtube.com/embed/..."
                            />
                             <p className="text-xs text-gray-500 mt-1">Must be an embed URL (e.g. youtube.com/embed/ID), not a watch URL.</p>
                         </div>
                      </div>
                   </div>

                   <div className="border-t pt-6 mt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Share2 className="text-green-600" size={20} />
                        <h4 className="font-bold text-gray-700 text-lg">Social Media Links</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Channel URL</label>
                          <input type="text" value={tempSettings.socialYoutube || ''} onChange={(e) => setTempSettings({...tempSettings, socialYoutube: e.target.value} as any)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">TikTok Profile URL</label>
                          <input type="text" value={tempSettings.socialTiktok || ''} onChange={(e) => setTempSettings({...tempSettings, socialTiktok: e.target.value} as any)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">X (Twitter) URL</label>
                          <input type="text" value={tempSettings.socialX || ''} onChange={(e) => setTempSettings({...tempSettings, socialX: e.target.value} as any)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                          <input type="text" value={tempSettings.socialInstagram || ''} onChange={(e) => setTempSettings({...tempSettings, socialInstagram: e.target.value} as any)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                        </div>
                         <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                          <input type="text" value={tempSettings.socialFacebook || ''} onChange={(e) => setTempSettings({...tempSettings, socialFacebook: e.target.value} as any)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                        </div>
                      </div>
                   </div>

                   <div className="border-t pt-6 mt-2">
                     <h4 className="font-bold text-gray-700 mb-4">Contact Info Defaults</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company Phone</label>
                          <input type="text" value={tempSettings.contactPhone} onChange={(e) => setTempSettings({...tempSettings, contactPhone: e.target.value} as any)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                       </div>
                       <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
                          <input type="text" value={tempSettings.contactEmail} onChange={(e) => setTempSettings({...tempSettings, contactEmail: e.target.value} as any)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                       </div>
                     </div>
                   </div>

                   <Button fullWidth type="submit" className="gap-2">
                     <Save size={18} /> Save Settings
                   </Button>
                </form>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;