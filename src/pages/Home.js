import { useState } from 'react';
import { searchUser } from '../api';
import { Link } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const users = await searchUser(username);
    setResults(users);
  };

  return (
    <div>
      <h1>Search Users</h1>
      <input
        type="text"
        placeholder="Enter username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((user, idx) => (
          <li key={idx}>
            <Link to={`/chat/${user.username}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
