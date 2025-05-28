import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMuscleGroupById, createMuscleGroup, updateMuscleGroup } from '../Services/MuscleGroupService';

export default function MuscleGroupForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [muscleGroup, setMuscleGroup] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (id) {
      const loadMuscleGroup = async () => {
        const response = await getMuscleGroupById(id);
        setMuscleGroup(response.data);
      };
      loadMuscleGroup();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMuscleGroup({ ...muscleGroup, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (id) {
        await updateMuscleGroup(id, muscleGroup);
      } else {
        await createMuscleGroup(muscleGroup);
      }
      navigate('/muscle-groups');
    } catch (error) {
      console.error('Error saving muscle group:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card fitai-card">
        <div className="card-body">
          <h2 className="form-header mb-4">
            <i className="fas fa-dumbbell me-2 text-primary"></i>
            {id ? 'Editar' : 'Crear'} Grupo Muscular
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={muscleGroup.name}
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
                value={muscleGroup.description}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/muscle-groups')}>
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
