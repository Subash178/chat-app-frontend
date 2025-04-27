import { useState } from 'react';
import { signup } from '../api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert('Passwords do not match');
    }
    const res = await signup(form);
    if (res.success) {
      navigate('/login');
    } else {
      alert(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
