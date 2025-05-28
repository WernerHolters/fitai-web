import { useEffect, useState } from 'react';
import { getAllCategories, deleteCategory } from '../Services/CategoryService';
import { Link } from 'react-router-dom';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  const loadData = async () => {
    const response = await getAllCategories();
    setCategories(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que quieres eliminar esta categoría?')) {
      await deleteCategory(id);
      loadData();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Categories</h2>
      <Link to="/categories/new" className="btn btn-primary mb-2">Add New</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <Link to={`/categories/edit/${category.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(category.id)}
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
