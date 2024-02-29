import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Customers() {
  const [customerData, setCustomerData] = useState([]);
  const [filter, setFilter] = useState({});
  const [newCustomer, setNewCustomer] = useState({
    customer_id: '',
    first_name: '',
    last_name: ''
  });

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/customers', { params: filter });
      setCustomerData(response.data.customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [filter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleSearch = () => {
    fetchCustomers();
  };

  const handleAddCustomer = async () => {
    try {
      await axios.post('/api/customers', newCustomer);
      setNewCustomer({ customer_id: '', first_name: '', last_name: '' });
      fetchCustomers();
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };
  const handleMoreInfo = (customerId) => {
    // Handle More Info button click
    console.log('More Info clicked for customer ID:', customerId);
  };

  const handleEdit = (customerId) => {
    // Handle Edit button click
    console.log('Edit clicked for customer ID:', customerId);
  };

  const handleDelete = async (customerId) => {
    try {
      // Send a DELETE request to your backend API
      await axios.delete(`/api/customers/${customerId}`);
      
      // Update the customerData state to remove the deleted customer
      setCustomerData(customerData.filter(customer => customer.customer_id !== customerId));
      
      console.log('Customer deleted successfully.');
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  
  return (
    <div>
      <h1>Customer Search</h1>
      <section>
        <div>
          <input
            type="search"
            placeholder="Customer ID"
            name="customer_id"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="search"
            placeholder="First Name"
            name="first_name"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="search"
            placeholder="Last Name"
            name="last_name"
            onChange={handleInputChange}
          />
        </div>
      </section>
      <br/>

      <h2>Add New Customer</h2>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <input
          type="text"
          placeholder="First Name"
          name="first_name"
          value={newCustomer.first_name}
          onChange={handleNewCustomerChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={newCustomer.last_name}
          onChange={handleNewCustomerChange}
        />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </form>

      <br/>
      <div>
        <table className="styled-table">
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
                <td><button onClick={() => handleMoreInfo(customer.customer_id)}>More Info</button></td>
                <td><button onClick={() => handleEdit(customer.customer_id)}>Edit</button></td>
                <td><button onClick={() => handleDelete(customer.customer_id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
