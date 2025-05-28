import { useEffect, useState } from 'react';
import { getAllWorkoutPlans, deleteWorkoutPlan } from '../Services/WorkoutPlanService';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../Services/MediaService';

export default function WorkoutPlanList() {
  const [workoutPlans, setWorkoutPlans] = useState([]);

  const loadData = async () => {
    const response = await getAllWorkoutPlans();
    setWorkoutPlans(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que quieres eliminar este plan de entrenamiento?')) {
      await deleteWorkoutPlan(id);
      loadData();
    }
  };
  
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="form-header">
          <i className="fas fa-calendar-alt me-2 text-primary"></i>
          Planes de Entrenamiento
        </h2>
        <Link to="/workout-plans/new" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Nuevo Plan
        </Link>
      </div>
      
      <div className="card fitai-card">
        <div className="card-body p-0">
          <table className="table fitai-table mb-0">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Duración</th>
                <th>Nivel</th>
                <th>Descripción</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {workoutPlans.map((plan) => (
                <tr key={plan.id}>
                  <td>
                    {plan.hasImage ? (
                      <img 
                        src={getMediaUrl('workout-plan', plan.id)}
                        alt={plan.name}
                        className="img-thumbnail"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    ) : (
                      <span className="badge bg-secondary">
                        <i className="fas fa-image"></i> No imagen
                      </span>
                    )}
                  </td>
                  <td>{plan.name}</td>
                  <td><span className="badge bg-info">{plan.duration}</span></td>
                  <td>
                    <span className={`badge ${plan.level === 'Beginner' ? 'bg-success' : 
                      plan.level === 'Intermediate' ? 'bg-warning' : 'bg-danger'}`}>
                      {plan.level}
                    </span>
                  </td>
                  <td>{plan.description}</td>
                  <td className="text-center">
                    <Link to={`/workout-plans/edit/${plan.id}`} className="btn btn-warning btn-sm btn-action me-2">
                      <i className="fas fa-edit"></i> Editar
                    </Link>
                    <button
                      className="btn btn-danger btn-sm btn-action"
                      onClick={() => handleDelete(plan.id)}
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
