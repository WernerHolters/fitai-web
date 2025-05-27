import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UnitOfMeasureList from './components/UnitOfMeasureList';
import UnitOfMeasureForm from './components/UnitOfMeasureForm';

import IngredientList from './Components/IngredientList';
import IngredientForm from './Components/IngredientForm';

import DishList from './Components/DishList';
import DishForm from './Components/DishForm';

import RecipeList from './Components/RecipeList';
import RecipeForm from './Components/RecipeForm';

import AdminDashboard from './Pages/AdminDashboard';


function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard principal */}
        <Route path="/" element={<AdminDashboard />} />

        {/* Unidades de medida */}
        <Route path="/units" element={<UnitOfMeasureList />} />
        <Route path="/units/new" element={<UnitOfMeasureForm />} />
        <Route path="/units/edit/:id" element={<UnitOfMeasureForm />} />

        {/* Ingredientes */}
        <Route path="/ingredients" element={<IngredientList />} />
        <Route path="/ingredients/new" element={<IngredientForm />} />
        <Route path="/ingredients/edit/:id" element={<IngredientForm />} />

        {/* Dishes */}
        <Route path="/dishes" element={<DishList />} />
        <Route path="/dishes/new" element={<DishForm />} />
        <Route path="/dishes/edit/:id" element={<DishForm />} />

        {/* Recetas */}
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/new" element={<RecipeForm />} />
        <Route path="/recipes/edit/:id" element={<RecipeForm />} />

        {/* Ruta por defecto */}
        <Route path="*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
