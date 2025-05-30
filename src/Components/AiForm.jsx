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
      try {
        // Si la respuesta ya es un objeto, úsala directamente
        if (typeof response.data === 'object') {
          setResult(response.data);
        } else {
          setResult(JSON.parse(response.data));
        }
      } catch (parseError) {
        setError('Respuesta inesperada del backend: ' + JSON.stringify(response.data));
      }
    } catch (err) {
      if (err.response) {
        setError('Error: ' + (err.response.data || err.message));
      } else if (err.request) {
        setError('No se recibió respuesta del servidor.');
      } else {
        setError('Error al obtener la recomendación: ' + err.message);
      }
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
            <h5 className="mb-3">Usuario: <b>{result.usuario}</b></h5>
            <h6 className="mt-2">Plan de Entrenamiento</h6>
            <ul>
              <li><b>Nombre:</b> {result.workoutPlanName}</li>
              <li><b>Nivel:</b> {result.workoutPlanLevel}</li>
              <li><b>Duración:</b> {result.workoutPlanDuration} min</li>
              <li><b>Descripción:</b> {result.workoutPlanDescription}</li>
            </ul>
            <h6 className="mt-3">Ejercicios:</h6>
            <ul>
              {result.workoutPlanExercises && result.workoutPlanExercises.map((ex, idx) => (
                <li key={idx}>
                  <b>{ex.exercise.name}</b> ({ex.exercise.description}) - {ex.sets}x{ex.repetitions} [{ex.exercise.equipment}]
                </li>
              ))}
            </ul>
            <h6 className="mt-3">Plan de Alimentación</h6>
            <ul>
              <li><b>Nombre:</b> {result.mealPlanName}</li>
              <li><b>Descripción:</b> {result.mealPlanDescription}</li>
            </ul>
            <h6 className="mt-3">Razón de la recomendación:</h6>
            <p>{result.reason}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiRecommendation;