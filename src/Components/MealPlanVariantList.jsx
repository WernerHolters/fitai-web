import { useEffect, useState } from 'react';
import { getAllMealPlanVariants, deleteMealPlanVariant } from '../Services/MealPlanVariantService';
import { getAllMealPlans } from '../Services/MealPlanService';
import { Link } from 'react-router-dom';

export default function MealPlanVariantList() {
  const [variants, setVariants] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [variantsRes, mealPlansRes] = await Promise.all([
      getAllMealPlanVariants(),
      getAllMealPlans()
    ]);
    setVariants(variantsRes.data);
    setMealPlans(mealPlansRes.data);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que quieres eliminar esta variante?')) {
      await deleteMealPlanVariant(id);
      loadData();
    }
  };

  const getMealPlanName = (mealPlanId) => {
    return mealPlans.find(mp => mp.id === mealPlanId)?.name || 'No asignado';
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="form-header">
          <i className="fas fa-random me-2 text-primary"></i>
          Variantes de Planes de Alimentación
        </h2>
        <Link to="/meal-plan-variants/new" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Nueva Variante
        </Link>
      </div>

      <div className="card fitai-card">
        <div className="card-body p-0">
          <table className="table fitai-table mb-0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Plan Asociado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {variants.map(variant => (
                <tr key={variant.id}>
                  <td>{variant.name}</td>
                  <td>{variant.description}</td>
                  <td>{getMealPlanName(variant.mealPlanId)}</td>
                  <td className="text-center">
                    <Link to={`/meal-plan-variants/edit/${variant.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(variant.id)}>Eliminar</button>
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
