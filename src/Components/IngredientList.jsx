import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllIngredients, deleteIngredient } from '../Services/IngredientService';

export default function IngredientList() {
  const [ingredients, setIngredients] = useState([]);

  const loadData = async () => {
    const res = await getAllIngredients();
    setIngredients(res.data);
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

  return (
    <div className="container mt-4">
      <h2>Ingredientes</h2>
      <Link to="/ingredients/new" className="btn btn-primary mb-2">Agregar Ingrediente</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Carbs</th>
            <th>Proteínas</th>
            <th>Grasas</th>
            <th>Platos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(ing => (
            <tr key={ing.id}>
              <td>{ing.description}</td>
              <td>{ing.carbohydrates}</td>
              <td>{ing.proteins}</td>
              <td>{ing.fats}</td>
              <td>{ing.dishes.map(d => d.name).join(', ')}</td>
              <td>
                <Link to={`/ingredients/edit/${ing.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(ing.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
