import { useEffect, useState } from 'react';
import { getAllMuscleGroups, deleteMuscleGroup } from '../Services/MuscleGroupService';
import { Link } from 'react-router-dom';

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
      <h2>Muscle Groups</h2>
      <Link to="/muscle-groups/new" className="btn btn-primary mb-2">Add New</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {muscleGroups.map((group) => (
            <tr key={group.id}>
              <td>{group.name}</td>
              <td>{group.description}</td>
              <td>
                <Link to={`/muscle-groups/edit/${group.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(group.id)}
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
