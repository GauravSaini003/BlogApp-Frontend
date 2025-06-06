import React, { useEffect, useState, useContext } from 'react';
import { getUserPosts, deletePost } from '../service/api';
import { AuthContext } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await getUserPosts(user.token);
      console.log('Fetched posts:', res.data);

      const postArray = Array.isArray(res.data.MyPost)
        ? res.data.MyPost
        : [];

      setPosts(postArray);
    } catch (err) {
      console.error(err);
      setPosts([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(id, user.token);
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ADMIN → go to AdminDashboard
  if (user.role === 'admin') {
    return <Navigate to="/admin/users" />;
  }

  // USER DASHBOARD
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Posts</h1>
        <Link to="/create-post" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} onDelete={handleDelete} isOwner />
        ))
      )}
    </div>
  );
};

export default Dashboard; 