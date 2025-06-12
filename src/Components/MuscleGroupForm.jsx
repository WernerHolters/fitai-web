import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMuscleGroupById, createMuscleGroup, updateMuscleGroup } from '../Services/MuscleGroupService';
import { uploadMedia, getMediaUrl } from '../Services/MediaService';

export default function MuscleGroupForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [muscleGroup, setMuscleGroup] = useState({
    name: '',
    description: '',
    hasImage: false
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (id) {
      const loadMuscleGroup = async () => {
        const response = await getMuscleGroupById(id);
        setMuscleGroup(response.data);
        
        // If the muscle group has an image, set the preview
        if (response.data.hasImage) {
          setImagePreview(getMediaUrl('muscle-group', response.data.id));
        }
      };
      loadMuscleGroup();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMuscleGroup({ ...muscleGroup, [name]: value });
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
    
    // Create a copy of muscleGroup with the hasImage flag
    const muscleGroupToSubmit = {
      ...muscleGroup,
      hasImage: Boolean(imageFile || imagePreview)
    };
    
    try {
      let savedMuscleGroupId;
      if (id) {
        await updateMuscleGroup(id, muscleGroupToSubmit);
        savedMuscleGroupId = id;
      } else {
        const response = await createMuscleGroup(muscleGroupToSubmit);
        savedMuscleGroupId = response.data.id;
      }

      // Upload image if a new file was selected
      if (imageFile) {
        try {
          await uploadMedia('muscle-group', savedMuscleGroupId, imageFile);
        } catch (imageError) {
          console.error('Error uploading image:', imageError);
          // Continue even if image upload fails
        }
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
