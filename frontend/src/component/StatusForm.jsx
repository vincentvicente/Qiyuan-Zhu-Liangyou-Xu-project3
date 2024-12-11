import React, { useState, useContext } from 'react';
import { StatusContext } from './StatusContext';

const StatusForm = ({ userId }) => {
  const [content, setContent] = useState('');
  const { addStatus } = useContext(StatusContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/statuses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId, content }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create status');
      }
  
      const { newStatus } = await response.json();
      console.log('New status response:', newStatus);
      addStatus(newStatus);
      setContent('');
    } catch (error) {
      console.error('Error creating status:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        required
      ></textarea>
      <button type="submit">Post</button>
    </form>
  );
};

export default StatusForm;
