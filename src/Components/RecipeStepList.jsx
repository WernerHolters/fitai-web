import { useEffect, useState } from 'react';
import { getAllRecipeSteps, deleteRecipeStep } from '../Services/RecipeStepService';
import { getAllRecipes } from '../Services/RecipeService';
import { Link } from 'react-router-dom';

export default function RecipeStepList() {
  const [steps, setSteps] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [stepRes, recipeRes] = await Promise.all([
      getAllRecipeSteps(),
      getAllRecipes()
    ]);
    setSteps(stepRes.data);
    setRecipes(recipeRes.data);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que deseas eliminar este paso?')) {
      await deleteRecipeStep(id);
      loadData();
    }
  };

  const getRecipeName = (recipeId) => {
    return recipes.find(r => r.id === recipeId)?.name || 'Sin receta';
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="form-header">
          <i className="fas fa-list-ol me-2 text-primary"></i>
          Pasos de Receta
        </h2>
        <Link to="/recipe-steps/new" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Nuevo Paso
        </Link>
      </div>

      <div className="card fitai-card">
        <div className="card-body p-0">
          <table className="table fitai-table mb-0">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Tiempo Estimado (min)</th>
                <th>Orden</th>
                <th>Receta</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {steps.map(step => (
                <tr key={step.id}>
                  <td>{step.description}</td>
                  <td>{step.estimatedTime}</td>
                  <td>{step.stepOrder}</td>
                  <td>{getRecipeName(step.recipeId)}</td>
                  <td className="text-center">
                    <Link to={`/recipe-steps/edit/${step.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(step.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
