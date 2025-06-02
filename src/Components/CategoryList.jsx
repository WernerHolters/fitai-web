import { useEffect, useState } from 'react';
import { getAllCategories, deleteCategory } from '../Services/CategoryService';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../Services/MediaService';

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="form-header">
          <i className="fas fa-tags me-2 text-primary"></i>
          Categorías de Platos
        </h2>
        <Link to="/categories/new" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Nueva Categoría
        </Link>
      </div>

      <div className="card fitai-card">
        <div className="card-body p-0">
          <table className="table fitai-table mb-0">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Momento del Día</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>
                    {category.image ? (
                      <img
                        src={getMediaUrl('category', category.id)}
                        alt={category.name}
                        className="img-thumbnail"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        onError={(e) => {
                          console.error(`Failed to load image for category ${category.id}`);
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/50?text=No+Image';
                          e.target.title = 'Error loading image';
                        }}
                      />
                    ) : (
                      <span className="badge bg-secondary">
                        <i className="fas fa-image"></i> No imagen
                      </span>
                    )}
                  </td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    {category.timeOfDay ? (
                      <span className="badge bg-info">{category.timeOfDay}</span>
                    ) : (
                      <span className="text-muted">No especificado</span>
                    )}
                  </td>
                  <td className="text-center">
                    <Link to={`/categories/edit/${category.id}`} className="btn btn-warning btn-sm btn-action me-2">
                      <i className="fas fa-edit"></i> Editar
                    </Link>
                    <button
                      className="btn btn-danger btn-sm btn-action"
                      onClick={() => handleDelete(category.id)}
                    >
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
