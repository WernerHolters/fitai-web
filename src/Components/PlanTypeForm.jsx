import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlanTypeById, createPlanType, updatePlanType } from '../Services/PlanTypeService';
import { uploadMedia, getMediaUrl } from '../Services/MediaService';

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

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (id) {
      const loadPlanType = async () => {
        const response = await getPlanTypeById(id);
        setPlanType(response.data);
        
        // If the plan type has an image, set the preview
        if (response.data.hasImage) {
          setImagePreview(getMediaUrl('plan-type', response.data.id));
        }
      };
      loadPlanType();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanType({ ...planType, [name]: value });
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
    
    // Create a copy of planType with the hasImage flag
    const planTypeToSubmit = {
      ...planType,
      hasImage: Boolean(imageFile || imagePreview)
    };
    
    try {
      let savedPlanTypeId;
      if (id) {
        await updatePlanType(id, planTypeToSubmit);
        savedPlanTypeId = id;
      } else {
        const response = await createPlanType(planTypeToSubmit);
        savedPlanTypeId = response.data.id;
      }

      // Upload image if a new file was selected
      if (imageFile) {
        try {
          await uploadMedia('plan-type', savedPlanTypeId, imageFile);
        } catch (imageError) {
          console.error('Error uploading image:', imageError);
          // Continue even if image upload fails
        }
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
              <label htmlFor="imageFile" className="form-label">Imagen</label>
              <div className="d-flex align-items-center mb-2">
                <input
                  type="file"
                  className="form-control"
                  id="imageFile"
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
