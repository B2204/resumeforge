import React from 'react';
import { ArrowLeft, Clock, Calendar, Sparkles } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';

interface BlogPostProps {
  postId: string;
  onBack: () => void;
  onCTA: () => void;
}

// Very simple custom markdown parser for basic formatting
const parseContent = (content: string) => {
  const lines = content.split('\\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return <br key={idx} />;
    
    if (trimmed.startsWith('## ')) {
      return <h2 key={idx} className="text-2xl font-bold font-display text-slate-900 mt-8 mb-4">{trimmed.replace('## ', '')}</h2>;
    }
    
    if (trimmed.startsWith('- ')) {
      return <li key={idx} className="text-slate-600 leading-relaxed ml-6 mb-2 list-disc">{renderInline(trimmed.replace('- ', ''))}</li>;
    }

    if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ') || trimmed.startsWith('5. ')) {
      return <div key={idx} className="text-slate-600 leading-relaxed ml-6 mb-2 flex gap-2"><span className="font-bold text-slate-800">{trimmed.substring(0, 2)}</span> <span>{renderInline(trimmed.substring(3))}</span></div>;
    }
    
    return <p key={idx} className="text-slate-600 leading-relaxed mb-4">{renderInline(trimmed)}</p>;
  });
};

const renderInline = (text: string) => {
  const parts = text.split(/(\\*\\*.*?\\*\\*|\\*.*?\\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={idx} className="italic">{part.slice(1, -1)}</em>;
    }
    return <span key={idx}>{part}</span>;
  });
};


export const BlogPost: React.FC<BlogPostProps> = ({ postId, onBack, onCTA }) => {
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Post not found.</p>
        <button onClick={onBack} className="text-indigo-600 ml-4">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <div className="max-w-3xl mx-auto px-4 pt-12 pb-8">
        <button 
          onClick={onBack}
          className="flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-8"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Blog
        </button>
        
        <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-6">
          {post.category}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 leading-tight mb-6">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-6 text-sm text-slate-500 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-200" />
            <div>
              <p className="font-bold text-slate-700">{post.author}</p>
              <p className="text-xs">{post.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Clock size={16} /> {post.readTime}
          </div>
        </div>
      </div>

      {/* Article Image */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-[60vh] object-cover rounded-3xl shadow-xl shadow-slate-200/50"
        />
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 pb-20">
        <div className="prose prose-lg max-w-none">
          {parseContent(post.content)}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 mb-6">
            <Sparkles size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-6">
            Ready to upgrade your career?
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals using MyResume Assistant to build ATS-friendly resumes, generate targeted cover letters, and land more interviews.
          </p>
          <button 
            onClick={onCTA}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl shadow-indigo-600/30 transition-all hover:-translate-y-1"
          >
            Build Your Resume for Free
          </button>
        </div>
      </div>
    </div>
  );
};
