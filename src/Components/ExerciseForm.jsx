import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExerciseById, createExercise, updateExercise } from '../Services/ExerciseService';
import { getAllMuscleGroups } from '../Services/MuscleGroupService';
import { uploadMedia, getMediaUrl } from '../Services/MediaService';

export default function ExerciseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({
    name: '',
    description: '',
    equipment: '',
    video: '',
    muscleGroups: [],
    image: ''
  });
  
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadMuscleGroups = async () => {
      const response = await getAllMuscleGroups();
      setMuscleGroups(response.data);
    };
    
    loadMuscleGroups();
    
    if (id) {
      const loadExercise = async () => {
        const response = await getExerciseById(id);
        setExercise(response.data);
        
        // If the exercise has muscle groups, set them as selected
        if (response.data.muscleGroups?.length > 0) {
          const selectedIds = response.data.muscleGroups.map(group => group.id);
          setSelectedMuscleGroups(selectedIds);
        }
        
        // If the exercise has an image, set the preview
        if (response.data.hasImage) {
          setImagePreview(getMediaUrl('exercise', response.data.id));
        }
      };
      loadExercise();
    }
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise({ ...exercise, [name]: value });
  };
  
  const handleMuscleGroupChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setSelectedMuscleGroups(selectedOptions);
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
    
    // Create a copy of exercise with the selected muscle groups
    const exerciseToSubmit = {
      ...exercise,
      muscleGroups: selectedMuscleGroups.map(id => ({ id })),
      hasImage: Boolean(imageFile || imagePreview)
    };
      try {
      let savedExerciseId;
      let responseData;
      
      if (id) {
        const updateResponse = await updateExercise(id, exerciseToSubmit);
        responseData = updateResponse.data;
        savedExerciseId = id;
        console.log('Exercise updated, response:', responseData);
      } else {
        const response = await createExercise(exerciseToSubmit);
        responseData = response.data;
        // Check both common patterns for ID in response
        savedExerciseId = responseData.id || responseData.exerciseId;
        console.log('Exercise created, response:', responseData, 'ID extracted:', savedExerciseId);
      }
      
      if (!savedExerciseId) {
        console.error('Could not determine exercise ID from response:', responseData);
        alert('Se guardó el ejercicio pero no se pudo determinar su ID para asociar la imagen.');
        navigate('/exercises');
        return;
      }
        // Upload image if a new file was selected
      if (imageFile) {
        try {
          console.log('Attempting to upload image for exercise ID:', savedExerciseId);
          console.log('Image file details:', {
            name: imageFile.name,
            type: imageFile.type,
            size: imageFile.size,
            lastModified: new Date(imageFile.lastModified).toISOString()
          });
          
          // Validate file before upload
          if (!imageFile.type.startsWith('image/')) {
            throw new Error(`File type ${imageFile.type} is not an image`);
          }
          
          // Try with string ID first (confirmed working via API test)
          try {
            const uploadResponse = await uploadMedia('exercise', savedExerciseId, imageFile);
            console.log('Image upload successful:', uploadResponse);
            
            // Show success message
            alert('Ejercicio y imagen guardados correctamente.');
          } catch (stringIdError) {
            console.log('Failed with string ID, trying numeric ID...');
            const numericId = parseInt(savedExerciseId, 10);
            if (!isNaN(numericId)) {
              try {
                const uploadResponse = await uploadMedia('exercise', numericId, imageFile);
                console.log('Image upload successful with numeric ID:', uploadResponse);
                
                // Show success message
                alert('Ejercicio y imagen guardados correctamente.');
              } catch (numericIdError) {
                console.error('Failed with both string and numeric IDs:', {
                  stringError: stringIdError.message,
                  numericError: numericIdError.message
                });
                throw new Error('Failed to upload with both string and numeric IDs');
              }
            } else {
              throw stringIdError;
            }
          }
        } catch (imageError) {
          console.error('Error uploading image:', imageError);
          
          // More detailed error reporting
          let errorMessage = 'Se guardó el ejercicio pero hubo un problema al subir la imagen.';
          if (imageError.response) {
            errorMessage += ` Error ${imageError.response.status}: ${JSON.stringify(imageError.response.data)}`;
          } else if (imageError.message) {
            errorMessage += ` ${imageError.message}`;
          }
          
          alert(errorMessage);
          // Continue even if image upload fails
        }
      }
      
      navigate('/exercises');
    } catch (error) {
      console.error('Error saving exercise:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card fitai-card">
        <div className="card-body">
          <h2 className="form-header mb-4">
            <i className="fas fa-running me-2 text-primary"></i>
            {id ? 'Editar' : 'Crear'} Ejercicio
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={exercise.name}
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
                value={exercise.description}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="equipment" className="form-label">Equipamiento</label>
              <input
                type="text"
                className="form-control"
                id="equipment"
                name="equipment"
                value={exercise.equipment || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="video" className="form-label">URL del Video</label>
              <input
                type="text"
                className="form-control"
                id="video"
                name="video"
                value={exercise.video || ''}
                onChange={handleChange}
                placeholder="URL de YouTube o referencia del video"
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
            
            <div className="mb-3">
              <label htmlFor="muscleGroups" className="form-label">Grupos Musculares</label>
              <select
                className="form-select"
                id="muscleGroups"
                name="muscleGroups"
                multiple
                value={selectedMuscleGroups}
                onChange={handleMuscleGroupChange}
                required
                size="5"
              >
                {muscleGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
              <small className="form-text text-muted">
                Mantén pulsada la tecla Ctrl (o Cmd en Mac) para seleccionar múltiples grupos musculares
              </small>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/exercises')}>
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
