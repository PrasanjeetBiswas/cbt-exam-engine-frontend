import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Trophy, CheckCircle2, XCircle, MinusCircle, ChevronLeft, RotateCcw, Eye, List } from 'lucide-react';
import { tests } from '../data/tests';
import Button from '../components/common/Button';

export default function Result() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  
  const test = tests.find(t => t.id === testId) || tests[0];

  useEffect(() => {
    // In a real app, fetch from backend. Here we use localStorage.
    const savedResult = localStorage.getItem(`result_${testId}`);
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      // If no result found, redirect back
      navigate('/');
    }
  }, [testId, navigate]);

  if (!result) return <div className="p-8 text-center">Loading results...</div>;

  const isPass = result.status === 'PASS';

  return (
    <div className="bg-navy min-h-screen text-white pb-16">
      
      {/* Header */}
      <header className="border-b border-navy-light h-16 flex items-center px-4 md:px-8">
        <Link to="/" className="text-text-secondary hover:text-white flex items-center gap-2">
          <ChevronLeft size={20} /> Back to Dashboard
        </Link>
      </header>

      <div className="container mx-auto px-4 pt-8 md:pt-12 max-w-4xl">
        
        {/* Top Result Banner */}
        <div className="text-center mb-10">
          <h4 className="text-gold text-sm font-bold tracking-widest uppercase mb-4">Result · Test {test.id.split('-')[1]}</h4>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{test.title}</h1>
          <div className="text-navy-light bg-white/10 px-3 py-1 rounded font-mono text-sm inline-block text-gray-300">
            {test.code}
          </div>
        </div>

        {/* Main Score Card */}
        <div className="bg-navy-light border border-white/10 rounded-2xl p-8 mb-8 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative glows */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 blur-3xl rounded-full opacity-20 pointer-events-none ${isPass ? 'bg-success' : 'bg-error'}`}></div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10">
            
            <div className="flex flex-col items-center">
              <Trophy size={64} className="text-gold mb-4" />
              <div className="text-5xl font-bold mb-2">
                <span className="text-white">{result.correct}</span>
                <span className="text-gray-500 text-3xl"> / {result.total}</span>
              </div>
              <div className="text-gray-400">Score</div>
            </div>

            <div className="hidden md:block w-px h-32 bg-white/10"></div>

            <div className="flex flex-col items-center">
              <div className="text-6xl font-bold text-success mb-2">{result.score}%</div>
              <div className={`text-lg font-bold px-6 py-1 rounded-full ${isPass ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                {result.status}
              </div>
            </div>

          </div>
          
          <p className="text-gray-400 mt-8">
            {isPass 
              ? "Great Job! You have passed the test." 
              : "Keep practicing! You didn't meet the passing criteria this time."}
          </p>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-navy-light border border-white/5 rounded-xl p-4 text-center flex flex-col items-center justify-center">
            <span className="text-gray-400 text-sm mb-1">Total Questions</span>
            <span className="text-2xl font-bold text-white">{result.total}</span>
          </div>
          <div className="bg-navy-light border border-white/5 rounded-xl p-4 text-center flex flex-col items-center justify-center">
            <span className="text-gray-400 text-sm mb-1">Attempted</span>
            <span className="text-2xl font-bold text-white">{result.attempted}</span>
          </div>
          <div className="bg-navy-light border border-white/5 rounded-xl p-4 text-center flex flex-col items-center justify-center">
            <span className="text-gray-400 text-sm mb-1 flex items-center gap-1"><CheckCircle2 size={14} className="text-success"/> Correct</span>
            <span className="text-2xl font-bold text-success">{result.correct}</span>
          </div>
          <div className="bg-navy-light border border-white/5 rounded-xl p-4 text-center flex flex-col items-center justify-center">
            <span className="text-gray-400 text-sm mb-1 flex items-center gap-1"><XCircle size={14} className="text-error"/> Incorrect</span>
            <span className="text-2xl font-bold text-error">{result.incorrect}</span>
          </div>
          <div className="bg-navy-light border border-white/5 rounded-xl p-4 text-center flex flex-col items-center justify-center col-span-2 md:col-span-1">
            <span className="text-gray-400 text-sm mb-1 flex items-center gap-1"><MinusCircle size={14} className="text-warning"/> Skipped</span>
            <span className="text-2xl font-bold text-warning">{result.skipped}</span>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
           <div className="bg-navy-light/50 border border-white/5 rounded-lg p-4 flex flex-col items-center">
              <span className="text-gray-500 text-xs uppercase mb-1">Accuracy</span>
              <span className="text-lg font-medium text-white">
                {result.attempted > 0 ? Math.round((result.correct / result.attempted) * 100) : 0}%
              </span>
           </div>
           <div className="bg-navy-light/50 border border-white/5 rounded-lg p-4 flex flex-col items-center">
              <span className="text-gray-500 text-xs uppercase mb-1">Passing Marks</span>
              <span className="text-lg font-medium text-white">{result.passingPercentage}%</span>
           </div>
           <div className="bg-navy-light/50 border border-white/5 rounded-lg p-4 flex flex-col items-center">
              <span className="text-gray-500 text-xs uppercase mb-1">Your Score</span>
              <span className="text-lg font-medium text-white">{result.score}%</span>
           </div>
           <div className="bg-navy-light/50 border border-white/5 rounded-lg p-4 flex flex-col items-center">
              <span className="text-gray-500 text-xs uppercase mb-1">Time Taken</span>
              <span className="text-lg font-medium text-white">{result.timeTaken}</span>
           </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 flex justify-center gap-2"
            onClick={() => {
              localStorage.removeItem(`result_${testId}`);
              navigate(`/test/${testId}`);
            }}
          >
            <RotateCcw size={18} /> Retake Test
          </Button>
          
          <Button 
            variant="primary" 
            className="w-full sm:w-auto flex justify-center gap-2 shadow-lg shadow-gold/10"
            onClick={() => navigate(`/result/${testId}/review`)}
          >
            <Eye size={18} /> View Answers
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 flex justify-center gap-2"
            onClick={() => navigate('/')}
          >
            <List size={18} /> All Tests
          </Button>
        </div>

      </div>
    </div>
  );
}
