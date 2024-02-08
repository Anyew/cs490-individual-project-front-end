import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Customers() {
  const [customerData, setCustomerData] = useState([]);
  const [filter, setFilter] = useState({});

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/customers', { params: filter });
      setCustomerData(response.data.customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleSearch = () => {
    fetchCustomers();
  };

  return (
    <div>
      <h1>Customer Search</h1>
      <section>
      <div>
        <input type="search" placeholder="Customer ID" name="customer_id" onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
              handleSearch();
          }
        }}/>
      </div>
      <div>
        <input type="search" placeholder="First Name" name="first_name" onChange={handleInputChange} 
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
              handleSearch();
          }
        }}/>
      </div>
      <div>
        <input type="search" placeholder="Last Name" name="last_name" onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
              handleSearch();
          }
        }}/>
      </div>
      </section>
      
      <div>
    
    <table class="styled-table">
        <thead>
          <h2>Customer List</h2>
        </thead>
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {customerData.map((customer) => (
                <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
    </div>
  );
}

  export default Customers;