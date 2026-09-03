import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { 
  Trophy, BookOpen, Clock, Target, ArrowRight, Activity 
} from 'lucide-react';
import { tests } from '../data/tests';

export default function Dashboard() {
  const [pastResults, setPastResults] = useState([]);
  const [stats, setStats] = useState({
    totalTests: 0,
    avgScore: 0,
    totalQuestionsAttempted: 0,
    totalTimeSpent: 0
  });

  useEffect(() => {
    // Fetch all test results from localStorage
    const results = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('result_')) {
        try {
          const testId = key.split('_')[1];
          const testInfo = tests.find(t => t.id === testId) || { title: 'Unknown Test', subject: 'Unknown' };
          const data = JSON.parse(localStorage.getItem(key));
          results.push({
            ...data,
            testId,
            title: testInfo.title,
            subject: testInfo.subject,
            dateObj: new Date(data.date), // for sorting
            percentage: Math.round((data.score / data.totalScore) * 100)
          });
        } catch (e) {
          console.error("Error parsing result data", e);
        }
      }
    }

    // Sort by date descending
    results.sort((a, b) => b.dateObj - a.dateObj);
    setPastResults(results);

    // Calculate aggregated stats
    if (results.length > 0) {
      const totalScore = results.reduce((sum, r) => sum + r.percentage, 0);
      const totalQuestions = results.reduce((sum, r) => sum + r.attempted, 0);
      const totalTime = results.reduce((sum, r) => sum + r.timeSpent, 0);
      
      setStats({
        totalTests: results.length,
        avgScore: Math.round(totalScore / results.length),
        totalQuestionsAttempted: totalQuestions,
        totalTimeSpent: totalTime
      });
    }
  }, []);

  // Format time (seconds to HH:MM)
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  // Chart data: chronological order (oldest to newest for the line chart)
  const chartData = [...pastResults].reverse().map((r, index) => ({
    name: `Test ${index + 1}`,
    score: r.percentage,
    subject: r.subject
  }));

  // Aggregate subject scores
  const subjectMap = {};
  pastResults.forEach(r => {
    if (!subjectMap[r.subject]) {
      subjectMap[r.subject] = { total: 0, count: 0 };
    }
    subjectMap[r.subject].total += r.percentage;
    subjectMap[r.subject].count += 1;
  });
  
  const subjectChartData = Object.keys(subjectMap).map(subject => ({
    subject,
    score: Math.round(subjectMap[subject].total / subjectMap[subject].count)
  }));

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy mb-2">My Dashboard</h1>
          <p className="text-text-secondary">Track your progress and analyze your performance.</p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary font-medium">Tests Attempted</p>
              <h3 className="text-2xl font-bold text-navy">{stats.totalTests}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary font-medium">Average Score</p>
              <h3 className="text-2xl font-bold text-navy">{stats.avgScore}%</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <Target size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary font-medium">Questions Attempted</p>
              <h3 className="text-2xl font-bold text-navy">{stats.totalQuestionsAttempted}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-text-secondary font-medium">Time Spent Learning</p>
              <h3 className="text-2xl font-bold text-navy">{formatTime(stats.totalTimeSpent)}</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                  <Activity size={20} className="text-gold" /> Performance Trend
                </h2>
              </div>
              
              {chartData.length > 0 ? (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value) => [`${value}%`, 'Score']}
                        labelStyle={{ color: '#0F2A4A', fontWeight: 'bold' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#FFB800" 
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#FFB800', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6, fill: '#0F2A4A', stroke: '#FFB800' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] w-full flex flex-col items-center justify-center text-gray-400">
                  <Activity size={48} className="mb-4 opacity-20" />
                  <p>Not enough data. Take some tests to see your trend!</p>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-navy mb-6">Subject Performance</h2>
              
              {subjectChartData.length > 0 ? (
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f8fafc' }}
                      />
                      <Bar dataKey="score" fill="#0F2A4A" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[250px] flex items-center justify-center text-gray-400">
                  <p>No subject data available.</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity Sidebar */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 self-start">
            <h2 className="text-xl font-bold text-navy mb-6">Recent Tests</h2>
            
            {pastResults.length > 0 ? (
              <div className="space-y-4">
                {pastResults.slice(0, 5).map((result, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-navy truncate" title={result.title}>{result.title}</h4>
                      <p className="text-xs text-text-secondary mt-1">{result.date}</p>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right">
                        <span className={`text-sm font-bold ${result.percentage >= 60 ? 'text-green-600' : 'text-red-500'}`}>
                          {result.percentage}%
                        </span>
                      </div>
                      <Link 
                        to={`/result/${result.testId}`}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-gold group-hover:text-white transition-colors"
                      >
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-text-secondary mb-4">You haven't taken any tests yet.</p>
                <Link to="/tests" className="inline-block bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy-light transition-colors">
                  Explore Tests
                </Link>
              </div>
            )}
            
            {pastResults.length > 5 && (
              <button className="w-full mt-6 py-2 text-sm font-medium text-gold border border-gold/30 rounded-lg hover:bg-gold/5 transition-colors">
                View All History
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
