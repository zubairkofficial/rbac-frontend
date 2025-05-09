import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useGetRolesQuery, useGetResourcesQuery, useGetPermissionsQuery } from '../../services/api';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: roles = [] } = useGetRolesQuery();
  const { data: resources = [] } = useGetResourcesQuery();
  const { data: permissions = [] } = useGetPermissionsQuery();

  const userRole = roles.find(role => role.id === user?.roleId);
  const userPermissions = permissions.filter(permission => permission.roleId === user?.roleId);

  const stats = [
    {
      title: 'Total Roles',
      value: roles.length,
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Total Resources',
      value: resources.length,
      icon: <SettingsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Your Permissions',
      value: userPermissions.length,
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Role: {userRole?.name || 'No Role Assigned'}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {stat.icon}
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {stat.title}
                </Typography>
              </Box>
              <Typography variant="h4" component="div">
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Your Permissions" />
            <Divider />
            <CardContent>
              <List>
                {userPermissions.map((permission) => {
                  const resource = resources.find(r => r.id === permission.resourceId);
                  return (
                    <ListItem key={permission.id} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <SecurityIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={resource?.name || 'Unknown Resource'}
                          secondary={`Can ${permission.canCreate ? 'Create' : ''} ${
                            permission.canRead ? 'Read' : ''
                          } ${permission.canUpdate ? 'Update' : ''} ${
                            permission.canDelete ? 'Delete' : ''
                          }`}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Quick Actions" />
            <Divider />
            <CardContent>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="View All Resources" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage Roles" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="System Settings" />
                  </ListItemButton>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 