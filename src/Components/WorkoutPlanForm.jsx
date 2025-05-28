import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkoutPlanById, createWorkoutPlan, updateWorkoutPlan } from '../Services/WorkoutPlanService';

export default function WorkoutPlanForm() {
  const { id } = useParams();
  const navigate = useNavigate();  const [workoutPlan, setWorkoutPlan] = useState({
    name: '',
    duration: '',
    level: '',
    description: ''
  });
  useEffect(() => {
    if (id) {
      const loadWorkoutPlan = async () => {
        const response = await getWorkoutPlanById(id);
        setWorkoutPlan(response.data);
      };
      loadWorkoutPlan();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutPlan({ ...workoutPlan, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (id) {
        await updateWorkoutPlan(id, workoutPlan);
      } else {
        await createWorkoutPlan(workoutPlan);
      }
      navigate('/workout-plans');
    } catch (error) {
      console.error('Error saving workout plan:', error);
    }
  };
  return (
    <div className="container mt-4">
      <div className="card fitai-card">
        <div className="card-body">
          <h2 className="form-header mb-4">
            <i className="fas fa-calendar-alt me-2 text-primary"></i>
            {id ? 'Editar' : 'Crear'} Plan de Entrenamiento
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={workoutPlan.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">Duración</label>
              <input
                type="text"
                className="form-control"
                id="duration"
                name="duration"
                value={workoutPlan.duration}
                onChange={handleChange}
                placeholder="ej. 4 semanas, 3 meses"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="level" className="form-label">Nivel</label>
              <select
                className="form-select"
                id="level"
                name="level"
                value={workoutPlan.level}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar nivel</option>
                <option value="Beginner">Principiante</option>
                <option value="Intermediate">Intermedio</option>
                <option value="Advanced">Avanzado</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descripción</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={workoutPlan.description || ''}
                onChange={handleChange}
                rows="4"
              />
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/workout-plans')}>
                <i className="fas fa-times me-2"></i>Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save me-2"></i>Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
