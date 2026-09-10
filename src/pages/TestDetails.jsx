import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Target, Plus, ChevronRight } from 'lucide-react';
import { tests } from '../data/tests';
import Button from '../components/common/Button';

export default function TestDetails() {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  // Find the specific test, or default to the first one for demo purposes
  const test = tests.find(t => t.id === testId) || tests[0];

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Breadcrumb */}
      <div className="text-sm text-text-secondary flex flex-wrap items-center gap-2 mb-8">
        <Link to="/" className="hover:text-navy-light">UGC NET</Link>
        <ChevronRight size={14} />
        <Link to="/" className="hover:text-navy-light">{test.paper}</Link>
        <ChevronRight size={14} />
        <Link to="/" className="hover:text-navy-light">{test.subject}</Link>
        <ChevronRight size={14} />
        <span className="text-navy-light font-medium">{test.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left/Main Column - Test Details & Instructions */}
        <div className="w-full lg:flex-1 bg-white border border-border-color rounded-xl p-6 md:p-8">
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-navy-light mb-2">{test.title}</h1>
              <span className="text-sm text-gold font-mono font-medium px-2 py-1 bg-gold/10 rounded">{test.code}</span>
            </div>
          </div>

          <p className="text-text-secondary text-sm md:text-base mb-8">
            This is a full-length mock test based on the latest {test.category} {test.paper} pattern.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="flex flex-col items-center p-4 bg-bg-light rounded-lg border border-border-color">
              <BookOpen size={24} className="text-gold mb-2" />
              <span className="text-xl font-bold text-navy-light">{test.questions}</span>
              <span className="text-xs text-text-secondary">Total Questions</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-bg-light rounded-lg border border-border-color">
              <Clock size={24} className="text-gold mb-2" />
              <span className="text-xl font-bold text-navy-light">{test.durationMinutes}</span>
              <span className="text-xs text-text-secondary">Total Minutes</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-bg-light rounded-lg border border-border-color">
              <Target size={24} className="text-gold mb-2" />
              <span className="text-xl font-bold text-navy-light">{test.passingPercentage}%</span>
              <span className="text-xs text-text-secondary">Passing Marks</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-bg-light rounded-lg border border-border-color">
              <Plus size={24} className="text-gold mb-2" />
              <span className="text-xl font-bold text-navy-light">+1</span>
              <span className="text-xs text-text-secondary text-center">Marking Scheme<br/><span className="text-[10px]">+1 correct answer<br/>No negative marks</span></span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Instructions */}
            <div>
              <h2 className="text-lg font-bold text-navy-light mb-4">Instructions</h2>
              <ol className="list-decimal pl-5 space-y-3 text-sm text-text-secondary marker:text-navy-light marker:font-bold">
                <li>Read each question carefully before answering.</li>
                <li>You can mark a question for review and come back later.</li>
                <li>Once you submit the test, you will not be able to make any changes.</li>
                <li>Make sure you have a stable internet connection.</li>
                <li>Do not refresh or close the browser while attempting the test.</li>
              </ol>
            </div>

            {/* About Test */}
            <div>
              <h2 className="text-lg font-bold text-navy-light mb-4">About Test</h2>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0"></div>
                  All questions are compulsory.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0"></div>
                  Each question carries 1 mark.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0"></div>
                  There is no negative marking.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0"></div>
                  You can navigate between questions.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0"></div>
                  You can review and change answers.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0"></div>
                  Submit the test before time expires.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="bg-navy rounded-xl p-6 md:p-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="text-center md:text-left relative z-10 w-full flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-bold text-white mb-2">Ready to begin?</h3>
          <p className="text-gray-400 text-sm mb-0">Once you start, the timer will begin automatically.</p>
        </div>
        
        <div className="shrink-0 relative z-10 w-full md:w-auto">
          <Button 
            variant="primary" 
            className="w-full md:w-auto text-lg py-3 px-8 shadow-lg shadow-gold/20 flex gap-2 justify-center"
            onClick={() => navigate(`/test/${test.id}`)}
          >
            Start Test <ChevronRight />
          </Button>
        </div>
      </div>

    </div>
  );
}
