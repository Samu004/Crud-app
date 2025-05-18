import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [postUser, setPostUser] = useState({ title: '', description: '' });
  const [editUser, setEditUser] = useState(null);

  // Fetch users from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);

  // Handle input for create form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostUser((prev) => ({ ...prev, [name]: value }));
  };

  // Create user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user', postUser);
      setUsers([...users, response.data]);
      setPostUser({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Start editing
  const handleEdit = (user) => {
    setEditUser({ ...user }); // Copy user to edit
  };

  // Handle input for edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  // Update user
  const handleUpdate = async () => {
    if (!editUser || !editUser._id) {
      console.error('No user selected for update.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/userupdate/${editUser._id}`, editUser);
      const updatedUsers = users.map((u) =>
        u._id === editUser._id ? editUser : u
      );
      setUsers(updatedUsers);
      setEditUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/userdelete/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <div>
        <h1 className="mt-5 mx-lg-5">CRUD</h1>
        <form className="mx-lg-5" onSubmit={handleSubmit}>
          <input
            className="m-1"
            name="title"
            value={postUser.title}
            onChange={handleInputChange}
            type="text"
            placeholder="Title"
            required
          />
          <input
            className="m-1"
            name="description"
            value={postUser.description}
            onChange={handleInputChange}
            type="text"
            placeholder="Description"
            required
          />
          <button className="btn btn-primary m-1" type="submit">
            Submit
          </button>
        </form>
      </div>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.title}</td>
              <td>{user.description}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm m-1"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm m-1"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Panel */}
      {editUser && (
        <div className="p-3 m-3 border rounded bg-light">
          <h4>Edit Item</h4>
          <input
            className="form-control m-1"
            name="title"
            value={editUser.title}
            onChange={handleEditChange}
          />
          <input
            className="form-control m-1"
            name="description"
            value={editUser.description}
            onChange={handleEditChange}
          />
          <button className="btn btn-success m-1" onClick={handleUpdate}>
            Update
          </button>
          <button
            className="btn btn-secondary m-1"
            onClick={() => setEditUser(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
}

export default App;
