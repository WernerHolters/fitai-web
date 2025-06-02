import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIngredientById, createIngredient, updateIngredient } from '../Services/IngredientService';
import { getAllDishes } from '../Services/DishService';

export default function IngredientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    description: '',
    carbohydrates: '',
    proteins: '',
    fats: '',
    image: '',
  });

  useEffect(() => {
    if (isEdit) {
      getIngredientById(id).then(res => {
        setForm(res.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isEdit ? await updateIngredient(id, form) : await createIngredient(form);
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
        <button className="btn btn-success">Guardar</button>
      </form>
    </div>
  );
}
