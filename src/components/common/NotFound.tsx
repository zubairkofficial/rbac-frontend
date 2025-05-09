import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 4,
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: 120,
            color: 'primary.main',
            mb: 2,
          }}
        />
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '3rem', md: '5rem' },
            fontWeight: 'bold',
            mb: 2,
            color: 'primary.main',
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 3,
            color: 'text.secondary',
          }}
        >
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            maxWidth: '600px',
            color: 'text.secondary',
          }}
        >
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(-1)}
            sx={{ minWidth: '200px' }}
          >
            Go Back
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/')}
            sx={{ minWidth: '200px' }}
          >
            Go to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound; 