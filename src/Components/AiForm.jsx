import React, { useState } from 'react';
import { askUser } from '../Services/AiService';

const AiRecommendation = () => {
  const [userId, setUserId] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await askUser(userId, pregunta);
      setResult(JSON.parse(response.data));
    } catch (err) {
      setError('Error al obtener la recomendación');
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>Recomendación AI</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-2">
          <label>User ID:</label>
          <input
            type="number"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-2">
          <label>Pregunta:</label>
          <input
            type="text"
            value={pregunta}
            onChange={e => setPregunta(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Consultando...' : 'Consultar'}
        </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {result && (
        <div className="card">
          <div className="card-body">
            <h5>Usuario: {result.usuario}</h5>
            <h6>Plan de Entrenamiento: {result.workoutPlanName} ({result.workoutPlanLevel})</h6>
            <p>Duración: {result.workoutPlanDuration}</p>
            <p>Descripción: {result.workoutPlanDescription}</p>
            <h6>Ejercicios:</h6>
            <ul>
              {result.workoutPlanExercises.map((ex, idx) => (
                <li key={idx}>
                  <b>{ex.exercise.name}</b>: {ex.description} ({ex.sets}x{ex.repetitions})
                </li>
              ))}
            </ul>
            <h6>Plan de Alimentación: {result.mealPlanName}</h6>
            <p>{result.mealPlanDescription}</p>
            <h6>Razón:</h6>
            <p>{result.reason}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiRecommendation;