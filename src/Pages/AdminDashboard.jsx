import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-header">Panel de Administración</h2>

      <div className="row">
        <div className="col-md-6">
          <div className="card fitai-card mb-4">
            <div className="card-header">
              <h3 className="mb-0">Nutrición</h3>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <Link to="/units" className="list-group-item list-group-item-action">
                  <div className="icon-container"><i className="fas fa-balance-scale"></i></div>
                  Unidades de Medida
                </Link>
                <Link to="/ingredients" className="list-group-item list-group-item-action">
                  <div className="icon-container"><i className="fas fa-carrot"></i></div>
                  Ingredientes
                </Link>
                <Link to="/dishes" className="list-group-item list-group-item-action">
                  <div className="icon-container"><i className="fas fa-utensils"></i></div>
                  Platos
                </Link>
                <Link to="/recipes" className="list-group-item list-group-item-action">
                  <div className="icon-container"><i className="fas fa-book-open"></i></div>
                  Recetas
                </Link>
                <Link to="/cooking-methods" className="list-group-item list-group-item-action">
                  <div className="icon-container"><i className="fas fa-fire"></i></div>
                  Métodos de Cocción
                </Link>
                <Link to="/categories" className="list-group-item list-group-item-action">
                  <div className="icon-container"><i className="fas fa-tags"></i></div>
                  Categorías de Platos
                </Link>
                <Link to="/plan-types" className="list-group-item list-group-item-action">
                  <div className="icon-container"><i className="fas fa-list-alt"></i></div>
                  Tipos de Planes de Alimentación
                </Link>
                <Link to="/meal-plans" className="list-group-item list-group-item-action">
                  <div className="icon-container"><i className="fas fa-clipboard-list"></i></div>
                  Planes de Alimentación
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card fitai-card">
            <div className="card-header">
              <h3 className="mb-0">Entrenamiento</h3>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <Link to="/muscle-groups" className="list-group-item list-group-item-action">
                  <div className="icon-container"><i className="fas fa-dumbbell"></i></div>
                  Grupos Musculares
                </Link>
                <Link to="/exercises" className="list-group-item list-group-item-action">
                  <div className="icon-container"><i className="fas fa-running"></i></div>
                  Ejercicios
                </Link>
                <Link to="/workout-plans" className="list-group-item list-group-item-action">
                  <div className="icon-container"><i className="fas fa-calendar-alt"></i></div>
                  Planes de Entrenamiento
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
