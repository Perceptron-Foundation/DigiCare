// components/UserAvatar.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserAvatar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/user/profile') // replace with your API route
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!user) return null;

  return (
    <div className="relative">
      <img
        src={user.avatarUrl}
        alt="User Avatar"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
          <div className="flex items-center gap-4">
            <img src={user.avatarUrl} alt="avatar" className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            className="mt-4 w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate('/profile')}
          >
            View Complete Profile
          </button>
        </div>
      )}
    </div>
  );
}
