import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const UserPage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(false);
  const { user } = useContext(AuthContext); // 获取当前登录的用户

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/api/users/${username}`);
      const data = await response.json();
      if (data.error) {
        // 处理错误情况
        console.error(data.error);
      } else {
        setUserData(data.user);
        setDescription(data.user.description || '');
      }
    };
    
    fetchUserData();
  }, [username]);

  const handleDescriptionUpdate = async () => {
    try {
      const response = await fetch(`/api/users/description`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        setEditing(false);
      } else {
        console.error('Failed to update description');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{userData.username}</h1>
      <p>Joined: {new Date(userData.createdAt).toLocaleDateString()}</p>

      {/* 如果当前用户是该页面的用户，显示编辑描述 */}
      {user && user.username === username && (
        editing ? (
          <div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleDescriptionUpdate}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <p>Description: {description}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
          </div>
        )
      )}
      
      {/* 显示该用户的状态更新 */}
      <h2>Status Updates</h2>
      <ul>
        {userData.statuses.map((status) => (
          <li key={status._id}>
            <strong>{status.userId?.username}</strong>: {status.content} ({new Date(status.createdAt).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
