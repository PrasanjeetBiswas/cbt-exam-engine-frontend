import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Info } from 'lucide-react';
import { tests } from '../data/tests';
import { questions } from '../data/questions';
import Button from '../components/common/Button';

export default function AnswerReview() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  
  const test = tests.find(t => t.id === testId) || tests[0];
  const testQuestions = questions.filter(q => q.testId === test.id);

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'correct' | 'incorrect' | 'skipped'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const savedResult = localStorage.getItem(`result_${testId}`);
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      navigate('/');
    }
  }, [testId, navigate]);

  if (!result) return <div className="p-8 text-center">Loading...</div>;

  // Filter questions based on active tab
  const getFilteredIndices = () => {
    const indices = [];
    testQuestions.forEach((q, idx) => {
      const userAnswer = result.answers[idx];
      const isAnswered = userAnswer !== undefined && userAnswer !== null;
      const isCorrect = isAnswered && userAnswer === q.correctOption;
      
      if (activeTab === 'all') indices.push(idx);
      else if (activeTab === 'correct' && isCorrect) indices.push(idx);
      else if (activeTab === 'incorrect' && isAnswered && !isCorrect) indices.push(idx);
      else if (activeTab === 'skipped' && !isAnswered) indices.push(idx);
    });
    return indices;
  };

  const filteredIndices = getFilteredIndices();
  const activeQuestionIdx = filteredIndices[currentQuestionIndex] !== undefined ? filteredIndices[currentQuestionIndex] : 0;
  const currentQuestion = testQuestions[activeQuestionIdx];
  const userAnswer = result.answers[activeQuestionIdx];
  const isAnswered = userAnswer !== undefined && userAnswer !== null;
  const isCorrect = isAnswered && userAnswer === currentQuestion.correctOption;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentQuestionIndex(0); // reset index when changing tabs
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-bg-light min-h-screen pb-16">
      
      {/* Header */}
      <header className="bg-navy border-b border-navy-light h-16 flex items-center px-4 md:px-8 shrink-0">
        <div className="container mx-auto flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <Link to={`/result/${testId}`} className="text-gray-400 hover:text-white transition-colors">
              <ChevronLeft size={24} />
            </Link>
            <span className="font-bold hidden sm:inline">Answer Review</span>
          </div>
          <span className="text-sm text-gold font-medium">{test.title}</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-lg border border-border-color shadow-sm w-fit">
          <button 
            onClick={() => handleTabChange('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-navy text-white' : 'text-text-secondary hover:bg-bg-light'}`}
          >
            All ({result.total})
          </button>
          <button 
            onClick={() => handleTabChange('correct')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'correct' ? 'bg-success text-white' : 'text-text-secondary hover:bg-bg-light'}`}
          >
            Correct ({result.correct})
          </button>
          <button 
            onClick={() => handleTabChange('incorrect')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'incorrect' ? 'bg-error text-white' : 'text-text-secondary hover:bg-bg-light'}`}
          >
            Incorrect ({result.incorrect})
          </button>
          <button 
            onClick={() => handleTabChange('skipped')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'skipped' ? 'bg-amber-100 text-amber-700' : 'text-text-secondary hover:bg-bg-light'}`}
          >
            Skipped ({result.skipped})
          </button>
        </div>

        {filteredIndices.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-border-color text-text-secondary">
            No questions found in this category.
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Palette (Optional for quick navigation in review) */}
            <div className="hidden lg:block w-24 shrink-0 space-y-2 max-h-[70vh] overflow-y-auto pr-2">
              {filteredIndices.map((idx, arrayIndex) => {
                const uAns = result.answers[idx];
                const isAns = uAns !== undefined && uAns !== null;
                const isCorr = isAns && uAns === testQuestions[idx].correctOption;
                
                let boxClass = "w-full aspect-square flex items-center justify-center rounded font-medium border text-sm transition-colors ";
                
                if (currentQuestionIndex === arrayIndex) boxClass += "ring-2 ring-navy ring-offset-2 ";
                
                if (!isAns) boxClass += "bg-white border-border-color text-text-secondary";
                else if (isCorr) boxClass += "bg-success/10 border-success/30 text-success";
                else boxClass += "bg-error/10 border-error/30 text-error";

                return (
                  <button 
                    key={idx} 
                    className={boxClass}
                    onClick={() => setCurrentQuestionIndex(arrayIndex)}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Main Review Card */}
            <div className="flex-1 bg-white rounded-xl border border-border-color p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-navy-light text-lg">Question {activeQuestionIdx + 1}</h3>
                <span className="text-sm text-text-secondary font-mono">{test.code}</span>
              </div>
              
              <p className="text-lg text-navy-light mb-8 font-medium">
                {currentQuestion.question}
              </p>

              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, idx) => {
                  const isThisUserAnswer = userAnswer === idx;
                  const isThisCorrectAnswer = currentQuestion.correctOption === idx;
                  
                  let optClass = "w-full text-left p-4 rounded-lg border flex items-center gap-4 transition-colors ";
                  let icon = null;

                  if (isThisCorrectAnswer) {
                    optClass += "border-success bg-success/5 text-navy-light font-medium";
                    icon = <CheckCircle2 size={20} className="text-success ml-auto" />;
                  } else if (isThisUserAnswer && !isThisCorrectAnswer) {
                    optClass += "border-error bg-error/5 text-navy-light";
                    icon = <XCircle size={20} className="text-error ml-auto" />;
                  } else {
                    optClass += "border-border-color text-text-secondary";
                  }

                  return (
                    <div key={idx} className={optClass}>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 font-medium ${
                        isThisCorrectAnswer ? 'border-success text-success bg-white' : 
                        (isThisUserAnswer ? 'border-error text-error bg-white' : 'border-border-color')
                      }`}>
                        {optionLabels[idx]}
                      </div>
                      <span>{option}</span>
                      {icon}
                    </div>
                  );
                })}
              </div>

              {/* Status & Explanation Box */}
              <div className="bg-bg-light rounded-xl p-6 border border-border-color">
                <div className="flex flex-col sm:flex-row gap-6 mb-6 pb-6 border-b border-border-color">
                  <div className="flex-1">
                    <span className="text-xs text-text-secondary uppercase font-bold tracking-wider block mb-1">Your Answer</span>
                    {isAnswered ? (
                       <div className={`flex items-center gap-2 font-medium ${isCorrect ? 'text-success' : 'text-error'}`}>
                         {isCorrect ? <CheckCircle2 size={16}/> : <XCircle size={16}/>}
                         Option {optionLabels[userAnswer]}
                       </div>
                    ) : (
                      <span className="text-text-secondary font-medium">Skipped</span>
                    )}
                  </div>
                  <div className="w-px bg-border-color hidden sm:block"></div>
                  <div className="flex-1">
                    <span className="text-xs text-text-secondary uppercase font-bold tracking-wider block mb-1">Correct Answer</span>
                    <div className="flex items-center gap-2 font-medium text-success">
                      <CheckCircle2 size={16}/>
                      Option {optionLabels[currentQuestion.correctOption]}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-navy-light font-bold mb-2">
                    <Info size={16} className="text-gold" /> Explanation
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-border-color">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestionIndex(curr => curr - 1)}
                  disabled={currentQuestionIndex === 0}
                  className="flex gap-1"
                >
                  <ChevronLeft size={16} /> Previous
                </Button>
                
                <span className="text-sm text-text-secondary font-medium">
                  {currentQuestionIndex + 1} of {filteredIndices.length}
                </span>

                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestionIndex(curr => curr + 1)}
                  disabled={currentQuestionIndex === filteredIndices.length - 1}
                  className="flex gap-1"
                >
                  Next <ChevronRight size={16} />
                </Button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
