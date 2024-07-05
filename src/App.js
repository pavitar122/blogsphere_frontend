import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Index from './Pages/Index';
import Login from './Pages/Login';
import AddBlog from './Pages/Add_blog';
import BlogPage from './Pages/BlogPage';
import EditBlog from './Pages/EditBlog';
import UserBlogPage from './Pages/UserBlogPage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
     <Routes>
      <Route path="/" element={<Index/>} /> 
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/add_blog" element={<AddBlog/>} />
      <Route path="/blog/:id" element={<BlogPage/>} />
      <Route path="/user_blogs/:id" element={<BlogPage/>} />
      <Route path="/user_blogs/edit/:id" element={<EditBlog/>} />
      <Route path="/user_blogs" element={<UserBlogPage/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
