import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeStepById, createRecipeStep, updateRecipeStep } from '../Services/RecipeStepService';
import { getAllRecipes } from '../Services/RecipeService';

export default function RecipeStepForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    description: '',
    estimatedTime: '',
    stepOrder: '',
    recipeId: ''
  });

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes().then(res => setRecipes(res.data));
    if (isEdit) {
      getRecipeStepById(id).then(res => setForm(res.data));
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
      estimatedTime: Number(form.estimatedTime),
      stepOrder: Number(form.stepOrder),
      recipeId: Number(form.recipeId)
    };
    isEdit
      ? await updateRecipeStep(id, payload)
      : await createRecipeStep(payload);
    navigate('/recipe-steps');
  };

  return (
    <div className="container mt-4">
      <div className="card fitai-card">
        <div className="card-header">
          <h2 className="mb-0">
            <i className="fas fa-list-ol me-2"></i>
            {isEdit ? 'Editar Paso' : 'Nuevo Paso de Receta'}
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Descripción *</label>
              <textarea
                className="form-control"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tiempo Estimado (min)</label>
              <input
                type="number"
                name="estimatedTime"
                className="form-control"
                value={form.estimatedTime}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Orden del Paso</label>
              <input
                type="number"
                name="stepOrder"
                className="form-control"
                value={form.stepOrder}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Receta Asociada *</label>
              <select
                name="recipeId"
                className="form-select"
                value={form.recipeId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar receta</option>
                {recipes.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/recipe-steps')}>
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
