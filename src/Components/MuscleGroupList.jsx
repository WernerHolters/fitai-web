import { useEffect, useState } from 'react';
import { getAllMuscleGroups, deleteMuscleGroup } from '../Services/MuscleGroupService';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../Services/MediaService';

export default function MuscleGroupList() {
  const [muscleGroups, setMuscleGroups] = useState([]);

  const loadData = async () => {
    const response = await getAllMuscleGroups();
    setMuscleGroups(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que quieres eliminar este grupo muscular?')) {
      await deleteMuscleGroup(id);
      loadData();
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="form-header">
          <i className="fas fa-dumbbell me-2 text-primary"></i>
          Grupos Musculares
        </h2>
        <Link to="/muscle-groups/new" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Nuevo Grupo
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
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {muscleGroups.map((group) => (
                <tr key={group.id}>
                  <td>
                    {group.hasImage ? (
                      <img 
                        src={getMediaUrl('muscle-group', group.id)}
                        alt={group.name}
                        className="img-thumbnail"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    ) : (
                      <span className="badge bg-secondary">
                        <i className="fas fa-image"></i> No imagen
                      </span>
                    )}
                  </td>
                  <td>{group.name}</td>
                  <td>{group.description}</td>
                  <td className="text-center">
                    <Link to={`/muscle-groups/edit/${group.id}`} className="btn btn-warning btn-sm btn-action me-2">
                      <i className="fas fa-edit"></i> Editar
                    </Link>
                    <button
                      className="btn btn-danger btn-sm btn-action"
                      onClick={() => handleDelete(group.id)}
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
