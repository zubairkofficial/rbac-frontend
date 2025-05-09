import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
} from '@mui/material';
import { useGetPermissionsQuery, useUpdatePermissionMutation } from '../../services/api';
import { useGetRolesQuery } from '../../services/api';
import { Permission } from '../../types';

const PermissionManagement: React.FC = () => {
  const { data: allPermissions = [], isLoading } = useGetPermissionsQuery();
  const { data: roles = [],refetch: refetchRoles } = useGetRolesQuery();
  const [updatePermission] = useUpdatePermissionMutation();
  const [selectedRole, setSelectedRole] = useState<string>('');

  // Get selected role's permissions
  const selectedRolePermissions = useMemo(() => {
    if (!selectedRole) return [];
    const role = roles.find(r => r.id === selectedRole);
    return role?.permissions || [];
  }, [roles, selectedRole]);

  // Group all permissions by resource
  const permissionsByResource = useMemo(() => {
    const grouped = allPermissions.reduce((acc, permission) => {
      const resourceId = permission.resource.id;
      if (!acc[resourceId]) {
        acc[resourceId] = {
          resource: permission.resource,
          permissions: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        };
      }
      // Check if this permission exists in selected role's permissions
      const hasPermission = selectedRolePermissions.some(
        p => p.resource.id === resourceId && p.action === permission.action
      );
      acc[resourceId].permissions[permission.action] = hasPermission;
      return acc;
    }, {} as Record<number, { resource: Permission['resource']; permissions: Record<string, boolean> }>);

    return Object.values(grouped);
  }, [allPermissions, selectedRolePermissions]);

  const handlePermissionChange = async (
    resourceId: number,
    action: string,
    value: boolean
  ) => {
    try {
      const permission = allPermissions.find(
        p => p.resource.id === resourceId && p.action === action
      );
      if (permission) {
        await updatePermission({
          id: permission.id,
          isActive: value,
          roleId: selectedRole
        }).unwrap();
        refetchRoles();
      }
    } catch (error) {
      console.error('Failed to update permission:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Permission Management</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            label="Select Role"
          >
            <MenuItem value="">Select a role</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {!selectedRole && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Please select a role to manage its permissions
        </Alert>
      )}

      {selectedRole && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Resource</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Create</TableCell>
                <TableCell>Read</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6}>Loading...</TableCell>
                </TableRow>
              ) : (
                permissionsByResource.map(({ resource, permissions }) => (
                  <TableRow key={resource.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>{resource.name}</Typography>
                        <Chip
                          label={resource.isActive ? 'Active' : 'Inactive'}
                          color={resource.isActive ? 'success' : 'default'}
                          size="small"
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{resource.description}</TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={permissions.create}
                            onChange={(e) =>
                              handlePermissionChange(
                                resource.id,
                                'create',
                                e.target.checked
                              )
                            }
                          />
                        }
                        label=""
                      />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={permissions.read}
                            onChange={(e) =>
                              handlePermissionChange(
                                resource.id,
                                'read',
                                e.target.checked
                              )
                            }
                          />
                        }
                        label=""
                      />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={permissions.update}
                            onChange={(e) =>
                              handlePermissionChange(
                                resource.id,
                                'update',
                                e.target.checked
                              )
                            }
                          />
                        }
                        label=""
                      />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={permissions.delete}
                            onChange={(e) =>
                              handlePermissionChange(
                                resource.id,
                                'delete',
                                e.target.checked
                              )
                            }
                          />
                        }
                        label=""
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default PermissionManagement; 