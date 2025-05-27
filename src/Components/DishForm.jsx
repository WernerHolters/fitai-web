import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDish, getDishById, updateDish } from '../Services/DishService';

export default function DishForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
  });

  useEffect(() => {
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
          <input name="category" className="form-control" value={form.category} onChange={handleChange} />
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
