import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Filter, BookOpen, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import { tests, categories } from '../data/tests';
import TestCard from '../components/tests/TestCard';
import Button from '../components/common/Button';

export default function AllTests() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter States
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedTypes, setSelectedTypes] = useState(['Full Length Test']);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  
  // Sort & Pagination States
  const [sortOption, setSortOption] = useState('Oldest First');
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 4;

  // Filter Handlers
  const toggleType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const toggleDifficulty = (diff) => {
    setSelectedDifficulties(prev => 
      prev.includes(diff) ? prev.filter(d => d !== diff) : [...prev, diff]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedDifficulties([]);
    setSelectedSubject('All');
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Derived Data (Filtering & Sorting)
  const filteredTests = useMemo(() => {
    let result = tests;

    // Search filter
    if (searchTerm) {
      result = result.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Subject Filter
    if (selectedSubject !== 'All') {
      result = result.filter(t => t.subject === selectedSubject || t.category === selectedSubject);
    }

    // Type Filter
    if (selectedTypes.length > 0) {
      result = result.filter(t => selectedTypes.includes(t.type));
    }

    // Difficulty Filter
    if (selectedDifficulties.length > 0) {
      result = result.filter(t => selectedDifficulties.includes(t.difficulty));
    }

    // Sorting
    if (sortOption === 'Newest First') {
      result = [...result].sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortOption === 'Oldest First') {
      result = [...result].sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortOption === 'Duration (Low to High)') {
      result = [...result].sort((a, b) => a.durationMinutes - b.durationMinutes);
    }

    return result;
  }, [tests, searchTerm, selectedSubject, selectedTypes, selectedDifficulties, sortOption]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredTests.length / testsPerPage) || 1;
  const startIndex = (currentPage - 1) * testsPerPage;
  const currentTests = filteredTests.slice(startIndex, startIndex + testsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  return (
    <div>
      {/* 1. Hero Section */}
      <div className="bg-navy-light text-white py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="text-gold text-sm font-bold tracking-widest mb-2 uppercase">Welcome to GS NET</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">All Tests / Test Series</h1>
            <p className="text-gray-300 mb-6 max-w-xl text-sm md:text-base leading-relaxed">
              Full-length mock tests designed as per the latest UGC NET pattern to help you crack the exam.
            </p>
            
            <div className="flex gap-6 text-sm font-medium">
              <div className="flex flex-col">
                <span className="text-gold text-xl md:text-2xl font-bold">50+</span>
                <span className="text-gray-400">Total Tests</span>
              </div>
              <div className="w-px bg-navy"></div>
              <div className="flex flex-col">
                <span className="text-gold text-xl md:text-2xl font-bold">10+</span>
                <span className="text-gray-400">Subjects</span>
              </div>
              <div className="w-px bg-navy"></div>
              <div className="flex flex-col">
                <span className="text-gold text-xl md:text-2xl font-bold">100K+</span>
                <span className="text-gray-400">Students</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full flex justify-end">
            <div className="bg-navy border border-white/10 p-6 md:p-8 rounded-xl max-w-sm relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-white/5">
                <BookOpen size={150} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-2 relative z-10">Your Success,<br/>Our Focus.</h2>
              <p className="text-gray-400 text-sm mb-6 relative z-10">Quality tests. Better preparation. A stronger you.</p>
              <Button variant="primary" className="w-full relative z-10">Start Practicing</Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Layout */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-bold text-navy-light mb-3">Categories</h3>
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => setSelectedSubject('All')}
                  className={`w-full text-left px-3 py-2 rounded text-sm ${selectedSubject === 'All' ? 'bg-gold/10 text-navy-light font-semibold' : 'text-text-secondary hover:bg-bg-light'}`}
                >
                  All Tests
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSelectedSubject('UGC NET')}
                  className={`w-full text-left px-3 py-2 rounded text-sm ${selectedSubject === 'UGC NET' ? 'bg-gold/10 text-navy-light font-semibold' : 'text-text-secondary hover:bg-bg-light'}`}
                >
                  UGC NET
                </button>
                <ul className="pl-4 mt-1 border-l-2 border-bg-light ml-3 space-y-1">
                  <li>
                    <span className="block px-3 py-1.5 text-sm text-gold font-medium">Paper 1</span>
                    <ul className="pl-4 mt-1 border-l-2 border-gold/30 ml-3 space-y-1">
                      <li>
                        <button 
                          onClick={() => setSelectedSubject('Teaching Aptitude')}
                          className={`w-full text-left px-3 py-1.5 rounded text-sm ${selectedSubject === 'Teaching Aptitude' ? 'text-navy-light font-medium bg-white shadow-sm border border-border-color' : 'text-text-secondary hover:text-navy-light'}`}
                        >
                          Teaching Aptitude
                        </button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span className="block px-3 py-1.5 text-sm text-gold font-medium">Paper 2</span>
                    <ul className="pl-4 mt-1 border-l-2 border-gold/30 ml-3 space-y-1">
                      {['Computer Science', 'Commerce', 'Management', 'Political Science'].map(sub => (
                        <li key={sub}>
                          <button 
                            onClick={() => setSelectedSubject(sub)}
                            className={`w-full text-left px-3 py-1.5 rounded text-sm ${selectedSubject === sub ? 'text-navy-light font-medium bg-white shadow-sm border border-border-color' : 'text-text-secondary hover:text-navy-light'}`}
                          >
                            {sub}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          
          {/* Filters */}
          <div className="hidden lg:block space-y-6 pt-6 border-t border-border-color">
            <h3 className="font-bold text-navy-light flex items-center gap-2"><Filter size={16}/> Filters</h3>
            
            <div>
              <h4 className="text-sm font-medium text-navy-light mb-2">Test Type</h4>
              <div className="space-y-2">
                {['Full Length Test', 'Sectional Test', 'Previous Year Papers'].map(type => (
                  <label key={type} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-border-color text-gold focus:ring-gold accent-gold" 
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-navy-light mb-2">Difficulty Level</h4>
              <div className="space-y-2">
                {['Easy', 'Moderate', 'Hard'].map(diff => (
                  <label key={diff} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-border-color text-gold focus:ring-gold accent-gold" 
                      checked={selectedDifficulties.includes(diff)}
                      onChange={() => toggleDifficulty(diff)}
                    />
                    {diff}
                  </label>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full text-sm" onClick={clearFilters}>Clear Filters</Button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Breadcrumbs & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="text-sm text-text-secondary flex items-center gap-2 font-medium">
              <span className="text-gold">Home</span>
              <ChevronRight size={14} />
              <span className={selectedSubject !== 'All' ? 'text-navy-light' : 'text-text-secondary'}>
                {selectedSubject}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="Search tests..." 
                  className="pl-9 pr-4 py-2 text-sm border border-border-color rounded-md bg-white focus:outline-none focus:border-gold w-full sm:w-56"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <select 
                className="text-sm border border-border-color rounded-md bg-white px-3 py-2 cursor-pointer focus:outline-none focus:border-gold text-navy-light font-medium"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="Newest First">Newest First</option>
                <option value="Oldest First">Oldest First</option>
                <option value="Duration (Low to High)">Duration (Low to High)</option>
              </select>
            </div>
          </div>

          {/* Subject Summary Card */}
          <div className="bg-white p-5 rounded-lg border border-border-color mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center shrink-0">
                <BookOpen size={24} className="text-navy" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy-light mb-1">{selectedSubject === 'All' ? 'All Tests' : selectedSubject}</h2>
                <p className="text-sm text-text-secondary">
                  Practice these tests to strengthen your concepts, methods, and evaluation strategies for the exam.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0 bg-bg-light px-4 py-2 rounded-md">
              <span className="text-2xl font-bold text-gold">{filteredTests.length}</span>
              <span className="text-xs font-medium text-text-secondary uppercase">Total Tests</span>
            </div>
          </div>

          {/* Test List */}
          <div className="space-y-4">
            {currentTests.length > 0 ? (
              currentTests.map(test => (
                <TestCard key={test.id} test={test} />
              ))
            ) : (
              <div className="bg-white p-8 text-center rounded-lg border border-border-color text-text-secondary">
                No tests match your selected filters. Try clearing them.
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button 
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-border-color rounded text-sm text-text-secondary hover:bg-white disabled:opacity-50 flex items-center gap-1"
              >
                <ChevronLeft size={14}/> Previous
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded font-medium text-sm border ${currentPage === i + 1 ? 'bg-gold border-gold text-navy-light' : 'border-border-color bg-white text-text-secondary hover:bg-bg-light'}`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-border-color rounded text-sm text-text-secondary hover:bg-white disabled:opacity-50 flex items-center gap-1"
              >
                Next <ChevronRight size={14}/>
              </button>
            </div>
          )}
          
        </div>
      </div>
      
      {/* 3. Bottom Feature Strip */}
      <div className="bg-navy py-8 border-t border-navy-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-sm">
            <div className="flex items-center gap-3">
              <div className="bg-gold/10 p-2 rounded-full text-gold"><Target size={20}/></div>
              <div>
                <div className="font-bold">Exam Focused</div>
                <div className="text-gray-400 text-xs">Latest UGC NET pattern</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gold/10 p-2 rounded-full text-gold"><Target size={20}/></div>
              <div>
                <div className="font-bold">Performance Analytics</div>
                <div className="text-gray-400 text-xs">Detailed insights to track progress</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gold/10 p-2 rounded-full text-gold"><Target size={20}/></div>
              <div>
                <div className="font-bold">Top Rankers</div>
                <div className="text-gray-400 text-xs">Learn from toppers strategies</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gold/10 p-2 rounded-full text-gold"><Target size={20}/></div>
              <div>
                <div className="font-bold">Trusted by Students</div>
                <div className="text-gray-400 text-xs">100K+ aspirants trust GS NET</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
