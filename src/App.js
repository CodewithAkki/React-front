import './App.css'
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './home/homepage';
import Login from './login/login'
import Project from './project/project'
import Registration from './signup/signup'
import About from './about/about';
import Event from './event/Event';
function App() {


  return (
    <div className="App">
      <BrowserRouter>
    <Routes>
    <Route path="/" element={ <Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/project" element={<Project/>} />
    <Route path="/registration" element={<Registration/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/event" element={<Event/>} />

     
      </Routes>
    </BrowserRouter>
    </div>
  )
}




export default App;
