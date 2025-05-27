import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Panel de Administración</h2>
      <div className="list-group">
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
      </div>
    </div>
  );
}
