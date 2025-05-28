import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkoutPlanById, createWorkoutPlan, updateWorkoutPlan } from '../Services/WorkoutPlanService';
import { uploadMedia, getMediaUrl } from '../Services/MediaService';

export default function WorkoutPlanForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workoutPlan, setWorkoutPlan] = useState({
    name: '',
    duration: '',
    level: '',
    description: '',
    hasImage: false
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    if (id) {
      const loadWorkoutPlan = async () => {
        const response = await getWorkoutPlanById(id);
        setWorkoutPlan(response.data);
        
        // If the workout plan has an image, set the preview
        if (response.data.hasImage) {
          setImagePreview(getMediaUrl('workout-plan', response.data.id));
        }
      };
      loadWorkoutPlan();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutPlan({ ...workoutPlan, [name]: value });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a copy of workoutPlan with the hasImage flag
    const workoutPlanToSubmit = {
      ...workoutPlan,
      hasImage: Boolean(imageFile || imagePreview)
    };
    
    try {
      let savedWorkoutPlanId;
      if (id) {
        await updateWorkoutPlan(id, workoutPlanToSubmit);
        savedWorkoutPlanId = id;
      } else {
        const response = await createWorkoutPlan(workoutPlanToSubmit);
        savedWorkoutPlanId = response.data.id;
      }

      // Upload image if a new file was selected
      if (imageFile) {
        try {
          await uploadMedia('workout-plan', savedWorkoutPlanId, imageFile);
        } catch (imageError) {
          console.error('Error uploading image:', imageError);
          // Continue even if image upload fails
        }
      }
      
      navigate('/workout-plans');
    } catch (error) {
      console.error('Error saving workout plan:', error);
    }
  };
  
  return (
    <div className="container mt-4">
      <div className="card fitai-card">
        <div className="card-body">
          <h2 className="form-header mb-4">
            <i className="fas fa-calendar-alt me-2 text-primary"></i>
            {id ? 'Editar' : 'Crear'} Plan de Entrenamiento
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={workoutPlan.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">Duración</label>
              <input
                type="text"
                className="form-control"
                id="duration"
                name="duration"
                value={workoutPlan.duration}
                onChange={handleChange}
                placeholder="ej. 4 semanas, 3 meses"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="level" className="form-label">Nivel</label>
              <select
                className="form-select"
                id="level"
                name="level"
                value={workoutPlan.level}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar nivel</option>
                <option value="Beginner">Principiante</option>
                <option value="Intermediate">Intermedio</option>
                <option value="Advanced">Avanzado</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descripción</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={workoutPlan.description || ''}
                onChange={handleChange}
                rows="4"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Imagen</label>
              <div className="d-flex align-items-center mb-2">
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
                {imagePreview && (
                  <button 
                    type="button" 
                    className="btn btn-outline-danger ms-2" 
                    onClick={handleImageRemove}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
              
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Vista previa de imagen" 
                    style={{ maxWidth: '200px', maxHeight: '150px' }} 
                    className="img-thumbnail"
                  />
                </div>
              )}
            </div>
            
            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/workout-plans')}>
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
