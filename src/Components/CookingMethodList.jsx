import { useEffect, useState } from 'react';
import { getAllCookingMethods, deleteCookingMethod } from '../Services/CookingMethodService';
import { Link } from 'react-router-dom';

export default function CookingMethodList() {
  const [methods, setMethods] = useState([]);

  const loadData = async () => {
    const response = await getAllCookingMethods();
    setMethods(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que quieres eliminar este método de cocción?')) {
      await deleteCookingMethod(id);
      loadData();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Cooking Methods</h2>
      <Link to="/cooking-methods/new" className="btn btn-primary mb-2">Add New</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {methods.map((method) => (
            <tr key={method.id}>
              <td>{method.name}</td>
              <td>{method.description}</td>
              <td>
                <Link to={`/cooking-methods/edit/${method.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(method.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
