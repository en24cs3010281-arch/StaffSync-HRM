const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Fake internal database
let employees = [
  { _id: '1', name: 'Rahul Sharma', role: 'Developer', department: 'IT' },
  { _id: '2', name: 'Priya Patel', role: 'Manager', department: 'HR' }
];

app.get('/api/employees', (req, res) => res.json(employees));
app.post('/api/employees', (req, res) => {
    const newEmp = { ...req.body, _id: Date.now().toString() };
    employees.push(newEmp);
    res.json(newEmp);
});

app.delete('/api/employees/:id', (req, res) => {
    employees = employees.filter(emp => emp._id !== req.params.id);
    res.json({ success: true });
});

app.listen(5000, () => console.log('Server running on port 5000'));