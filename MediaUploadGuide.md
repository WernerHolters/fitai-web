# Image Upload Functionality Guide for FitAI

This guide explains how the image upload functionality works in the FitAI application, and provides troubleshooting steps.

## Architecture Overview

1. **Frontend Flow**:
   - User selects an image in a form (ExerciseForm, PlanTypeForm, etc.)
   - Form saves the entity data to the backend
   - After successful entity save, it uploads the image associated with that entity

2. **Backend Storage**:
   - Images are stored in MongoDB GridFS
   - Each image is associated with an entity type and entity ID

## How to Use Image Upload

1. When creating a new entity:
   - Fill out the entity form
   - Select an image using the file input
   - Save the entity - the image will be automatically uploaded

2. When editing an existing entity:
   - The existing image will be displayed in the form
   - You can keep the existing image or select a new one
   - Save the entity - any new image will be uploaded

## Troubleshooting

### Common Issues

1. **Image Not Uploading**:
   - Check browser console for errors
   - Verify that you have the correct entity ID
   - Make sure the backend server is running and accessible

2. **Image Not Displaying**:
   - Verify that the image was successfully uploaded
   - Check if the entity has the `hasImage` flag set to true
   - Check if the backend is correctly serving the image

### Diagnostic Tools

Use the **Image Upload Test** page to diagnose issues:

1. **API Connectivity Test**:
   - Verifies connectivity to the backend API
   - Tests CORS configuration

2. **File Upload Test**:
   - Sends a minimal test file to the backend
   - Validates the upload endpoint functionality

3. **Media Fetch Test**:
   - Attempts to retrieve a previously uploaded image
   - Validates that images are being served correctly

## Technical Details

### URL Structure

- Upload URL: `http://localhost:8080/api/media/upload/{entityType}/{entityId}`
- Stream URL: `http://localhost:8080/api/media/stream/{entityType}/{entityId}`

### Entity Type Mapping

The following entity types are supported:
- `exercise` - Exercise images
- `workout-plan` - Workout plan images
- `muscle-group` - Muscle group images
- `plan-type` - Plan type images
- `recipe` - Recipe images
- `dish` - Dish images

### Frontend Services

- `MediaService.js` - Handles image uploads and URL generation
- `ExerciseService.js`, etc. - Handle entity CRUD operations

## Recent Improvements

1. **Enhanced Error Handling**:
   - More detailed error messages
   - Multiple upload strategies
   - File validation before upload

2. **Better Image Display**:
   - Fallback images when load fails
   - Image preview in forms
   - Improved UI for image management

3. **Diagnostic Tools**:
   - Comprehensive API testing
   - Media fetch validation
   - Detailed console logging
