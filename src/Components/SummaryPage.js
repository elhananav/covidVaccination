import React, { useState, useEffect } from 'react';

const cities = [
    "Jerusalem",
    "Tel Aviv",
    "Holon",
    "Eilat",
    "Rishon Letzion",
  ];

const SummaryPage = () => {
  const [search, setSearch] = useState({
    fromDate: '',
    toDate: '',
    city: '',
  });

  const [registrationData, setRegistrationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch all users from the API (You need to replace 'YOUR_API_URL/users' with your actual API endpoint)
    fetch('http://localhost:8080/user/users')
      .then((response) => response.json())
      .then((data) => {
        setRegistrationData(data);
        setFilteredData(data); // Initially, set filteredData to all users
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  useEffect(() => {
    // Filter the registration data when search parameters change
    const filtered = registrationData.filter((data) => {
      const dob = new Date(data.dob);
      const fromDate = search.fromDate ? new Date(search.fromDate) : null;
      const toDate = search.toDate ? new Date(search.toDate) : null;

      // Date range filter
      if (fromDate && toDate) {
        if (dob >= fromDate && dob <= toDate) {
          return true;
        }
        return false;
      }

      // City filter
      if (search.city && data.city.toLowerCase().includes(search.city.toLowerCase())) {
        return true;
      }

      return false;
    });

    setFilteredData(filtered);
  }, [search, registrationData]);

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  };

  const handleShowAllUsers = () => {
    // Fetch all users again when "Show All Users" button is pressed
    fetch('http://localhost:8080/user/users')
      .then((response) => response.json())
      .then((data) => {
        setRegistrationData(data);
        setFilteredData(data); // Update the filteredData state with all users
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <div>
      <h2>Summary Page</h2>
      <label>
        From Date:
        <input
          type="date"
          name="fromDate"
          value={search.fromDate}
          onChange={handleSearchChange}
        />
      </label>
      <label>
        To Date:
        <input type="date" name="toDate" value={search.toDate} onChange={handleSearchChange} />
      </label>
      <label>
        City:
        <input
          type="text"
          name="city"
          value={search.city}
          onChange={handleSearchChange}
          placeholder="Search by City"
        />
      </label>
      <button onClick={handleShowAllUsers}>Show All Users</button>
      {filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>City</th>
              {/* Add more columns here for other registration info */}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr key={index}>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.dob}</td>
                <td>{data.city}</td>
                {/* Add more cells here for other registration info */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default SummaryPage;
