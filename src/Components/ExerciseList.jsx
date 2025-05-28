import { useEffect, useState } from 'react';
import { getAllExercises, deleteExercise } from '../Services/ExerciseService';
import { Link } from 'react-router-dom';

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  const loadData = async () => {
    const response = await getAllExercises();
    setExercises(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que quieres eliminar este ejercicio?')) {
      await deleteExercise(id);
      loadData();
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="form-header">
          <i className="fas fa-running me-2 text-primary"></i>
          Ejercicios
        </h2>
        <Link to="/exercises/new" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Nuevo Ejercicio
        </Link>
      </div>
      
      <div className="card fitai-card">
        <div className="card-body p-0">
          <table className="table fitai-table mb-0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Equipamiento</th>
                <th>Video</th>
                <th>Grupos Musculares</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise) => (
                <tr key={exercise.id}>
                  <td>{exercise.name}</td>
                  <td>{exercise.description}</td>
                  <td>{exercise.equipment}</td>
                  <td>
                    {exercise.video ? (
                      <span className="badge bg-success">
                        <i className="fas fa-video me-1"></i> Disponible
                      </span>
                    ) : (
                      <span className="badge bg-secondary">
                        <i className="fas fa-times me-1"></i> No disponible
                      </span>
                    )}
                  </td>
                  <td>
                    {exercise.muscleGroups?.map(group => (
                      <span key={group.id} className="badge bg-info me-1 mb-1">
                        {group.name}
                      </span>
                    ))}
                  </td>
                  <td className="text-center">
                    <Link to={`/exercises/edit/${exercise.id}`} className="btn btn-warning btn-sm btn-action me-2">
                      <i className="fas fa-edit"></i> Editar
                    </Link>
                    <button
                      className="btn btn-danger btn-sm btn-action"
                      onClick={() => handleDelete(exercise.id)}
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
