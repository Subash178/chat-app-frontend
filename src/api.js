const API_URL = 'http://localhost:5000'; // Change this after deploy

export async function signup(userData) {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function login(userData) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function searchUser(username) {
  const res = await fetch(`${API_URL}/search?username=${username}`);
  return res.json();
}
