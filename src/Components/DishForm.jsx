import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDish, getDishById, updateDish } from '../Services/DishService';
import { getAllCategories } from '../Services/CategoryService';
import { getAllIngredients } from '../Services/IngredientService';

export default function DishForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '',
    description: '',
    categoryId: 0,
    image: '',
    ingredients: [],
  });

  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    loadCategories();
    loadIngredients();

    if (isEdit) {
      getDishById(id).then(res => {
        setForm({
          ...res.data,
          categoryId: res.data.category?.id ?? 0,
          ingredients: res.data.ingredients?.map(i => i.id) || [],
        });
      });
    }
  }, [id]);

  const loadCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.data);
  };

  const loadIngredients = async () => {
    const res = await getAllIngredients();
    setIngredients(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (e) => {
    const { value, checked } = e.target;
    const ingredientId = parseInt(value);
    setForm(prevForm => ({
      ...prevForm,
      ingredients: checked
        ? [...prevForm.ingredients, ingredientId]
        : prevForm.ingredients.filter(id => id !== ingredientId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dishData = {
      ...form,
      category: { id: form.categoryId },
      ingredients: form.ingredients.map(id => ({ id })),
    };
    isEdit ? await updateDish(id, dishData) : await createDish(dishData);
    navigate('/dishes');
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? 'Editar Plato' : 'Agregar Plato'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea name="description" className="form-control" value={form.description} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Categoría</label>
          <select name="categoryId" className="form-select" value={form.categoryId} onChange={handleChange} required>
            <option value="0">Seleccionar categoría</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Ingredientes</label>
          <div>
            {ingredients.map(ing => (
              <div key={ing.id} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={ing.id}
                  checked={form.ingredients.includes(ing.id)}
                  onChange={handleIngredientChange}
                />
                <label className="form-check-label">{ing.description}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label>Imagen (URL)</label>
          <input name="image" className="form-control" value={form.image} onChange={handleChange} />
        </div>
        <button className="btn btn-success">Guardar</button>
      </form>
    </div>
  );
}
