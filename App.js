import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', role: '', department: '' });

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('http://localhost:5000/api/employees')
        .then(res => setEmployees(res.data))
        .catch(err => console.error(err));
    }
  }, [isLoggedIn]);

  const addEmployee = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/employees', form)
      .then(res => {
        setEmployees([...employees, res.data]);
        setForm({ name: '', role: '', department: '' });
      });
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/api/employees/${id}`)
      .then(() => setEmployees(employees.filter(emp => emp._id !== id)));
  };

  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
        <h2>StaffSync HR System</h2>
        <button onClick={() => setIsLoggedIn(true)} style={{ padding: '10px 20px', cursor: 'pointer' }}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>StaffSync Dashboard</h2>
      <form onSubmit={addEmployee} style={{ marginBottom: '20px' }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{ marginRight: '10px', padding: '5px' }}/>
        <input placeholder="Role" value={form.role} onChange={e => setForm({...form, role: e.target.value})} required style={{ marginRight: '10px', padding: '5px' }}/>
        <input placeholder="Department" value={form.department} onChange={e => setForm({...form, department: e.target.value})} required style={{ marginRight: '10px', padding: '5px' }}/>
        <button type="submit" style={{ padding: '5px 10px' }}>Add</button>
      </form>
      <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead><tr style={{ backgroundColor: '#f2f2f2' }}><th>Name</th><th>Role</th><th>Department</th><th>Action</th></tr></thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.name}</td><td>{emp.role}</td><td>{emp.department}</td>
              <td><button onClick={() => deleteEmployee(emp._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;