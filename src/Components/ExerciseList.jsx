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
      <h2>Exercises</h2>
      <Link to="/exercises/new" className="btn btn-primary mb-2">Add New</Link>      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Equipment</th>
            <th>Video</th>
            <th>Muscle Groups</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise.id}>
              <td>{exercise.name}</td>
              <td>{exercise.description}</td>
              <td>{exercise.equipment}</td>
              <td>{exercise.video ? 'Available' : 'Not available'}</td>
              <td>
                {exercise.muscleGroups?.map(group => group.name).join(', ')}
              </td>
              <td>
                <Link to={`/exercises/edit/${exercise.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(exercise.id)}
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
