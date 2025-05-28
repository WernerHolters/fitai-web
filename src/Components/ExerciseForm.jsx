import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExerciseById, createExercise, updateExercise } from '../Services/ExerciseService';
import { getAllMuscleGroups } from '../Services/MuscleGroupService';

export default function ExerciseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({
    name: '',
    description: '',
    equipment: '',
    video: '',
    muscleGroups: []
  });
  
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
  useEffect(() => {
    const loadMuscleGroups = async () => {
      const response = await getAllMuscleGroups();
      setMuscleGroups(response.data);
    };
    
    loadMuscleGroups();
    
    if (id) {
      const loadExercise = async () => {
        const response = await getExerciseById(id);
        setExercise(response.data);
        
        // If the exercise has muscle groups, set them as selected
        if (response.data.muscleGroups?.length > 0) {
          const selectedIds = response.data.muscleGroups.map(group => group.id);
          setSelectedMuscleGroups(selectedIds);
        }
      };
      loadExercise();
    }
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise({ ...exercise, [name]: value });
  };
  
  const handleMuscleGroupChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setSelectedMuscleGroups(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a copy of exercise with the selected muscle groups
    const exerciseToSubmit = {
      ...exercise,
      muscleGroups: selectedMuscleGroups.map(id => ({ id }))
    };
    
    try {
      if (id) {
        await updateExercise(id, exerciseToSubmit);
      } else {
        await createExercise(exerciseToSubmit);
      }
      navigate('/exercises');
    } catch (error) {
      console.error('Error saving exercise:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Edit' : 'Create'} Exercise</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={exercise.name}
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
            value={exercise.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>        <div className="mb-3">
          <label htmlFor="equipment" className="form-label">Equipment</label>
          <input
            type="text"
            className="form-control"
            id="equipment"
            name="equipment"
            value={exercise.equipment || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="video" className="form-label">Video URL</label>
          <input
            type="text"
            className="form-control"
            id="video"
            name="video"
            value={exercise.video || ''}
            onChange={handleChange}
            placeholder="YouTube URL or video reference"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="muscleGroups" className="form-label">Muscle Groups</label>
          <select
            className="form-select"
            id="muscleGroups"
            name="muscleGroups"
            multiple
            value={selectedMuscleGroups}
            onChange={handleMuscleGroupChange}
            required
            size="5"
          >
            {muscleGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
          <small className="form-text text-muted">
            Hold Ctrl (or Cmd on Mac) to select multiple muscle groups
          </small>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
