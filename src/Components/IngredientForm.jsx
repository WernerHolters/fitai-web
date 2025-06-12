import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIngredientById, createIngredient, updateIngredient } from '../Services/IngredientService';
import { getAllDishes } from '../Services/DishService';

export default function IngredientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [dishes, setDishes] = useState([]);
  const [form, setForm] = useState({
    description: '',
    carbohydrates: '',
    proteins: '',
    fats: '',
    image: '',
    dishes: [],
  });

  useEffect(() => {
    getAllDishes().then(res => setDishes(res.data));
    if (isEdit) {
      getIngredientById(id).then(res => {
        setForm({
          ...res.data,
          dishes: res.data.dishes.map(d => d.id),
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDishChange = (e) => {
    const { value, checked } = e.target;
    const id = parseInt(value);
    setForm(prevForm => ({
      ...prevForm,
      dishes: checked
        ? [...prevForm.dishes, id]
        : prevForm.dishes.filter(d => d !== id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      dishes: form.dishes.map(id => ({ id })),
    };
    isEdit ? await updateIngredient(id, data) : await createIngredient(data);
    navigate('/ingredients');
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? 'Editar Ingrediente' : 'Agregar Ingrediente'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input name="description" className="form-control" value={form.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Carbohidratos</label>
          <input type="number" step="0.01" name="carbohydrates" className="form-control" value={form.carbohydrates} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Proteínas</label>
          <input type="number" step="0.01" name="proteins" className="form-control" value={form.proteins} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Grasas</label>
          <input type="number" step="0.01" name="fats" className="form-control" value={form.fats} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Imagen (URL)</label>
          <input name="image" className="form-control" value={form.image} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Platos</label>
          <div>
            {dishes.map(d => (
              <div key={d.id} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={d.id}
                  checked={form.dishes.includes(d.id)}
                  onChange={handleDishChange}
                />
                <label className="form-check-label">{d.name}</label>
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-success">Guardar</button>
      </form>
    </div>
  );
}
