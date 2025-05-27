import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUnit, getUnitById, updateUnit } from '../Services/unitOfMeasureService';

export default function UnitOfMeasureForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '',
    abbreviation: '',
    description: '',
  });

  useEffect(() => {
    if (isEdit) {
      getUnitById(id).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isEdit ? await updateUnit(id, form) : await createUnit(form);
    navigate('/units');
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? 'Edit Unit' : 'Create Unit'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Abbreviation</label>
          <input name="abbreviation" className="form-control" value={form.abbreviation} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input name="description" className="form-control" value={form.description} onChange={handleChange} />
        </div>
        <button className="btn btn-success">Save</button>
      </form>
    </div>
  );
}
