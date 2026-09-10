import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AllTests from './pages/AllTests';
import TestDetails from './pages/TestDetails';
import MockTest from './pages/MockTest';
import Result from './pages/Result';
import AnswerReview from './pages/AnswerReview';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      {/* Exam Interface & Results (No standard header/footer) */}
      <Route path="/test/:testId" element={<MockTest />} />
      <Route path="/result/:testId" element={<Result />} />
      <Route path="/result/:testId/review" element={<AnswerReview />} />

      {/* Pages with standard layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<AllTests />} />
        <Route path="/tests" element={<AllTests />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test/:testId/instructions" element={<TestDetails />} />
      </Route>
    </Routes>
  );
}
export default App;
