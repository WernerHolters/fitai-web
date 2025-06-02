import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllIngredients, deleteIngredient } from '../Services/IngredientService';
import { getAllDishes } from '../Services/DishService';

export default function IngredientList() {
  const [ingredients, setIngredients] = useState([]);
  const [dishes, setDishes] = useState([]);

  const loadData = async () => {
    const ingRes = await getAllIngredients();
    const dishRes = await getAllDishes();
    setIngredients(ingRes.data);
    setDishes(dishRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que deseas eliminar este ingrediente?')) {
      await deleteIngredient(id);
      loadData();
    }
  };

  const getDishesForIngredient = (ingredientId) => {
    return dishes
      .filter(d => d.ingredients?.some(i => i.id === ingredientId))
      .map(d => d.name);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="form-header">
          <i className="fas fa-carrot me-2 text-primary"></i>
          Ingredientes
        </h2>
        <Link to="/ingredients/new" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Agregar Ingrediente
        </Link>
      </div>

      <div className="card fitai-card">
        <div className="card-body p-0">
          <table className="table fitai-table mb-0">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Carbs</th>
                <th>Proteínas</th>
                <th>Grasas</th>
                <th>Platos</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map(ing => (
                <tr key={ing.id}>
                  <td>{ing.description}</td>
                  <td>{ing.carbohydrates}</td>
                  <td>{ing.proteins}</td>
                  <td>{ing.fats}</td>
                  <td>{getDishesForIngredient(ing.id).join(', ') || 'Sin platos'}</td>
                  <td className="text-center">
                    <Link to={`/ingredients/edit/${ing.id}`} className="btn btn-warning btn-sm btn-action me-2">
                      <i className="fas fa-edit"></i> Editar
                    </Link>
                    <button
                      className="btn btn-danger btn-sm btn-action"
                      onClick={() => handleDelete(ing.id)}
                    >
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
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
