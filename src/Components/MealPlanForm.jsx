import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMealPlanById, createMealPlan, updateMealPlan } from '../Services/MealPlanService';
import { getAllPlanTypes } from '../Services/PlanTypeService';
import { getAllDishes } from '../Services/DishService';

export default function MealPlanForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mealPlan, setMealPlan] = useState({
    name: '',
    description: '',
    planTypeId: '',
    dishIds: []
  });

  const [planTypes, setPlanTypes] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [planTypesResponse, dishesResponse] = await Promise.all([
          getAllPlanTypes(),
          getAllDishes()
        ]);

        setPlanTypes(planTypesResponse.data);
        setDishes(dishesResponse.data);

        if (id) {
          const mealPlanResponse = await getMealPlanById(id);
          const data = mealPlanResponse.data;
          const dishIds = data.dishes?.map(d => d.id) || [];
          setMealPlan({ ...data, dishIds });
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealPlan(prev => ({ ...prev, [name]: value }));
  };

  const handleDishChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
    setMealPlan(prev => ({
      ...prev,
      dishIds: selectedOptions
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const mealPlanData = {
        name: mealPlan.name,
        description: mealPlan.description,
        planTypeId: mealPlan.planTypeId ? Number(mealPlan.planTypeId) : null,
        dishes: mealPlan.dishIds.map(id => ({ id })) // ✅ esto es lo que backend espera
      };

      if (id) {
        await updateMealPlan(id, mealPlanData);
      } else {
        await createMealPlan(mealPlanData);
      }

      navigate('/meal-plans');
    } catch (error) {
      console.error('Error saving meal plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card fitai-card">
        <div className="card-header">
          <h2 className="mb-0">
            <i className="fas fa-utensils me-2"></i>
            {id ? 'Editar' : 'Nuevo'} Plan de Alimentación
          </h2>
        </div>
        <div className="card-body">
          {loading && <div className="alert alert-info">Cargando...</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre *</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={mealPlan.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descripción</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={mealPlan.description || ''}
                onChange={handleChange}
                rows="3"
                disabled={loading}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="planTypeId" className="form-label">Tipo de Plan</label>
              <select
                className="form-select"
                id="planTypeId"
                name="planTypeId"
                value={mealPlan.planTypeId || ''}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Seleccionar tipo de plan</option>
                {planTypes.map(planType => (
                  <option key={planType.id} value={planType.id}>
                    {planType.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="dishIds" className="form-label">Platos</label>
              <select
                multiple
                className="form-select"
                id="dishIds"
                name="dishIds"
                value={mealPlan.dishIds || []}
                onChange={handleDishChange}
                size="6"
                disabled={loading}
              >
                {dishes.map(dish => (
                  <option key={dish.id} value={dish.id}>
                    {dish.name}
                  </option>
                ))}
              </select>
              <small className="form-text text-muted">
                Mantén pulsado Ctrl (o Cmd en Mac) para seleccionar múltiples platos.
              </small>
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate('/meal-plans')}
                disabled={loading}
              >
                <i className="fas fa-times me-1"></i>
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-1"></i>
                    Guardar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
