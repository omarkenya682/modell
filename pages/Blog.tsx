import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { BlogPost } from '../types';
import { db } from '../services/dataService';
import Button from '../components/Button';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await db.getBlogPosts();
      setPosts(data);
    };
    loadData();
    const unsubscribe = db.subscribe(loadData);
    return () => unsubscribe();
  }, []);

  if (selectedPost) {
    return (
      <div className="py-16 bg-white animate-fade-in min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
           <button 
             onClick={() => setSelectedPost(null)}
             className="flex items-center text-green-700 font-bold mb-8 hover:underline"
           >
             <ArrowLeft size={20} className="mr-2" /> Back to Blog
           </button>

           <div className="mb-6">
             <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
               Real Estate Insights
             </span>
             <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">{selectedPost.title}</h1>
             <div className="flex items-center gap-6 mt-6 text-gray-500 text-sm border-b border-gray-100 pb-8">
               <div className="flex items-center gap-2">
                 <User size={16} />
                 <span>{selectedPost.author}</span>
               </div>
               <div className="flex items-center gap-2">
                 <Calendar size={16} />
                 <span>{selectedPost.date}</span>
               </div>
             </div>
           </div>

           <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-10 shadow-lg">
             <img 
               src={selectedPost.image} 
               alt={selectedPost.title} 
               className="w-full h-full object-cover"
               onError={(e) => (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73"}
             />
           </div>

           <div className="prose prose-lg prose-green max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
             {selectedPost.content}
           </div>

           <div className="mt-12 pt-8 border-t border-gray-200">
             <h3 className="font-bold text-xl mb-4">Share this article</h3>
             <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">Facebook</button>
                <button className="bg-sky-500 text-white px-4 py-2 rounded text-sm hover:bg-sky-600">Twitter</button>
                <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">WhatsApp</button>
             </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 animate-fade-in min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Model Land Insights</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert advice, market trends, and investment tips to help you make informed decisions about your real estate journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73"}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-800">
                   {post.date}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                   <div className="flex items-center text-xs text-gray-500 font-medium">
                      <User size={14} className="mr-1" /> {post.author}
                   </div>
                   <button 
                     onClick={() => setSelectedPost(post)}
                     className="text-green-700 font-bold text-sm flex items-center hover:text-green-800 transition-colors"
                   >
                     Read More <ArrowRight size={16} className="ml-1" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p>No blog posts found. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;