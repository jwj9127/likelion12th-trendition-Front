import './App.css';
import { Route, Routes } from 'react-router-dom';

import Main from './pages/Main.jsx';
import Navigation from './component/Navigation.jsx';

function App() {
  return (
  <div className="App">
    <Navigation/>
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
  </div>
  );
}

export default App;
