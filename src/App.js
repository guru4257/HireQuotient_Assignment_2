import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './Pages/AdminPanel';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<AdminPanel />} path='/'></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
