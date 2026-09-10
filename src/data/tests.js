export const categories = [
  { id: 'all', name: 'All Tests' },
  { id: 'ugc-net', name: 'UGC NET' },
  { id: 'paper-1', name: 'Paper 1', parentId: 'ugc-net' },
  { id: 'paper-2', name: 'Paper 2', parentId: 'ugc-net' },
  { id: 'teaching-aptitude', name: 'Teaching Aptitude', parentId: 'paper-1' },
  { id: 'management', name: 'Management' },
  { id: 'computer-science', name: 'Computer Science' },
  { id: 'commerce', name: 'Commerce' },
  { id: 'political-science', name: 'Political Science' },
];

export const tests = [
  {
    id: "TA-01",
    title: "Teaching Aptitude Test 01",
    code: "TA-01",
    category: "UGC NET",
    paper: "Paper 1",
    subject: "Teaching Aptitude",
    questions: 50,
    durationMinutes: 60,
    passingPercentage: 40,
    price: 99,
    attempts: 0,
    difficulty: "Easy",
    type: "Full Length Test"
  },

  // --- Baaki Teaching Aptitude tests abhi ke liye hide hain ---
  // Jab sab tests ek sath add karne ho, bas neeche wala pura block
  // uncomment kar dena (koi data delete nahi hui hai).
  /*
  {
    id: "TA-02",
    title: "Teaching Aptitude Test 02",
    code: "TA-02",
    category: "UGC NET",
    paper: "Paper 1",
    subject: "Teaching Aptitude",
    questions: 50,
    durationMinutes: 60,
    passingPercentage: 40,
    price: 99,
    attempts: 0,
    difficulty: "Moderate",
    type: "Full Length Test"
  },
  {
    id: "TA-03",
    title: "Teaching Aptitude Test 03",
    code: "TA-03",
    category: "UGC NET",
    paper: "Paper 1",
    subject: "Teaching Aptitude",
    questions: 50,
    durationMinutes: 60,
    passingPercentage: 40,
    price: 99,
    attempts: 0,
    difficulty: "Hard",
    type: "Sectional Test"
  },
  {
    id: "TA-04",
    title: "Teaching Aptitude Test 04",
    code: "TA-04",
    category: "UGC NET",
    paper: "Paper 1",
    subject: "Teaching Aptitude",
    questions: 50,
    durationMinutes: 60,
    passingPercentage: 40,
    price: 99,
    attempts: 0,
    difficulty: "Moderate",
    type: "Previous Year Papers"
  },
  {
    id: "TA-05",
    title: "Teaching Aptitude Test 05",
    code: "TA-05",
    category: "UGC NET",
    paper: "Paper 1",
    subject: "Teaching Aptitude",
    questions: 50,
    durationMinutes: 60,
    passingPercentage: 40,
    price: 99,
    attempts: 0,
    difficulty: "Easy",
    type: "Full Length Test"
  },
  {
  "id": "TA-06",
  "title": "Teaching Aptitude Test 06",
  "code": "TA-06",
  "category": "Teaching Aptitude",
  "paper": "Paper 1",
  "subject": "General",
  "questions": 50,
  "durationMinutes": 60,
  "passingPercentage": 40,
  "price": 0,
  "attempts": 0,
  "difficulty": "Moderate",
  "type": "Full Length Test"
  },
  */
  // --- Yahan tak hidden ---

  {
  "id": "CS-01",
  "title": "Computer Science Mock Test 01",
  "code": "CS-01",
  "category": "UGC NET",
  "paper": "Paper 2",
  "subject": "Computer Science",
  "questions": 10,
  "durationMinutes": 15,
  "passingPercentage": 40,
  "price": 99,
  "attempts": 0,
  "difficulty": "Moderate",
  "type": "Sectional Test"
}
  ,{
  "id": "COM-01",
  "title": "Commerce Mock Test 01",
  "code": "COM-01",
  "category": "UGC NET",
  "paper": "Paper 2",
  "subject": "Commerce",
  "questions": 10,
  "durationMinutes": 15,
  "passingPercentage": 40,
  "price": 99,
  "attempts": 0,
  "difficulty": "Moderate",
  "type": "Sectional Test"
}
  ,{
  "id": "MGMT-01",
  "title": "Management Mock Test 01",
  "code": "MGMT-01",
  "category": "UGC NET",
  "paper": "Paper 2",
  "subject": "Management",
  "questions": 10,
  "durationMinutes": 15,
  "passingPercentage": 40,
  "price": 99,
  "attempts": 0,
  "difficulty": "Moderate",
  "type": "Sectional Test"
}
  ,{
  "id": "POL-01",
  "title": "Political Science Mock Test 01",
  "code": "POL-01",
  "category": "UGC NET",
  "paper": "Paper 2",
  "subject": "Political Science",
  "questions": 10,
  "durationMinutes": 15,
  "passingPercentage": 40,
  "price": 99,
  "attempts": 0,
  "difficulty": "Moderate",
  "type": "Sectional Test"
}
];
