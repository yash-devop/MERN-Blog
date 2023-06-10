import {Routes, Route, useParams} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog'
import CreatePost from './pages/CreatePost'
function App() {
  return (
    <>
    <div className="whole-container">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Blog/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/create' element={<CreatePost/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
