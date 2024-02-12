import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication/Authentication';
import Home from './pages/HomePage/Home';
import Messages from './pages/Messages/Messages';

function App() {
  return (
    <div className="">

      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path='/messages' element={<Messages />} />
        <Route path="/*" element={<Authentication />} />
      </Routes>

    </div>
  );
}

export default App;
