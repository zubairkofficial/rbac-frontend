export interface User {
  id: string;
  email: string;
  name: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
}

export interface Resource {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Permission {
  id: number;
  roleId?: string;
  name: string;
  description: string;
  action: 'create' | 'read' | 'update' | 'delete';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  resource: Resource;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface CreateRoleData {
  name: string;
  description: string;
}

export interface CreateResourceData {
  name: string;
  description: string;
  type: string;
}

export interface UpdatePermissionData {
  id: string;
  canCreate?: boolean;
  canRead?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
}

export interface RolePermission {
  roleId: string;
  permissions: {
    [resourceId: number]: {
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
    };
  };
} 