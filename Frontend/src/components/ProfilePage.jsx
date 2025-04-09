// pages/ProfilePage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/user/profile')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleEdit = () => {
    // logic to enable editing or redirect to edit page
  };

  const handleAnalyze = (reportId) => {
    // navigate or trigger analysis
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center gap-6">
        <img src={user.avatarUrl} alt="avatar" className="w-24 h-24 rounded-full" />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <button
            onClick={handleEdit}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <h3 className="mt-8 text-xl font-semibold">Uploaded Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {user.reports.map((report) => (
          <div key={report.id} className="border p-4 rounded shadow-sm">
            <p className="font-medium">{report.title}</p>
            <p className="text-sm text-gray-500">{new Date(report.uploadedAt).toLocaleString()}</p>
            <button
              onClick={() => handleAnalyze(report.id)}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Analyze Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
