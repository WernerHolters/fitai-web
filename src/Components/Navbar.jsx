import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fitai-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          FitAI
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="nutritionDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                Nutrición
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/units">
                    Unidades de Medida
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/ingredients">
                    Ingredientes
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/dishes">
                    Platos
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/recipes">
                    Recetas
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/cooking-methods">
                    Métodos de Cocción
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categories">
                    Categorías
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/meal-plans">
                    Planes de Alimentación
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="trainingDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                Entrenamiento
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/muscle-groups">
                    Grupos Musculares
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/exercises">
                    Ejercicios
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/plan-types">
                    Tipos de Plan
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/workout-plans">
                    Planes de Entrenamiento
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/image-upload-test">
                <i className="fas fa-upload me-1"></i>Test de Imágenes
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ai-recommendation">
                <i className="fas fa-robot me-1"></i> Recomendación AI
              </a>
            </li>
          </ul>
          <span className="navbar-text text-white">Admin Panel</span>
        </div>
      </div>
    </nav>
  );
}
