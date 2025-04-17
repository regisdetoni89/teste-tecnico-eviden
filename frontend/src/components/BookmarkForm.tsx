import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import { BookmarkFormData } from '../types';

interface BookmarkFormProps {
  onSubmit: (data: BookmarkFormData) => void;
}

const BookmarkForm: React.FC<BookmarkFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BookmarkFormData>({
    title: '',
    url: '',
    remember_date: new Date().toISOString().split('T')[0],
  });
  const [urlError, setUrlError] = useState<string>('');

  const validateUrl = (url: string): boolean => {
    // URL regex pattern
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    
    // Check if URL matches the pattern
    if (!urlPattern.test(url)) {
      return false;
    }

    // If URL doesn't have a protocol, add https:// for testing
    const urlToTest = url.startsWith('http') ? url : `https://${url}`;
    
    try {
      new URL(urlToTest);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUrl(formData.url)) {
      setUrlError('Please enter a valid URL (e.g., example.com or https://example.com)');
      return;
    }

    onSubmit(formData);
    setFormData({
      title: '',
      url: '',
      remember_date: new Date().toISOString().split('T')[0],
    });
    setUrlError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'url') {
      setUrlError(validateUrl(value) ? '' : 'Please enter a valid URL (e.g., example.com or https://example.com)');
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3,
        bgcolor: 'background.paper',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        '& .MuiTextField-root': {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
            '& input': {
              color: 'text.primary',
            },
            '& label': {
              color: 'text.secondary',
            },
          },
          '& .MuiFormHelperText-root': {
            color: 'error.main',
          },
        },
      }}
    >
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          color: 'primary.main',
          textShadow: '0 0 10px rgba(144, 202, 249, 0.2)',
          mb: 3,
        }}
      >
        Add New Bookmark
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="URL"
          name="url"
          value={formData.url}
          onChange={handleChange}
          margin="normal"
          required
          error={!!urlError}
          helperText={urlError}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Remember Date"
          name="remember_date"
          type="date"
          value={formData.remember_date}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 3 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!!urlError}
          sx={{
            py: 1.5,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
              boxShadow: '0 0 15px rgba(144, 202, 249, 0.3)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Add Bookmark
        </Button>
      </Box>
    </Paper>
  );
};

export default BookmarkForm; 