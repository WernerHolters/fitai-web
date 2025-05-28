import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkoutPlanById, createWorkoutPlan, updateWorkoutPlan } from '../Services/WorkoutPlanService';

export default function WorkoutPlanForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workoutPlan, setWorkoutPlan] = useState({
    name: '',
    duration: '',
    level: ''
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
      <h2>{id ? 'Edit' : 'Create'} Workout Plan</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
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
          <label htmlFor="duration" className="form-label">Duration</label>
          <input
            type="text"
            className="form-control"
            id="duration"
            name="duration"
            value={workoutPlan.duration}
            onChange={handleChange}
            placeholder="e.g. 4 weeks, 3 months"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="level" className="form-label">Level</label>
          <select
            className="form-select"
            id="level"
            name="level"
            value={workoutPlan.level}
            onChange={handleChange}
            required
          >
            <option value="">Select a level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
