import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GraduationCap, ChevronLeft, ChevronRight, AlertCircle, X } from 'lucide-react';
import { tests } from '../data/tests';
import { questions } from '../data/questions';
import useTimer from '../hooks/useTimer';
import Button from '../components/common/Button';
import QuestionPalette from '../components/exam/QuestionPalette';

export default function MockTest() {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const test = tests.find(t => t.id === testId) || tests[0];
  const testQuestions = questions.filter(q => q.testId === test.id);
  
  // States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);

  // Timer
  const handleTimeUp = () => {
    // Auto submit logic will go here
    submitTest();
  };
  const { formattedTime, isWarning, start } = useTimer(test.durationMinutes, handleTimeUp);

  useEffect(() => {
    start();
    // In a real app, load saved state from localStorage here
  }, []);

  const currentQuestion = testQuestions[currentIndex];
  const optionLabels = ['A', 'B', 'C', 'D'];

  // Handlers
  const handleOptionSelect = (optionIndex) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const handleClearResponse = () => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentIndex];
      return newAnswers;
    });
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => ({ ...prev, [currentIndex]: !prev[currentIndex] }));
  };

  const goToNext = () => {
    if (currentIndex < testQuestions.length - 1) setCurrentIndex(curr => curr + 1);
  };

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex(curr => curr - 1);
  };

  const submitTest = () => {
    // Calculate results (In a real app, this happens on backend)
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    
    testQuestions.forEach((q, idx) => {
      if (answers[idx] === undefined || answers[idx] === null) {
        skipped++;
      } else if (answers[idx] === q.correctOption) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const attempted = correct + incorrect;
    const score = Math.round((correct / testQuestions.length) * 100);
    const passed = score >= test.passingPercentage;

    // Save result to local storage for demo purposes
    const result = {
      testId: test.id,
      total: testQuestions.length,
      attempted,
      correct,
      incorrect,
      skipped,
      score,
      passingPercentage: test.passingPercentage,
      status: passed ? "PASS" : "FAIL",
      timeTaken: "N/A (Demo)", // Ideally calculate from timer
      answers, // user answers
    };
    
    localStorage.setItem(`result_${test.id}`, JSON.stringify(result));
    
    // Navigate to result
    navigate(`/result/${test.id}`);
  };

  // Stats for modal
  const attemptedCount = Object.keys(answers).length;
  const markedCount = Object.keys(markedForReview).filter(k => markedForReview[k]).length;

  return (
    <div className="flex flex-col h-screen bg-bg-light overflow-hidden">
      
      {/* Exam Header */}
      <header className="bg-navy border-b border-navy-light text-white shrink-0">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gold">
              <GraduationCap size={24} />
              <span className="font-bold hidden sm:inline">GS NET</span>
            </div>
            <div className="w-px h-6 bg-navy-light hidden sm:block"></div>
            <span className="text-sm md:text-base font-medium truncate max-w-[150px] sm:max-w-xs">{test.title}</span>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className={`flex flex-col items-end ${isWarning ? 'text-error animate-pulse' : 'text-white'}`}>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Time Left</span>
              <span className="font-mono text-lg font-bold leading-none">{formattedTime}</span>
            </div>
            <Button variant="primary" onClick={() => setShowSubmitModal(true)}>
              Submit Test
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden container mx-auto">
        
        {/* Left/Main Column - Question Area */}
        <div className="flex-1 flex flex-col min-w-0 p-4 md:p-6 overflow-y-auto relative">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-navy-light">Question {currentIndex + 1} of {testQuestions.length}</h2>
            <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded border-border-color text-amber-500 focus:ring-amber-500" 
                checked={!!markedForReview[currentIndex]}
                onChange={toggleMarkForReview}
              />
              Mark for Review
            </label>
          </div>

          <div className="bg-white rounded-xl border border-border-color p-6 md:p-8 mb-6 shadow-sm flex-1">
            <p className="text-lg text-navy-light mb-8 font-medium">
              {currentQuestion?.question}
            </p>

            <div className="space-y-3">
              {currentQuestion?.options.map((option, idx) => {
                const isSelected = answers[currentIndex] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors flex items-center gap-4 ${
                      isSelected 
                        ? 'border-success bg-success/5' 
                        : 'border-border-color hover:border-navy/30 hover:bg-bg-light'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 font-medium ${
                      isSelected ? 'border-success text-success bg-white' : 'border-border-color text-text-secondary'
                    }`}>
                      {optionLabels[idx]}
                    </div>
                    <span className={isSelected ? 'text-navy-light font-medium' : 'text-text-secondary'}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between gap-4 mt-auto">
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClearResponse} className="text-xs md:text-sm">
                Clear Response
              </Button>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                onClick={goToPrev} 
                disabled={currentIndex === 0}
                className="flex gap-1"
              >
                <ChevronLeft size={16} /> <span className="hidden sm:inline">Previous</span>
              </Button>
              <Button 
                variant="primary" 
                onClick={goToNext}
                disabled={currentIndex === testQuestions.length - 1}
                className="flex gap-1"
              >
                <span className="hidden sm:inline">Next</span> <ChevronRight size={16} />
              </Button>
            </div>
          </div>
          
          {/* Mobile Palette Toggle */}
          <div className="mt-4 lg:hidden">
             <Button variant="outline" className="w-full" onClick={() => setIsMobilePaletteOpen(true)}>
                View Question Palette
             </Button>
          </div>
        </div>

        {/* Right Column - Desktop Palette */}
        <div className="hidden lg:block w-80 shrink-0 border-l border-border-color p-4 md:p-6 bg-white overflow-hidden">
          <QuestionPalette 
            totalQuestions={testQuestions.length}
            currentQuestionIndex={currentIndex}
            onSelectQuestion={setCurrentIndex}
            answers={answers}
            markedForReview={markedForReview}
          />
        </div>
      </div>

      {/* Mobile Palette Drawer */}
      {isMobilePaletteOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div className="absolute inset-0 bg-navy/50" onClick={() => setIsMobilePaletteOpen(false)}></div>
          <div className="w-4/5 max-w-sm bg-white h-full relative flex flex-col">
            <div className="p-4 border-b border-border-color flex justify-between items-center">
              <h3 className="font-bold text-navy-light">Question Palette</h3>
              <button onClick={() => setIsMobilePaletteOpen(false)}><X size={20}/></button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <QuestionPalette 
                totalQuestions={testQuestions.length}
                currentQuestionIndex={currentIndex}
                onSelectQuestion={(idx) => {
                  setCurrentIndex(idx);
                  setIsMobilePaletteOpen(false);
                }}
                answers={answers}
                markedForReview={markedForReview}
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" onClick={() => setShowSubmitModal(false)}></div>
          
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative z-10 overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-warning/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} />
              </div>
              <h2 className="text-2xl font-bold text-navy-light mb-2">Submit Test?</h2>
              <p className="text-text-secondary mb-6">You are about to submit the test. You will not be able to make changes after submission.</p>
              
              <div className="bg-bg-light rounded-lg p-4 space-y-3 mb-6 text-left">
                <div className="flex justify-between font-medium">
                  <span className="text-text-secondary">Total Questions</span>
                  <span className="text-navy-light">{testQuestions.length}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-text-secondary">Attempted</span>
                  <span className="text-success">{attemptedCount}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-text-secondary">Skipped</span>
                  <span className="text-error">{testQuestions.length - attemptedCount}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-text-secondary">Marked for Review</span>
                  <span className="text-amber-500">{markedCount}</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowSubmitModal(false)}>
                  Continue Test
                </Button>
                <Button variant="primary" className="flex-1" onClick={submitTest}>
                  Submit Test
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
