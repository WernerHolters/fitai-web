import { useEffect, useState } from 'react';
import { getAllUnits, deleteUnit } from '../Services/unitOfMeasureService';
import { Link } from 'react-router-dom';
import './UnitOfMeasureList.css';

export default function UnitOfMeasureList() {
  const [units, setUnits] = useState([]);

  const loadData = async () => {
    const response = await getAllUnits();
    setUnits(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que quieres eliminar esta unidad?')) {
      await deleteUnit(id);
      loadData();
    }
  };
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="form-header">
          <i className="fas fa-balance-scale me-2 text-primary"></i>
          Unidades de Medida
        </h2>
        <Link to="/units/new" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Nueva Unidad
        </Link>
      </div>
      
      <div className="card fitai-card">
        <div className="card-body p-0">
          <table className="table fitai-table mb-0">
            <thead>              <tr>
                <th>Nombre</th>
                <th>Abreviatura</th>
                <th>Descripción</th>
                <th>Ingredientes</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {units.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td><span className="badge bg-light text-dark">{u.abbreviation}</span></td>
                  <td>{u.description}</td>
                  <td>
                    {u.ingredients && u.ingredients.length > 0 ? (
                      <div>
                        <span className="badge bg-info">{u.ingredients.length}</span> ingredientes
                        <div className="ingredient-list">
                          {u.ingredients.slice(0, 3).map(ingredient => (
                            <span key={ingredient.id} className="badge bg-secondary me-1">{ingredient.name}</span>
                          ))}
                          {u.ingredients.length > 3 && 
                            <span className="badge bg-light text-dark">+{u.ingredients.length - 3} más</span>
                          }
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted">No hay ingredientes</span>
                    )}
                  </td>
                  <td className="text-center">
                    <Link to={`/units/edit/${u.id}`} className="btn btn-warning btn-sm btn-action me-2">
                      <i className="fas fa-edit"></i> Editar
                    </Link>
                    <button 
                      className="btn btn-danger btn-sm btn-action" 
                      onClick={() => handleDelete(u.id)}
                    >
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
