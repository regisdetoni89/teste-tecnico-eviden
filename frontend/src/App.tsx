import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CssBaseline,
  ThemeProvider,
  useTheme
} from '@mui/material';
import BookmarkList from './components/BookmarkList';
import BookmarkForm from './components/BookmarkForm';
import { Bookmark } from './types';
import axios from 'axios';


function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/bookmarks');
      setBookmarks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bookmarks');
      console.error('Error fetching bookmarks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleAddBookmark = async (bookmarkData: Omit<Bookmark, 'id'>) => {
    try {
      setLoading(true);
      bookmarkData.url = bookmarkData.url.startsWith('http') ? bookmarkData.url : `https://${bookmarkData.url}`;
      await axios.post('http://localhost:8000/bookmark', bookmarkData);
      await fetchBookmarks();
      setError(null);
    } catch (err) {
      setError('Failed to add bookmark');
      console.error('Error adding bookmark:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBookmark = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/bookmark/${id}`);
      await fetchBookmarks();
      setError(null);
    } catch (err) {
      setError('Failed to delete bookmark');
      console.error('Error deleting bookmark:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
        background: 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)',
      }}>
        <Container maxWidth="lg">
          
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ width: { xs: '100%', md: '33%' } }}>
              <BookmarkForm onSubmit={handleAddBookmark} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '66%' }, position: 'relative' }}>
              <BookmarkList 
                bookmarks={bookmarks} 
                onDelete={handleDeleteBookmark}
                loading={loading}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
