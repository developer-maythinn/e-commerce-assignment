import React, { useState } from 'react';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
    setMessage('');
    setIsSuccess(false);
    setIsError(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          if (event.lengthComputable) {
            setProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      });
      setMessage('File uploaded successfully');
      setIsSuccess(true);
    } catch (err) {
      setMessage('Upload failed');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="file-upload-container" sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
      <Typography variant="h6" sx={{mb: 2}}>File Upload</Typography>
      <form onSubmit={handleUpload}>
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mb: 2 }}
        >
          Choose File
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {file && (
          <div style={{ marginBottom: 8, textAlign: 'center' }}>
            Selected file: <strong>{file.name}</strong>
          </div>
        )}
        {console.log(file)}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading || !file}
        >
          Upload
        </Button>
      </form>
      {isLoading && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <div style={{ textAlign: 'center', marginTop: 8 }}>{progress}%</div>
        </Box>
      )}
      {isSuccess && <div style={{ color: 'green', marginTop: 8 }}>File uploaded successfully</div>}
      {isError && <div style={{ color: 'red', marginTop: 8 }}>Upload failed</div>}
    </Box>
  );
};

export default FileUpload;
