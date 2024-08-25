import React, { useState } from 'react';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [processedVideo, setProcessedVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleProcessVideo = async () => {
    if (!videoFile) {
      alert('Please upload a video file first.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', videoFile);

    try {
      const response = await fetch('http://localhost:8000/process-video/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setProcessedVideo(url);
      } else {
        alert('Failed to process video.');
      }
    } catch (error) {
      console.error('Error processing video:', error);
      alert('An error occurred while processing the video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Video Captioning App</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleProcessVideo} disabled={loading}>
        {loading ? 'Processing...' : 'Process Video'}
      </button>
      {processedVideo && (
        <div>
          <h2>Processed Video</h2>
          <video controls src={processedVideo} width="600" />
        </div>
      )}
    </div>
  );
}

export default App;