import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUnit, getUnitById, updateUnit } from '../Services/unitOfMeasureService';
import { getAllIngredients } from '../Services/IngredientService';

export default function UnitOfMeasureForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '',
    abbreviation: '',
    description: '',
    ingredients: []
  });
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);

  useEffect(() => {
    // Load all ingredients
    getAllIngredients().then(response => {
      setAllIngredients(response.data);
    });

    // Load unit details if in edit mode
    if (isEdit) {
      getUnitById(id).then(res => {
        setForm(res.data);
        // Extract ingredient IDs if they exist
        if (res.data.ingredients && res.data.ingredients.length > 0) {
          setSelectedIngredientIds(res.data.ingredients.map(ingredient => ingredient.id));
        }
      });
    }
  }, [id]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setSelectedIngredientIds(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Map selected ingredient IDs to ingredient objects
    const ingredientsToSubmit = selectedIngredientIds.map(ingredientId => ({
      id: ingredientId
    }));
    
    // Create the final form data with ingredients
    const formData = {
      ...form,
      ingredients: ingredientsToSubmit
    };
    
    // Submit the form
    isEdit ? await updateUnit(id, formData) : await createUnit(formData);
    navigate('/units');
  };
  return (
    <div className="container mt-4">
      <div className="card fitai-card">
        <div className="card-body">
          <h2 className="form-header mb-4">
            <i className="fas fa-balance-scale me-2 text-primary"></i>
            {isEdit ? 'Editar' : 'Crear'} Unidad de Medida
          </h2><form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Abreviatura</label>
          <input name="abbreviation" className="form-control" value={form.abbreviation} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input name="description" className="form-control" value={form.description} onChange={handleChange} />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Ingredientes que usan esta unidad</label>
          <select 
            multiple 
            className="form-select" 
            size="5"
            onChange={handleIngredientChange}
            value={selectedIngredientIds}
          >
            {allIngredients.map(ingredient => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))}
          </select>
          <small className="form-text text-muted">
            Mantén presionada la tecla Ctrl (o Cmd en Mac) para seleccionar múltiples ingredientes.
          </small>
          
          {selectedIngredientIds.length > 0 && (
            <div className="mt-2">
              <p><strong>{selectedIngredientIds.length} ingredientes seleccionados</strong></p>
              <div className="d-flex flex-wrap gap-1">
                {selectedIngredientIds.map(id => {
                  const ingredient = allIngredients.find(i => i.id === id);
                  return ingredient ? (
                    <span key={id} className="badge bg-primary">{ingredient.name}</span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
        
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-save me-2"></i>Guardar
        </button>
        </form>
      </div>
    </div>
  </div>
    );
  }

