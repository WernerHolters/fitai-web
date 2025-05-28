import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMealPlanById, createMealPlan, updateMealPlan } from '../Services/MealPlanService';

export default function MealPlanForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (id) {
      const loadMealPlan = async () => {
        const response = await getMealPlanById(id);
        setMealPlan(response.data);
      };
      loadMealPlan();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealPlan({ ...mealPlan, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (id) {
        await updateMealPlan(id, mealPlan);
      } else {
        await createMealPlan(mealPlan);
      }
      navigate('/meal-plans');
    } catch (error) {
      console.error('Error saving meal plan:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Edit' : 'Create'} Meal Plan</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={mealPlan.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={mealPlan.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
