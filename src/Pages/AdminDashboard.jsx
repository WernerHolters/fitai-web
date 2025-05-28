import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Panel de Administración</h2>
      
      <h3 className="mt-4">Nutrición</h3>
      <div className="list-group mb-4">
        <Link to="/units" className="list-group-item list-group-item-action">
          Gestionar Unidades de Medida
        </Link>
        <Link to="/ingredients" className="list-group-item list-group-item-action">
          Gestionar Ingredientes
        </Link>
        <Link to="/dishes" className="list-group-item list-group-item-action">
          Gestionar Platos
        </Link>
        <Link to="/recipes" className="list-group-item list-group-item-action">
          Gestionar Recetas
        </Link>
        <Link to="/cooking-methods" className="list-group-item list-group-item-action">
          Gestionar Métodos de Cocción
        </Link>
        <Link to="/categories" className="list-group-item list-group-item-action">
          Gestionar Categorías
        </Link>
        <Link to="/meal-plans" className="list-group-item list-group-item-action">
          Gestionar Planes de Alimentación
        </Link>
      </div>
      
      <h3 className="mt-4">Entrenamiento</h3>
      <div className="list-group">
        <Link to="/muscle-groups" className="list-group-item list-group-item-action">
          Gestionar Grupos Musculares
        </Link>
        <Link to="/exercises" className="list-group-item list-group-item-action">
          Gestionar Ejercicios
        </Link>
        <Link to="/plan-types" className="list-group-item list-group-item-action">
          Gestionar Tipos de Plan
        </Link>
        <Link to="/workout-plans" className="list-group-item list-group-item-action">
          Gestionar Planes de Entrenamiento
        </Link>
      </div>
    </div>
  );
}
