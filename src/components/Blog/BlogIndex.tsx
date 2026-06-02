import React from 'react';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';

interface BlogIndexProps {
  onOpenPost: (id: string) => void;
}

export const BlogIndex: React.FC<BlogIndexProps> = ({ onOpenPost }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight mb-6">
            Career & Resume Insights
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto font-medium">
            Expert advice to help you beat the ATS, optimize your resume, and land your dream job faster.
          </p>
        </div>
      </div>

      {/* Blog List Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              onClick={() => onOpenPost(post.id)}
              className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 cursor-pointer group hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {post.category}
                </div>
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {post.readTime}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                      <BookOpen size={14} className="text-slate-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{post.author}</span>
                  </div>
                  <div className="flex items-center text-indigo-600 text-sm font-bold group-hover:gap-2 transition-all">
                    Read <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
