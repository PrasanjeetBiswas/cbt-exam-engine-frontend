import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Target, ChevronRight, Bookmark } from 'lucide-react';
import Button from '../common/Button';

export default function TestCard({ test }) {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  return (
    <div className="bg-white rounded-lg border border-border-color p-4 md:p-5 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 justify-between">
      
      {/* Left section - Test info */}
      <div className="flex gap-4 items-start">
        <div className="hidden sm:flex flex-col items-center justify-center bg-gold/10 text-gold font-bold w-12 h-12 rounded-md shrink-0">
          <span className="text-xs font-normal">TEST</span>
          <span>{test.id.split('-')[1]}</span>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-navy-light text-lg">{test.title}</h3>
            <span className="bg-bg-light border border-border-color text-xs px-2 py-0.5 rounded font-mono text-text-secondary">
              {test.code}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-secondary mb-3">
            <div className="flex items-center gap-1">
              <BookOpen size={14} />
              <span>{test.questions} Questions</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{test.durationMinutes} Min</span>
            </div>
            <div className="flex items-center gap-1">
              <Target size={14} />
              <span>Pass {test.passingPercentage}%</span>
            </div>
          </div>
          
          <div className="text-xs font-medium px-2 py-1 bg-bg-light inline-block rounded text-text-secondary">
            Attempts: {test.attempts}
          </div>
        </div>
      </div>
      
      {/* Right section - Actions */}
      <div className="flex sm:flex-col justify-between items-center sm:items-end gap-4 mt-2 sm:mt-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-border-color">
        <button 
          className={`transition-colors ${isBookmarked ? 'text-gold fill-gold' : 'text-text-secondary hover:text-gold'}`}
          onClick={() => setIsBookmarked(!isBookmarked)}
          aria-label="Bookmark Test"
        >
          <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
        <Button 
          variant="dark" 
          className="w-full sm:w-auto text-sm py-1.5 flex gap-1"
          onClick={() => navigate(`/test/${test.id}/instructions`)}
        >
          Take Test <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
