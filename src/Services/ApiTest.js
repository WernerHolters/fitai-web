import axios from 'axios';

/**
 * Test basic API connectivity
 * @returns {Promise} - Axios promise
 */
export const testApiConnectivity = async (baseUrl = 'http://localhost:8080/api') => {
  try {
    // Test GET request
    console.log('Testing GET request to API...');
    const getResponse = await axios.get(`${baseUrl}/exercises`);
    console.log('GET request successful:', getResponse.status);

    // Test OPTIONS request (for CORS)
    console.log('Testing OPTIONS request (CORS preflight)...');
    const optionsResponse = await axios({
      method: 'OPTIONS',
      url: `${baseUrl}/media/upload/test/1`,
      headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type',
        'Origin': window.location.origin
      }
    });
    console.log('OPTIONS request successful:', optionsResponse);
    
    return {
      success: true,
      message: 'API connectivity tests passed'
    };
  } catch (error) {
    console.error('API connectivity test failed:', error);
    
    let errorDetails = {};
    if (error.response) {
      errorDetails = {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      };
    } else if (error.request) {
      errorDetails = {
        request: 'Request made but no response received (possible network or CORS issue)'
      };
    } else {
      errorDetails = {
        message: error.message
      };
    }
    
    return {
      success: false,
      error: errorDetails,
      message: 'API connectivity tests failed'
    };
  }
};

/**
 * Test sending a minimal file upload to check if the backend accepts it
 */
export const testMinimalFileUpload = async (url = 'http://localhost:8080/api/media/upload/test/1') => {
  try {
    // Create a small test file
    const blob = new Blob(['test file content'], { type: 'text/plain' });
    const testFile = new File([blob], 'test.txt', { type: 'text/plain' });
    
    // Create FormData
    const formData = new FormData();
    formData.append('file', testFile);
    
    // Log form data
    console.log('FormData created with test file');
    
    // Send request
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log('Test upload successful:', response);
    
    return {
      success: true,
      response: response.data,
      message: 'Test file upload successful'
    };
  } catch (error) {
    console.error('Test file upload failed:', error);
    
    let errorDetails = {};
    if (error.response) {
      errorDetails = {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      };
    } else if (error.request) {
      errorDetails = {
        request: 'Request made but no response received (possible network or CORS issue)'
      };
    } else {
      errorDetails = {
        message: error.message
      };
    }
    
    return {
      success: false,
      error: errorDetails,
      message: 'Test file upload failed'
    };
  }
};
