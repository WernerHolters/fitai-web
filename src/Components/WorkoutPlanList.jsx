import { useEffect, useState } from 'react';
import { getAllWorkoutPlans, deleteWorkoutPlan } from '../Services/WorkoutPlanService';
import { Link } from 'react-router-dom';

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
      <h2>Workout Plans</h2>
      <Link to="/workout-plans/new" className="btn btn-primary mb-2">Add New</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workoutPlans.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>{plan.duration}</td>
              <td>{plan.level}</td>
              <td>
                <Link to={`/workout-plans/edit/${plan.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(plan.id)}
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
