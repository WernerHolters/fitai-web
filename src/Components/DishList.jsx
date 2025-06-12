import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllDishes, deleteDish } from '../Services/DishService';
import { getAllCategories } from '../Services/CategoryService';

export default function DishList() {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);

  const loadData = async () => {
    const res = await getAllDishes();
    const catRes = await getAllCategories();
    setDishes(res.data);
    setCategories(catRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que deseas eliminar este plato?')) {
      await deleteDish(id);
      loadData();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Platos</h2>
      <Link to="/dishes/new" className="btn btn-primary mb-2">Agregar Plato</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map(dish => (
            <tr key={dish.id}>
              <td>{dish.name}</td>
              <td>{dish.description}</td>
              <td>{categories.find(cat => cat.id === dish.categoryId).name ?? 'Categoría no existente'}</td>
              <td>
                {dish.image ? <img src={dish.image} alt="dish" width={80} /> : 'Sin imagen'}
              </td>
              <td>
                <Link to={`/dishes/edit/${dish.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(dish.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
