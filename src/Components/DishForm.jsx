import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDish, getDishById, updateDish } from '../Services/DishService';
import { getAllCategories } from '../Services/CategoryService';

export default function DishForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '',
    description: '',
    categoryId: 0, // This value will never exist due to identity IDs starting at 1, only for initialization and type safety
    image: '',
  });

  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.data);
  }

  useEffect(() => {
    loadCategories();
    if (isEdit) {
      getDishById(id).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isEdit ? await updateDish(id, form) : await createDish(form);
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
          <label>Imagen (URL)</label>
          <input name="image" className="form-control" value={form.image} onChange={handleChange} />
        </div>
        <button className="btn btn-success">Guardar</button>
      </form>
    </div>
  );
}
