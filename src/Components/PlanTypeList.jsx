import { useEffect, useState } from 'react';
import { getAllPlanTypes, deletePlanType } from '../Services/PlanTypeService';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../Services/MediaService';

export default function PlanTypeList() {
  const [planTypes, setPlanTypes] = useState([]);

  const loadData = async () => {
    const response = await getAllPlanTypes();
    setPlanTypes(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que quieres eliminar este tipo de plan?')) {
      await deletePlanType(id);
      loadData();
    }
  };
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="form-header">
          <i className="fas fa-list-alt me-2 text-primary"></i>
          Tipos de Plan
        </h2>
        <Link to="/plan-types/new" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Nuevo Tipo
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
                <th>Objetivo</th>
                <th>Duración</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {planTypes.map((planType) => (
                <tr key={planType.id}>
                  <td>
                    {planType.hasImage ? (
                      <img 
                        src={getMediaUrl('plan-type', planType.id)}
                        alt={planType.name}
                        className="img-thumbnail"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    ) : (
                      <span className="badge bg-secondary">
                        <i className="fas fa-image"></i> No imagen
                      </span>
                    )}
                  </td>
                  <td>{planType.name}</td>
                  <td>{planType.description}</td>
                  <td>{planType.objective}</td>
                  <td>{planType.duration}</td>
                  <td className="text-center">
                    <Link to={`/plan-types/edit/${planType.id}`} className="btn btn-warning btn-sm btn-action me-2">
                      <i className="fas fa-edit"></i> Editar
                    </Link>
                    <button
                      className="btn btn-danger btn-sm btn-action"
                      onClick={() => handleDelete(planType.id)}
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
