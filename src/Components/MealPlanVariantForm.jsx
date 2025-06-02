import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMealPlanVariantById, createMealPlanVariant, updateMealPlanVariant } from '../Services/MealPlanVariantService';
import { getAllMealPlans } from '../Services/MealPlanService';

export default function MealPlanVariantForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '',
    description: '',
    mealPlanId: ''
  });

  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    getAllMealPlans().then(res => setMealPlans(res.data));
    if (isEdit) {
      getMealPlanVariantById(id).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      mealPlanId: Number(form.mealPlanId)
    };
    isEdit
      ? await updateMealPlanVariant(id, payload)
      : await createMealPlanVariant(payload);
    navigate('/meal-plan-variants');
  };

  return (
    <div className="container mt-4">
      <div className="card fitai-card">
        <div className="card-header">
          <h2 className="mb-0">
            <i className="fas fa-random me-2"></i>
            {isEdit ? 'Editar Variante' : 'Nueva Variante de Plan'}
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Plan de Alimentación Asociado *</label>
              <select
                name="mealPlanId"
                className="form-select"
                value={form.mealPlanId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar plan</option>
                {mealPlans.map(mp => (
                  <option key={mp.id} value={mp.id}>
                    {mp.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/meal-plan-variants')}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
