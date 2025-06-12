import { useEffect, useState } from 'react';
import { getAllMealPlans, deleteMealPlan } from '../Services/MealPlanService';
import { getAllPlanTypes } from '../Services/PlanTypeService';
import { Link } from 'react-router-dom';

export default function MealPlanList() {
  const [mealPlans, setMealPlans] = useState([]);
  const [planTypes, setPlanTypes] = useState([]);

  const loadData = async () => {
    try {
      // Load meal plans and plan types in parallel
      const [mealPlansResponse, planTypesResponse] = await Promise.all([
        getAllMealPlans(),
        getAllPlanTypes()
      ]);
      
      setMealPlans(mealPlansResponse.data);
      setPlanTypes(planTypesResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);s
    }
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
  // Helper function to get plan type name
  const getPlanTypeName = (planTypeId) => {
    if (!planTypeId) return 'No especificado';
    const planType = planTypes.find(pt => pt.id === planTypeId);
    return planType ? planType.name : 'No especificado';
  };
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="form-header">
          <i className="fas fa-utensils me-2 text-primary"></i>
          Planes de Alimentación
        </h2>
        <Link to="/meal-plans/new" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Nuevo Plan
        </Link>
      </div>
      
      <div className="card fitai-card">
        <div className="card-body p-0">
          <table className="table fitai-table mb-0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Tipo de Plan</th>
                <th>Platos</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mealPlans.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.name}</td>
                  <td>{plan.description}</td>
                  <td>
                    <span className="badge bg-info">
                      {getPlanTypeName(plan.planTypeId)}
                    </span>
                  </td>
                  <td>
                    {plan.dishes && plan.dishes.length > 0 ? (
                      console.log(plan),
                      <div>
                        <span className="badge bg-info">{plan.dishes.length}</span> platos
                        <div className="dish-list">
                          {plan.dishes.slice(0, 3).map(dish => (
                            <span key={dish.id} className="badge bg-secondary me-1 mb-1">{dish.name}</span>
                          ))}
                          {plan.dishes.length > 3 && 
                            <span className="badge bg-light text-dark">+{plan.dishes.length - 3} más</span>
                          }
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted">No hay platos</span>
                    )}
                  </td>
                  <td className="text-center">
                    <Link to={`/meal-plans/edit/${plan.id}`} className="btn btn-warning btn-sm btn-action me-2">
                      <i className="fas fa-edit"></i> Editar
                    </Link>
                    <Link to={`/meal-plans/${plan.id}/variants`} className="btn btn-info btn-sm btn-action me-2">
                      <i className="fas fa-list-alt"></i> Variantes
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
