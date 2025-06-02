import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllRecipes, deleteRecipe } from '../Services/RecipeService';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  const loadData = async () => {
    const res = await getAllRecipes();
    setRecipes(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que deseas eliminar esta receta?')) {
      await deleteRecipe(id);
      loadData();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Recetas</h2>
      <Link to="/recipes/new" className="btn btn-primary mb-2">Agregar Receta</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Ingredientes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => (
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              <td>{recipe.description}</td>
              <td>
                {recipe.image ? <img src={recipe.image} alt="receta" width={80} /> : 'Sin imagen'}
              </td>
              <td>
                {recipe.ingredients?.map((ing, index) => (
                  <div key={index}>
                    ID {ing.ingredientId} - {ing.quantity} u. ({ing.optional ? 'Opcional' : 'Obligatorio'})
                  </div>
                ))}
              </td>
              <td>
                <Link to={`/recipes/edit/${recipe.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(recipe.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
