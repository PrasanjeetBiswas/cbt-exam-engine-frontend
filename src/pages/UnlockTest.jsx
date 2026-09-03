import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, BookOpen, Target, ChevronRight, CheckCircle2, ShieldCheck, CreditCard, Smartphone, Building, Wallet } from 'lucide-react';
import { tests } from '../data/tests';
import Button from '../components/common/Button';

export default function UnlockTest() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const test = tests.find(t => t.id === testId) || tests[0];

  const [paymentState, setPaymentState] = useState('idle'); // 'idle' | 'processing' | 'success'

  const handleDemoPayment = () => {
    setPaymentState('processing');
    
    // Simulate API call and payment processing
    setTimeout(() => {
      setPaymentState('success');
      // In a real app, we would update user's unlocked tests in DB/context here
    }, 2000);
  };

  if (paymentState === 'success') {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white border border-border-color rounded-xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-navy-light mb-2">Demo Payment Successful!</h2>
          <p className="text-text-secondary mb-8">
            You have successfully unlocked <strong>{test.title}</strong>. Good luck with your preparation!
          </p>
          <Button 
            variant="primary" 
            className="w-full py-3 text-lg flex justify-center gap-2"
            onClick={() => navigate(`/test/${test.id}`)}
          >
            Start Test <ChevronRight />
          </Button>
        </div>
      </div>
    );
  }

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
        <span className="text-navy-light font-medium">Unlock Test</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column - About to Unlock */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="bg-white border border-border-color rounded-xl p-6 md:p-8">
            <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-6">About to Unlock</h2>
            
            <h1 className="text-2xl font-bold text-navy-light mb-2">{test.title}</h1>
            <span className="text-sm text-navy-light font-mono font-medium px-2 py-1 bg-navy/5 rounded mb-8 inline-block">{test.code}</span>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-navy-light font-medium pb-4 border-b border-border-color/60">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <BookOpen size={20} />
                </div>
                {test.questions} Questions
              </div>
              <div className="flex items-center gap-3 text-navy-light font-medium pb-4 border-b border-border-color/60">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                {test.durationMinutes} Minutes
              </div>
              <div className="flex items-center gap-3 text-navy-light font-medium pb-4 border-b border-border-color/60">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Target size={20} />
                </div>
                Pass {test.passingPercentage}%
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Payment Summary */}
        <div className="w-full lg:w-1/2 space-y-6">
          
          <div className="bg-white border border-border-color rounded-xl p-6 md:p-8">
            <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-6">Price Details</h2>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-text-secondary">Test Price</span>
              <span className="font-medium text-navy-light">₹{test.price}</span>
            </div>
            
            <div className="flex justify-between items-center py-4 border-t border-b border-border-color mb-6">
              <span className="font-bold text-navy-light text-lg">Total Amount</span>
              <span className="font-bold text-navy-light text-lg">₹{test.price}</span>
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-8 text-sm text-amber-700">
              <strong>Notice:</strong> This is a demo payment. No real transaction will be processed.
            </div>

            <h3 className="font-bold text-navy-light mb-4">Choose Payment Method (Demo)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <button className="flex flex-col items-center justify-center gap-2 p-3 border border-gold bg-gold/5 rounded-lg text-navy-light hover:bg-gold/10 transition-colors">
                <Smartphone size={24} className="text-gold" />
                <span className="text-xs font-medium">UPI</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 border border-border-color bg-white rounded-lg text-text-secondary hover:border-gold hover:text-navy-light transition-colors">
                <CreditCard size={24} />
                <span className="text-xs font-medium">Card</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 border border-border-color bg-white rounded-lg text-text-secondary hover:border-gold hover:text-navy-light transition-colors">
                <Building size={24} />
                <span className="text-xs font-medium">Net Banking</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 border border-border-color bg-white rounded-lg text-text-secondary hover:border-gold hover:text-navy-light transition-colors">
                <Wallet size={24} />
                <span className="text-xs font-medium">Wallet</span>
              </button>
            </div>

            <div className="bg-bg-light rounded-lg p-4 mb-6 flex gap-3">
              <ShieldCheck size={24} className="text-success shrink-0" />
              <div>
                <h4 className="font-bold text-navy-light text-sm">Secure & Safe Checkout (Demo)</h4>
                <p className="text-xs text-text-secondary mt-1">Payment is simulated for UI demonstration purposes only.</p>
              </div>
            </div>

            <Button 
              variant="primary" 
              className="w-full py-4 text-lg font-bold shadow-lg shadow-gold/20 flex justify-center items-center gap-2"
              onClick={handleDemoPayment}
              disabled={paymentState === 'processing'}
            >
              {paymentState === 'processing' ? (
                <>
                  <div className="w-5 h-5 border-2 border-navy-light/30 border-t-navy-light rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>Pay ₹{test.price} & Unlock <ChevronRight /></>
              )}
            </Button>
            
          </div>
        </div>

      </div>
    </div>
  );
}
