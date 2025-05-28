import axios from 'axios';

const API_URL = 'http://localhost:8080/api/media';

/**
 * Upload a media file for a specific entity
 * @param {string} entityType - The type of entity (e.g., 'exercise', 'recipe', 'workout-plan')
 * @param {number} entityId - The ID of the entity
 * @param {File} file - The file to upload
 * @returns {Promise} - Axios promise
 */
export const uploadMedia = (entityType, entityId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return axios.post(`${API_URL}/upload/${entityType}/${entityId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

/**
 * Get the URL for streaming media for a specific entity
 * @param {string} entityType - The type of entity (e.g., 'exercise', 'recipe', 'workout-plan')
 * @param {number} entityId - The ID of the entity
 * @returns {string} - The URL to stream the media
 */
export const getMediaUrl = (entityType, entityId) => {
  return `${API_URL}/stream/${entityType}/${entityId}`;
};
