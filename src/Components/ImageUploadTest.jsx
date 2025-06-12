import { useState } from 'react';
import { uploadMedia, testMediaFetch, getMediaUrl } from '../Services/MediaService';
import { testApiConnectivity, testMinimalFileUpload } from '../Services/ApiTest';

export default function ImageUploadTest() {
  const [file, setFile] = useState(null);
  const [entityType, setEntityType] = useState('exercise');
  const [entityId, setEntityId] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [apiTestResult, setApiTestResult] = useState(null);
  const [minimalUploadResult, setMinimalUploadResult] = useState(null);
  const [mediaFetchResult, setMediaFetchResult] = useState(null);
  const [fetchedImageUrl, setFetchedImageUrl] = useState('');
  const [fetchedMediaType, setFetchedMediaType] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus('Uploading...');
      try {
      await uploadMedia(entityType, entityId, file);
      setUploadStatus('Upload successful!');
    } catch (error) {
      console.error('Upload error:', error);
      
      // More detailed error reporting
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        setUploadStatus(`Upload failed: Status ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        setUploadStatus(`Upload failed: No response received from server - check CORS and server status`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        setUploadStatus(`Upload failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card fitai-card">
        <div className="card-body">
          <h2 className="form-header mb-4">
            <i className="fas fa-upload me-2 text-primary"></i>
            Test de Carga de Imágenes
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="entityType" className="form-label">Tipo de Entidad</label>
              <select 
                className="form-select"
                id="entityType"
                value={entityType}
                onChange={(e) => setEntityType(e.target.value)}
              >
                <option value="exercise">Exercise</option>
                <option value="workout-plan">Workout Plan</option>
                <option value="muscle-group">Muscle Group</option>
                <option value="plan-type">Plan Type</option>
                <option value="recipe">Recipe</option>
                <option value="dish">Dish</option>
              </select>
            </div>
            
            <div className="mb-3">
              <label htmlFor="entityId" className="form-label">ID de Entidad</label>
              <input
                type="text"
                className="form-control"
                id="entityId"
                value={entityId}
                onChange={(e) => setEntityId(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Imagen</label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
              <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={!file || !entityId}>
                <i className="fas fa-upload me-2"></i>Subir Imagen
              </button>
              
              <button 
                type="button" 
                className="btn btn-info" 
                onClick={async () => {
                  setApiTestResult('Testing API connectivity...');
                  const result = await testApiConnectivity();
                  setApiTestResult(result);
                }}
              >
                <i className="fas fa-network-wired me-2"></i>Test API
              </button>
                <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={async () => {
                  setMinimalUploadResult('Testing minimal file upload...');
                  const result = await testMinimalFileUpload(`http://localhost:8080/api/media/upload/${entityType}/${entityId || '1'}`);
                  setMinimalUploadResult(result);
                }}
              >
                <i className="fas fa-file-medical me-2"></i>Test File Upload
              </button>
              
              <button 
                type="button" 
                className="btn btn-success" 
                onClick={async () => {
                  setMediaFetchResult('Testing media fetch...');
                  const result = await testMediaFetch(entityType, entityId || '1');
                  setMediaFetchResult(result);
                  if (result.success) {
                    setFetchedImageUrl(getMediaUrl(entityType, entityId || '1'));
                    setFetchedMediaType(result.contentType); // NEW: set media type
                  } else {
                    setFetchedImageUrl('');
                    setFetchedMediaType('');
                  }
                }}
              >
                <i className="fas fa-download me-2"></i>Test Media Fetch
              </button>
            </div>
            
            {uploadStatus && (
              <div className={`alert mt-3 ${uploadStatus.includes('failed') ? 'alert-danger' : uploadStatus.includes('successful') ? 'alert-success' : 'alert-info'}`}>
                {uploadStatus}
              </div>
            )}
            
            {apiTestResult && (
              <div className="mt-4">
                <h5>API Test Results:</h5>
                <pre className={`p-3 border rounded ${typeof apiTestResult === 'string' ? 'bg-info text-white' : 
                  (apiTestResult.success ? 'bg-success text-white' : 'bg-danger text-white')}`}>
                  {typeof apiTestResult === 'string' 
                    ? apiTestResult 
                    : JSON.stringify(apiTestResult, null, 2)}
                </pre>
              </div>
            )}
              {minimalUploadResult && (
              <div className="mt-4">
                <h5>Minimal Upload Test Results:</h5>
                <pre className={`p-3 border rounded ${typeof minimalUploadResult === 'string' ? 'bg-info text-white' : 
                  (minimalUploadResult.success ? 'bg-success text-white' : 'bg-danger text-white')}`}>
                  {typeof minimalUploadResult === 'string' 
                    ? minimalUploadResult 
                    : JSON.stringify(minimalUploadResult, null, 2)}
                </pre>
              </div>
            )}
            
            {mediaFetchResult && (
              <div className="mt-4">
                <h5>Media Fetch Test Results:</h5>
                <pre className={`p-3 border rounded ${typeof mediaFetchResult === 'string' ? 'bg-info text-white' : 
                  (mediaFetchResult.success ? 'bg-success text-white' : 'bg-danger text-white')}`}>
                  {typeof mediaFetchResult === 'string' 
                    ? mediaFetchResult 
                    : JSON.stringify(mediaFetchResult, null, 2)}
                </pre>
                
                {fetchedImageUrl && (
                  <div className="mt-3">
                    <h6>Fetched Media:</h6>
                    {fetchedMediaType.startsWith('image/') ? (
                        <img
                            src={fetchedImageUrl}
                            alt="Fetched media"
                            className="img-thumbnail"
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/200?text=Error+Loading+Image';
                            }}
                        />
                    ) : fetchedMediaType.startsWith('video/') ? (
                        <video
                            controls
                            src={fetchedImageUrl}
                            style={{ maxWidth: '300px', maxHeight: '300px' }}
                            onError={(e) => {
                              console.error('Video failed to load:', e);
                            }}
                        >
                          Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="alert alert-warning">Unsupported media type: {fetchedMediaType}</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
