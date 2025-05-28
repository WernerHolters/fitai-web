import { useEffect, useState } from 'react';
import { getAllPlanTypes, deletePlanType } from '../Services/PlanTypeService';
import { Link } from 'react-router-dom';

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
      <h2>Plan Types</h2>
      <Link to="/plan-types/new" className="btn btn-primary mb-2">Add New</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Objective</th>
            <th>Duration</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {planTypes.map((planType) => (
            <tr key={planType.id}>
              <td>{planType.name}</td>
              <td>{planType.description}</td>
              <td>{planType.objective}</td>
              <td>{planType.duration}</td>
              <td>{planType.image ? 'Yes' : 'No'}</td>
              <td>
                <Link to={`/plan-types/edit/${planType.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(planType.id)}
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
