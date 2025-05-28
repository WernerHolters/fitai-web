import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlanTypeById, createPlanType, updatePlanType } from '../Services/PlanTypeService';

export default function PlanTypeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [planType, setPlanType] = useState({
    name: '',
    description: '',
    objective: '',
    duration: '',
    image: ''
  });

  useEffect(() => {
    if (id) {
      const loadPlanType = async () => {
        const response = await getPlanTypeById(id);
        setPlanType(response.data);
      };
      loadPlanType();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanType({ ...planType, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (id) {
        await updatePlanType(id, planType);
      } else {
        await createPlanType(planType);
      }
      navigate('/plan-types');
    } catch (error) {
      console.error('Error saving plan type:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card fitai-card">
        <div className="card-body">
          <h2 className="form-header mb-4">
            <i className="fas fa-list-alt me-2 text-primary"></i>
            {id ? 'Editar' : 'Crear'} Tipo de Plan
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={planType.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descripción</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={planType.description}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="objective" className="form-label">Objetivo</label>
              <input
                type="text"
                className="form-control"
                id="objective"
                name="objective"
                value={planType.objective}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">Duración</label>
              <input
                type="text"
                className="form-control"
                id="duration"
                name="duration"
                value={planType.duration}
                onChange={handleChange}
                placeholder="ej. 4 semanas, 3 meses"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">URL de Imagen</label>
              <input
                type="text"
                className="form-control"
                id="image"
                name="image"
                value={planType.image}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/plan-types')}>
                <i className="fas fa-times me-2"></i>Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save me-2"></i>Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
