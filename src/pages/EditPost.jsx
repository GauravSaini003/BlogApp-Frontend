import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost, getUserPosts } from '../service/api';
import { AuthContext } from '../context/AuthContext';

const EditPost = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const res = await getUserPosts(user.token);
      const post = res.data.find((p) => p._id === id);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }
    };
    fetchPost();
  }, [id, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, { title, content }, user.token);
      alert('Post updated!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to update post');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2">Update</button>
      </form>
    </div>
  );
};

export default EditPost;
