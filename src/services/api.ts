import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, Role, Resource, Permission, LoginCredentials, RegisterCredentials } from '../types';

export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${import.meta.env.VITE_API_URL}/`, // Use Vite's env variable
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Role', 'Resource', 'Permission'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<{ user: User; token: string }, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<{ user: User; token: string }, RegisterCredentials>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Role endpoints
    getRoles: builder.query<Role[], void>({
      query: () => '/roles',
      providesTags: ['Role'],
    }),
    createRole: builder.mutation<Role, Partial<Role>>({
      query: (role) => ({
        url: '/roles',
        method: 'POST',
        body: role,
      }),
      invalidatesTags: ['Role'],
    }),
    
    // Resource endpoints
    getResources: builder.query<Resource[], void>({
      query: () => '/resources',
      providesTags: ['Resource'],
    }),
    createResource: builder.mutation<Resource, Partial<Resource>>({
      query: (resource) => ({
        url: '/resources',
        method: 'POST',
        body: resource,
      }),
      invalidatesTags: ['Resource'],
    }),
    
    // Permission endpoints
    getPermissions: builder.query<Permission[], void>({
      query: () => '/permissions',
      providesTags: ['Permission'],
    }),
    updatePermission: builder.mutation<Permission, Partial<Permission>>({
      query: (permission) => ({
        url: `/roles/permissions`,
        method: 'PUT',
        body: permission,
      }),
      invalidatesTags: ['Permission'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetRolesQuery,
  useCreateRoleMutation,
  useGetResourcesQuery,
  useCreateResourceMutation,
  useGetPermissionsQuery,
  useUpdatePermissionMutation,
} = api;
