import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Dashboard from './pages/DashBoard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import BlogList from './pages/BlogList';
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoutes';
import AdminDashboard from './pages/AdminDashboard';
import FullPost from './pages/FullPost';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
           <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        <Route path="/edit-post/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
