import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeById, createRecipe, updateRecipe } from '../Services/RecipeService';
import { getAllIngredients } from '../Services/IngredientService';
import { getAllUnits } from '../Services/UnitOfMeasureService';

export default function RecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    ingredients: [],
  });

  const [ingredientsOptions, setIngredientsOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);

  useEffect(() => {
    getAllIngredients().then(res => setIngredientsOptions(res.data));
    getAllUnits().then(res => setUnitOptions(res.data));

    if (isEdit) {
      getRecipeById(id).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = [...form.ingredients];
    updated[index][field] = field === 'optional' ? value.target.checked : value;
    setForm({ ...form, ingredients: updated });
  };

  const handleAddIngredient = () => {
    setForm({
      ...form,
      ingredients: [
        ...form.ingredients,
        {
          ingredientId: '',
          unitOfMeasureId: '',
          quantity: '',
          optional: false,
        },
      ],
    });
  };

  const handleRemoveIngredient = (index) => {
    const updated = [...form.ingredients];
    updated.splice(index, 1);
    setForm({ ...form, ingredients: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isEdit
      ? await updateRecipe(id, form)
      : await createRecipe(form);
    navigate('/recipes');
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? 'Editar Receta' : 'Agregar Receta'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea
            name="description"
            className="form-control"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Imagen (URL)</label>
          <input
            name="image"
            className="form-control"
            value={form.image}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Ingredientes</label>
          {form.ingredients.map((ing, index) => (
            <div className="border p-3 mb-3" key={index}>
              <div className="row">
                <div className="col-md-4">
                  <label>Ingrediente</label>
                  <select
                    className="form-select"
                    value={ing.ingredientId}
                    onChange={(e) =>
                      handleIngredientChange(index, 'ingredientId', parseInt(e.target.value))
                    }
                  >
                    <option value="">Seleccione</option>
                    {ingredientsOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.description}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label>Unidad</label>
                  <select
                    className="form-select"
                    value={ing.unitOfMeasureId}
                    onChange={(e) =>
                      handleIngredientChange(index, 'unitOfMeasureId', parseInt(e.target.value))
                    }
                  >
                    <option value="">Seleccione</option>
                    {unitOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name} ({opt.abbreviation})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <label>Cantidad</label>
                  <input
                    type="number"
                    className="form-control"
                    value={ing.quantity}
                    onChange={(e) =>
                      handleIngredientChange(index, 'quantity', parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={ing.optional}
                      onChange={(e) =>
                        handleIngredientChange(index, 'optional', e)
                      }
                    />
                    <label className="form-check-label">Opcional</label>
                  </div>
                </div>
                <div className="col-md-1 d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddIngredient}
          >
            Agregar ingrediente
          </button>
        </div>

        <button className="btn btn-success">Guardar</button>
      </form>
    </div>
  );
}
