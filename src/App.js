import Welcome from './components/Welcome';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RegisterVisitor from './components/RegisterVisitor';
import VisitorsList from './components/VisitorsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Welcome/>} />
        <Route path='/register-visitor' element={<RegisterVisitor/>} />
        <Route path='/visitors-list' element={<VisitorsList/>} />
      </Routes>
    </Router>
  );
}

export default App;
