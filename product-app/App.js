import React, { useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([
    { id: 'abc123defg', name: 'Laptop', price: 1000, category: { main: 'Electronics', sub: 'Computers' } },
    { id: 'xyz789hijk', name: 'Smartphone', price: 800, category: { main: 'Electronics', sub: 'Mobile Devices' } },
    { id: 'lmn456pqrs', name: 'Office Chair', price: 150, category: { main: 'Furniture', sub: 'Office' } },
  ]);

  const [formState, setFormState] = useState({ name: '', price: '', category: '' });
  const [showJson, setShowJson] = useState(false);

  const generateProductId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const addProduct = (event) => {
    event.preventDefault();
    const id = generateProductId();
    const newProduct = {
      id,
      name: formState.name,
      price: parseFloat(formState.price),
      category: { main: formState.category, sub: '' },
    };
    setProducts([...products, newProduct]);
    setFormState({ name: '', price: '', category: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const displayProductData = () => {
    setShowJson(true);
  };

  return (
    <div className="App">
      <h1>Products</h1>
      <h2>Add a New Product</h2>
      <form onSubmit={addProduct}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <select id="name" name="name" value={formState.name} onChange={handleInputChange} required>
            <option value="">--Select Product--</option>
            <option value="Laptop">Laptop</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Office Chair">Office Chair</option>
            <option value="Tablet">Tablet</option>
            <option value="Monitor">Monitor</option>
            <option value="Keyboard">Keyboard</option>
            <option value="Headphones">Headphones</option>
          </select>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            value={formState.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" value={formState.category} onChange={handleInputChange} required>
            <option value="">--Select Category--</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Accessories">Accessories</option>
            <option value="Gaming">Gaming</option>
            <option value="Office Supplies">Office Supplies</option>
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category.main}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={displayProductData}>Display Products JSON</button>
      {showJson && (
        <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', marginTop: '20px' }}>
          {JSON.stringify({ products }, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
