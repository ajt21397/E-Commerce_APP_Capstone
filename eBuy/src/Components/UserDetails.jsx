import React, { useEffect, useState } from 'react';

function UserDetails({ userId }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`https://fakestoreapi.com/users/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('An error occurred while fetching user:', error);
      }
    }

    fetchUser();
  }, [userId]); // Include userId in the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <ul>
        <li>Name: {userData.name}</li>
        <li>Email: {userData.email}</li>
        <li>Username: {userData.username}</li>
        <li>Password:{userData.password}</li>
        {/* Add more user details as needed */}
      </ul>
    </div>
  );
}

export default UserDetails;
