import './App.css';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentForm from './StudentForm';

export const CONSTANTS = {
  BASE_URL:"https://walrus-app-eqm5f.ondigitalocean.app"
}

function App() {

  

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<StudentForm/>}/>
        <Route path='/edit' element={<StudentForm/>}/>
      </Routes>
    </BrowserRouter>
    

    
  );
}

export default App;
