import { useEffect, useState } from 'react';
import { getAllMealPlans, deleteMealPlan } from '../Services/MealPlanService';
import { Link } from 'react-router-dom';

export default function MealPlanList() {
  const [mealPlans, setMealPlans] = useState([]);

  const loadData = async () => {
    const response = await getAllMealPlans();
    setMealPlans(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que quieres eliminar este plan de alimentación?')) {
      await deleteMealPlan(id);
      loadData();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Meal Plans</h2>
      <Link to="/meal-plans/new" className="btn btn-primary mb-2">Add New</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mealPlans.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>{plan.description}</td>
              <td>
                <Link to={`/meal-plans/edit/${plan.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <Link to={`/meal-plans/${plan.id}/variants`} className="btn btn-info btn-sm me-2">Variants</Link>
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
