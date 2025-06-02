import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';

import UnitOfMeasureList from './Components/UnitOfMeasureList';
import UnitOfMeasureForm from './Components/UnitOfMeasureForm';

import IngredientList from './Components/IngredientList';
import IngredientForm from './Components/IngredientForm';

import DishList from './Components/DishList';
import DishForm from './Components/DishForm';

import RecipeList from './Components/RecipeList';
import RecipeForm from './Components/RecipeForm';

import CategoryList from './Components/CategoryList';
import CategoryForm from './Components/CategoryForm';

import CookingMethodList from './Components/CookingMethodList';
import CookingMethodForm from './Components/CookingMethodForm';

import MuscleGroupList from './Components/MuscleGroupList';
import MuscleGroupForm from './Components/MuscleGroupForm';

import ExerciseList from './Components/ExerciseList';
import ExerciseForm from './Components/ExerciseForm';

import PlanTypeList from './Components/PlanTypeList';
import PlanTypeForm from './Components/PlanTypeForm';

import WorkoutPlanList from './Components/WorkoutPlanList';
import WorkoutPlanForm from './Components/WorkoutPlanForm';

import MealPlanList from './Components/MealPlanList';
import MealPlanForm from './Components/MealPlanForm';

import ImageUploadTest from './Components/ImageUploadTest';

import AdminDashboard from './Pages/AdminDashboard';

import AiRecommendation from './Components/AiForm';
import MealPlanVariantList from './Components/MealPlanVariantList';
import MealPlanVariantForm from './Components/MealPlanVariantForm';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-container">
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
          <Route path="/dishes/edit/:id" element={<DishForm />} />        {/* Recetas */}
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/new" element={<RecipeForm />} />
          <Route path="/recipes/edit/:id" element={<RecipeForm />} />

          {/* Categories */}
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/new" element={<CategoryForm />} />
          <Route path="/categories/edit/:id" element={<CategoryForm />} />

          {/* Cooking Methods */}
          <Route path="/cooking-methods" element={<CookingMethodList />} />
          <Route path="/cooking-methods/new" element={<CookingMethodForm />} />
          <Route path="/cooking-methods/edit/:id" element={<CookingMethodForm />} />

          {/* Muscle Groups */}
          <Route path="/muscle-groups" element={<MuscleGroupList />} />
          <Route path="/muscle-groups/new" element={<MuscleGroupForm />} />
          <Route path="/muscle-groups/edit/:id" element={<MuscleGroupForm />} />

          {/* Exercises */}
          <Route path="/exercises" element={<ExerciseList />} />
          <Route path="/exercises/new" element={<ExerciseForm />} />
          <Route path="/exercises/edit/:id" element={<ExerciseForm />} />

          {/* Plan Types */}
          <Route path="/plan-types" element={<PlanTypeList />} />
          <Route path="/plan-types/new" element={<PlanTypeForm />} />
          <Route path="/plan-types/edit/:id" element={<PlanTypeForm />} />

          {/* Workout Plans */}
          <Route path="/workout-plans" element={<WorkoutPlanList />} />
          <Route path="/workout-plans/new" element={<WorkoutPlanForm />} />
          <Route path="/workout-plans/edit/:id" element={<WorkoutPlanForm />} />

          {/* Meal Plans */}
          <Route path="/meal-plans" element={<MealPlanList />} />
          <Route path="/meal-plans/new" element={<MealPlanForm />} />
          <Route path="/meal-plans/edit/:id" element={<MealPlanForm />} />

          {/* Meal Plan Variants */}
          <Route path="/meal-plan-variants" element={<MealPlanVariantList />} />
          <Route path="/meal-plan-variants/new" element={<MealPlanVariantForm />} />
          <Route path="/meal-plan-variants/edit/:id" element={<MealPlanVariantForm />} />

          {/* Image Upload Test */}
          <Route path="/image-upload-test" element={<ImageUploadTest />} />

          {/* AI Recommendation */}
          <Route path="/ai-recommendation" element={<AiRecommendation />} />

          {/* Ruta por defecto */}
          <Route path="*" element={<AdminDashboard />} />      </Routes>
      </div>
    </Router>
  );
}

export default App;
