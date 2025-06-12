import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById, createCategory, updateCategory } from '../Services/CategoryService';
import { uploadMedia, getMediaUrl } from '../Services/MediaService';

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();  const [category, setCategory] = useState({
    name: '',
    description: '',
    timeOfDay: '',
    image: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (id) {
      const loadCategory = async () => {
        const response = await getCategoryById(id);
        setCategory(response.data);
        
        // If the category has an image, set the preview
        if (response.data.image) {
          setImagePreview(getMediaUrl('category', response.data.id));
        }
      };
      loadCategory();
    }
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
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
    
    // Create a copy of category with the image flag
    const categoryToSubmit = {
      ...category,
      hasImage: Boolean(imageFile || imagePreview)
    };
    
    try {
      let savedCategoryId;
      let responseData;
      
      if (id) {
        const updateResponse = await updateCategory(id, categoryToSubmit);
        responseData = updateResponse.data;
        savedCategoryId = id;
        console.log('Category updated, response:', responseData);
      } else {
        const response = await createCategory(categoryToSubmit);
        responseData = response.data;
        // Check both common patterns for ID in response
        savedCategoryId = responseData.id || responseData.categoryId;
        console.log('Category created, response:', responseData, 'ID extracted:', savedCategoryId);
      }
      
      if (!savedCategoryId) {
        console.error('Could not determine category ID from response:', responseData);
        alert('Se guardó la categoría pero no se pudo determinar su ID para asociar la imagen.');
        navigate('/categories');
        return;
      }
      
      // Upload image if a new file was selected
      if (imageFile) {
        try {
          console.log('Attempting to upload image for category ID:', savedCategoryId);
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
          
          // Try with string ID first
          try {
            const uploadResponse = await uploadMedia('category', savedCategoryId, imageFile);
            console.log('Image upload successful:', uploadResponse);
            // Show success message
            alert('Categoría e imagen guardadas correctamente.');
          } catch (stringIdError) {
            console.log('Failed with string ID, trying numeric ID...');
            const numericId = parseInt(savedCategoryId, 10);
            if (!isNaN(numericId)) {
              try {
                const uploadResponse = await uploadMedia('category', numericId, imageFile);
                console.log('Image upload successful with numeric ID:', uploadResponse);
                // Show success message
                alert('Categoría e imagen guardadas correctamente.');
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
          let errorMessage = 'Se guardó la categoría pero hubo un problema al subir la imagen.';
          if (imageError.response) {
            errorMessage += ` Error ${imageError.response.status}: ${JSON.stringify(imageError.response.data)}`;
          } else if (imageError.message) {
            errorMessage += ` ${imageError.message}`;
          }
          
          alert(errorMessage);
          // Continue even if image upload fails
        }
      }
      
      navigate('/categories');
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };
  return (
    <div className="container mt-4">
      <div className="card fitai-card">
        <div className="card-body">
          <h2 className="form-header mb-4">
            <i className="fas fa-tags me-2 text-primary"></i>
            {id ? 'Editar' : 'Crear'} Categoría
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={category.name}
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
                value={category.description}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
            
            <div className="mb-3">
              <label htmlFor="timeOfDay" className="form-label">Momento del Día</label>
              <select
                className="form-select"
                id="timeOfDay"
                name="timeOfDay"
                value={category.timeOfDay || ''}
                onChange={handleChange}
              >
                <option value="">Seleccionar momento del día</option>
                <option value="DESAYUNO">Desayuno</option>
                <option value="ALMUERZO">Almuerzo</option>
                <option value="CENA">Cena</option>
                <option value="REFRIGERIO">Refrigerio</option>
                <option value="TODO_EL_DIA">Todo el día</option>
              </select>
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
                {imagePreview && 
                  <button 
                    type="button" 
                    className="btn btn-outline-danger ms-2" 
                    onClick={handleImageRemove}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                }
              </div>
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Vista previa" 
                    className="img-thumbnail" 
                    style={{ maxHeight: '200px' }}
                  />
                </div>
              )}
            </div>
            
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save me-2"></i>Guardar
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => navigate('/categories')}
              >
                <i className="fas fa-times me-2"></i>Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
