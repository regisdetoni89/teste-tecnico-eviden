import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, isToday, isPast } from 'date-fns';
import { Bookmark } from '../types';

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onDelete: (id: number) => void;
  loading: boolean;
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, onDelete, loading }) => {
  const getFaviconUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          bgcolor: 'background.paper',
          color: 'text.secondary',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography variant="h6">
          No bookmarks yet. Add your first bookmark!
        </Typography>
      </Paper>
    );
  }

  const getBackgroundColor = (date: Date) => {
    if (isToday(date)) {
      return 'rgba(76, 175, 80, 0.15)'; // Light green
    }
    if (isPast(date)) {
      return 'rgba(244, 67, 54, 0.15)'; // Light red
    }
    return 'background.paper';
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        bgcolor: 'background.paper',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        '& .MuiListItem-root': {
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          '&:last-child': {
            borderBottom: 'none',
          },
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            transition: 'background-color 0.3s ease',
          },
        },
      }}
    >
      <List>
        {bookmarks.map((bookmark) => {
          const bookmarkDate = new Date(bookmark.remember_date);
          const isCurrentDate = isToday(bookmarkDate);
          const faviconUrl = getFaviconUrl(bookmark.url);
          
          return (
            <ListItem
              key={bookmark.id}
              sx={{
                bgcolor: getBackgroundColor(bookmarkDate),
                transition: 'background-color 0.3s ease',
              }}
            >
              {faviconUrl && (
                <Typography
                  component="a"
                  href={bookmark.url}
                  target="_blank"
                >
                  <Avatar
                    src={faviconUrl}
                    sx={{
                      width: 32,
                      height: 32,
                      mr: 2,
                      border: '2px solid rgba(0, 0, 0, 0.1)',
                      bgcolor: 'transparent',
                    }}
                  />
                </Typography>
              )}
              <ListItemText
                primary={
                  <Typography
                    component="a"
                    href={bookmark.url}
                    target="_blank"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                        textShadow: '0 0 10px rgba(144, 202, 249, 0.3)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {bookmark.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Remember Date: {format(bookmarkDate, 'PPP')}
                    {isCurrentDate && ' (Today)'}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(bookmark.id)}
                  sx={{
                    color: 'error.main',
                    '&:hover': {
                      color: 'error.light',
                      bgcolor: 'rgba(244, 67, 54, 0.1)',
                      boxShadow: '0 0 10px rgba(244, 67, 54, 0.3)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default BookmarkList; 