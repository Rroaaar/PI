import './App.css';
import LandingPage from './components/Landing Page/landingPage';
import Home from './components/Home/home';
import { Route, Routes } from 'react-router-dom';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
  );
}

export default App;
