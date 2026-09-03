import React from 'react';

export default function QuestionPalette({ 
  totalQuestions, 
  currentQuestionIndex, 
  onSelectQuestion,
  answers,
  markedForReview
}) {
  // Determine the status of a question
  const getStatusClass = (index) => {
    const isCurrent = index === currentQuestionIndex;
    const isAnswered = answers[index] !== undefined && answers[index] !== null;
    const isMarked = markedForReview[index];

    let baseClass = "w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded text-sm font-medium transition-colors cursor-pointer border shrink-0 ";
    
    if (isCurrent) {
      baseClass += "border-gold ring-2 ring-gold/20 ";
    } else {
      baseClass += "border-border-color ";
    }

    if (isMarked) {
      return baseClass + "bg-amber-100 text-amber-700 border-amber-300";
    }
    if (isAnswered) {
      return baseClass + "bg-success/20 text-success border-success/50";
    }
    
    return baseClass + "bg-white text-text-secondary hover:bg-bg-light";
  };

  return (
    <div className="bg-white border border-border-color rounded-xl p-4 md:p-6 h-full flex flex-col">
      <h3 className="font-bold text-navy-light mb-4">Answer Sheet</h3>
      
      {/* Legend */}
      <div className="space-y-2 mb-6 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success/20 border border-success/50"></div>
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white border border-border-color"></div>
          <span>Not Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-100 border border-amber-300"></div>
          <span>Marked for Review</span>
        </div>
      </div>

      {/* Grid */}
      <div className="flex flex-wrap gap-2 overflow-y-auto pr-2 pb-4 justify-start">
        {Array.from({ length: totalQuestions }).map((_, idx) => (
          <button
            key={idx}
            className={getStatusClass(idx)}
            onClick={() => onSelectQuestion(idx)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
