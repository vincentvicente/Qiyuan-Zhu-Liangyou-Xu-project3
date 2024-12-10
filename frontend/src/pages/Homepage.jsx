import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Homepage = () => {
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch('/api/statuses');
        const data = await response.json();
        setStatuses(data);
      } catch (error) {
        console.error('Failed to fetch statuses:', error);
      }
    };
    fetchStatuses();
  }, []);

  const handleCreateStatus = async () => {
    if (!newStatus.trim()) return;
    try {
      const response = await fetch('/api/statuses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: newStatus }),
      });
      if (response.ok) {
        const createdStatus = await response.json();
        setStatuses((prev) => [createdStatus, ...prev]);
        setNewStatus('');
      }
    } catch (error) {
      console.error('Failed to create status:', error);
    }
  };

  return (
    <div>
      <h2>Latest Updates</h2>
      {user && (
        <div>
          <input
            type="text"
            placeholder="What's on your mind?"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
          <button onClick={handleCreateStatus}>Post</button>
        </div>
      )}
      <ul>
        {statuses.map((status) => (
          <li key={status._id}>
            <Link to={`/user/${status.userId.username}`}>{status.userId?.username}</Link>: {status.content} ({new Date(status.createdAt).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
