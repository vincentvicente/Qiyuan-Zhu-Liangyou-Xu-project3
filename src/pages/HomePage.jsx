import React, { useEffect, useState } from 'react';
import '../styling/HomePage.css';

const Homepage = () => {
  const [statuses, setStatuses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch('/api/statuses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch statuses. Please log in again.');
        }

        const data = await response.json();
        setStatuses(data);
      } catch (err) {
        console.error('Error fetching statuses:', err);
        setError(err.message);
        setStatuses([]);
      }
    };

    fetchStatuses();
  }, []);

  return (
    <div className="homepage-container">
      <h2 className="homepage-header">Latest Updates</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="status-list">
        {statuses.length > 0 ? (
          statuses.map((status) => (
            <li key={status._id} className="status-item">
              <div className="status-item-header">
                <strong>{status.userId?.username || 'Unknown User'}</strong>
                <small>{new Date(status.createdAt).toLocaleString()}</small>
              </div>
              <div className="status-item-content">
                {status.content}
              </div>
            </li>
          ))
        ) : (
          <p className="no-statuses">No statuses available.</p>
        )}
      </ul>
    </div>
  );
};

export default Homepage;
