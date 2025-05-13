import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";



const Homeui = lazy(() => import('./Component/Home/Homeui'));
const Todo = lazy(() => import('./Component/TodoTask/Todo'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/" element={<Homeui />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
