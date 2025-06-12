import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCookingMethodById, createCookingMethod, updateCookingMethod } from '../Services/CookingMethodService';

export default function CookingMethodForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [method, setMethod] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (id) {
      const loadMethod = async () => {
        const response = await getCookingMethodById(id);
        setMethod(response.data);
      };
      loadMethod();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMethod({ ...method, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (id) {
        await updateCookingMethod(id, method);
      } else {
        await createCookingMethod(method);
      }
      navigate('/cooking-methods');
    } catch (error) {
      console.error('Error saving cooking method:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Edit' : 'Create'} Cooking Method</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={method.name}
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
            value={method.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
