import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Trash2, Edit } from 'lucide-react';

const ManageEntity = ({ endpoint, title }) => {
  const [items, setItems] = useState([]);
  
  const [formData, setFormData] = useState({ title: '', description: '', image: null, programName: '', intake: '', studentsPlaced: '', companiesVisited: '', averagePackage: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/${endpoint}`);
      setItems(data);
    } catch (error) {
      toast.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const data = new FormData();
    
    if (endpoint === 'admissions') {
      data.append('programName', formData.programName);
      data.append('intake', formData.intake);
    } else if (endpoint === 'placements') {
      data.append('studentsPlaced', formData.studentsPlaced);
      data.append('companiesVisited', formData.companiesVisited);
      data.append('averagePackage', formData.averagePackage);
    } else {
      data.append('title', formData.title);
      data.append('description', formData.description);
      if (formData.image) data.append('image', formData.image);
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/${endpoint}/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Updated successfully');
      } else {
        await axios.post(`http://localhost:5000/api/${endpoint}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Created successfully');
      }
      setFormData({ title: '', description: '', image: null, programName: '', intake: '', studentsPlaced: '', companiesVisited: '', averagePackage: '' });
      setEditingId(null);
      fetchItems();
    } catch (error) {
      toast.error('Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      const token = localStorage.getItem('adminToken');
      try {
        await axios.delete(`http://localhost:5000/api/${endpoint}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Deleted successfully');
        fetchItems();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage {title}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit' : 'Add New'} {title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {endpoint === 'admissions' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Program Name</label>
                <input type="text" value={formData.programName} onChange={(e) => setFormData({...formData, programName: e.target.value})} className="w-full mt-1 p-2 border rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sanctioned Intake</label>
                <input type="number" value={formData.intake} onChange={(e) => setFormData({...formData, intake: e.target.value})} className="w-full mt-1 p-2 border rounded-md" required />
              </div>
            </>
          ) : endpoint === 'placements' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Students Placed</label>
                <input type="text" value={formData.studentsPlaced} onChange={(e) => setFormData({...formData, studentsPlaced: e.target.value})} className="w-full mt-1 p-2 border rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Companies Visited</label>
                <input type="text" value={formData.companiesVisited} onChange={(e) => setFormData({...formData, companiesVisited: e.target.value})} className="w-full mt-1 p-2 border rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Average Package</label>
                <input type="text" value={formData.averagePackage} onChange={(e) => setFormData({...formData, averagePackage: e.target.value})} className="w-full mt-1 p-2 border rounded-md" required />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full mt-1 p-2 border rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full mt-1 p-2 border rounded-md" rows="3"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input type="file" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} className="w-full mt-1 p-2 border rounded-md" />
              </div>
            </>
          )}
          <button type="submit" className="px-4 py-2 text-white bg-[#C2A56D] rounded-md hover:bg-[#A88F5C]">
            {editingId ? 'Update' : 'Create'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {endpoint === 'admissions' ? (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Intake</th>
                </>
              ) : endpoint === 'placements' ? (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Placed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Companies</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Pkg</th>
                </>
              ) : (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                </>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map(item => (
              <tr key={item._id}>
                {endpoint === 'admissions' ? (
                  <>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.programName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.intake}</td>
                  </>
                ) : endpoint === 'placements' ? (
                  <>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.studentsPlaced}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.companiesVisited}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.averagePackage}</td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">
                      {item.image && <img src={`http://localhost:5000${item.image}`} alt="" className="w-16 h-16 object-cover rounded" />}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.title}</td>
                  </>
                )}
                <td className="px-6 py-4 text-sm font-medium space-x-2">
                  <button onClick={() => {
                    setEditingId(item._id);
                    if (endpoint === 'admissions') {
                      setFormData({ title: '', description: '', image: null, programName: item.programName, intake: item.intake, studentsPlaced: '', companiesVisited: '', averagePackage: '' });
                    } else if (endpoint === 'placements') {
                      setFormData({ title: '', description: '', image: null, programName: '', intake: '', studentsPlaced: item.studentsPlaced, companiesVisited: item.companiesVisited, averagePackage: item.averagePackage });
                    } else {
                      setFormData({ title: item.title, description: item.description || '', image: null, programName: '', intake: '', studentsPlaced: '', companiesVisited: '', averagePackage: '' });
                    }
                  }} className="text-blue-600 hover:text-blue-900"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEntity;
