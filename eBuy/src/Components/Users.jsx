import React, { useState, useEffect } from 'react';

async function fetchUsers() {
  try {
    const response = await fetch('https://fakestoreapi.com/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while fetching users:', error);
    throw error;
  }
}

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
