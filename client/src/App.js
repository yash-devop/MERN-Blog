import {Routes, Route, useParams} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog'
import CreatePost from './pages/CreatePost'
import ThatPost from './pages/ThatPost';
import ScrollTop from './components/ScrollTop';
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
        <Route path='/post/:id' element={<ThatPost/>} />
      </Routes>
      <ScrollTop/>
    </div>
    </>
  );
}

export default App;
