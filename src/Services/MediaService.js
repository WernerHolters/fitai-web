import axios from 'axios';

const API_URL = 'http://localhost:8080/api/media';

// Map frontend entity types to backend entity types if necessary
const ENTITY_TYPE_MAPPING = {
  'exercise': 'Exercise',
  'workout-plan': 'WorkoutPlan', // Possible backend naming (camelCase)
  'muscle-group': 'MuscleGroup', // Possible backend naming (camelCase)
  'plan-type': 'PlanType',       // Possible backend naming (camelCase)
  'recipe': 'Recipe',
  'dish': 'Dish'
};

/**
 * Upload a media file for a specific entity
 * @param {string} entityType - The type of entity (e.g., 'exercise', 'recipe', 'workout-plan')
 * @param {number} entityId - The ID of the entity
 * @param {File} file - The file to upload
 * @returns {Promise} - Axios promise
 */
export const uploadMedia = async (entityType, entityId, file) => {
  console.log(`Uploading file for ${entityType} with ID ${entityId}`, file);
  
  // Check if file is valid
  if (!file || !(file instanceof File)) {
    console.error('Invalid file object:', file);
    throw new Error('Invalid file object provided for upload');
  }
  
  // Map the entity type if necessary
  const mappedEntityType = ENTITY_TYPE_MAPPING[entityType] || entityType;
  
  const formData = new FormData();
  formData.append('file', file);
  
  // Log the FormData to make sure it's being created correctly
  console.log('FormData created with file:', file.name, 'type:', file.type, 'size:', file.size);
  
  // Test direct API URL (confirmed working with curl test)
  const directUrl = `${API_URL}/upload/${entityType}/${entityId}`;
  console.log(`Trying direct upload URL: ${directUrl}`);
  
  try {
    // Use the strategy confirmed working with curl test
    const response = await axios.post(directUrl, formData);
    console.log('Upload successful with direct URL:', response);
    return response;
  } catch (directError) {
    console.error('Direct upload failed:', directError);
    console.log('Attempting fallback strategies...');
    
    // Different upload URLs to try as fallbacks
    const uploadUrls = [
      `${API_URL}/upload/${mappedEntityType}/${entityId}`,  // Mapped entity type
      `${API_URL}/upload?entityType=${entityType}&entityId=${entityId}`,  // Query params
    ];
    
    console.log('Will try fallback URLs:', uploadUrls);
    
    // Try different upload strategies
    const strategies = [
      // Strategy 1: Without Content-Type header (browser sets automatically)
      {
        name: "Without Content-Type",
        config: {}
      },
      // Strategy 2: Standard with Content-Type header
      {
        name: "With Content-Type",
        config: {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      },
      // Strategy 3: With additional headers that some backends require
      {
        name: "With additional headers",
        config: {
          headers: {
            'Accept': '*/*'
          }
        }
      }
    ];
    
    // Try each URL with each strategy
    for (const url of uploadUrls) {
      console.log(`Trying fallback URL: ${url}`);
      
      for (const strategy of strategies) {
        try {
          console.log(`Using strategy: ${strategy.name}`);
          const response = await axios.post(url, formData, strategy.config);
          console.log(`Upload successful with URL ${url} and strategy ${strategy.name}:`, response);
          return response;
        } catch (error) {
          console.error(`Upload failed with URL ${url} and strategy ${strategy.name}:`, 
            error.response ? {
              status: error.response.status,
              data: error.response.data
            } : error.message);
          
          // Continue to next strategy or URL
        }
      }
    }
    
    // If all attempts failed, throw an error with details
    throw new Error(`All upload attempts failed. Main error: ${directError.message}`);
  }
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

/**
 * Test fetching a media file for a specific entity to validate the backend is serving files correctly
 * @param {string} entityType - The type of entity (e.g., 'exercise', 'recipe')
 * @param {string|number} entityId - The ID of the entity
 * @returns {Promise} - Axios promise with test result
 */
export const testMediaFetch = async (entityType, entityId) => {
  try {
    const mappedEntityType = ENTITY_TYPE_MAPPING[entityType] || entityType;
    const url = getMediaUrl(mappedEntityType, entityId);
    console.log(`Testing media fetch from URL: ${url}`);
    
    // Test fetch with Axios
    const response = await axios.get(url, {
      responseType: 'blob',
      // Small timeout to detect if server is hanging
      timeout: 5000
    });
    
    console.log('Media fetch successful:', {
      status: response.status,
      contentType: response.headers['content-type'],
      contentLength: response.headers['content-length'],
      dataType: response.data.type,
      dataSize: response.data.size
    });
    
    return {
      success: true,
      url,
      contentType: response.headers['content-type'],
      contentLength: response.headers['content-length'],
      dataType: response.data.type,
      dataSize: response.data.size
    };
  } catch (error) {
    console.error('Media fetch test failed:', error);
    
    let errorDetails = {};
    if (error.response) {
      errorDetails = {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      };
    } else if (error.request) {
      errorDetails = {
        request: 'Request made but no response received (possible network, CORS, or server issue)'
      };
    } else {
      errorDetails = {
        message: error.message
      };
    }
    
    return {
      success: false,
      url: getMediaUrl(entityType, entityId),
      error: errorDetails
    };
  }
};
