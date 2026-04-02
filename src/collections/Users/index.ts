import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { anyone } from '@/access/anyone'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: {user} }) => user?.role === 'admin',
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },

  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },

  auth: {
    verify: true,
  }, //Automatically provisions email and password

  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'customer',
      access: {
        create: ({req: {user}}) => user?.role === 'admin',
        update: ({req: {user}}) => user?.role === 'admin',
      }, //Technical guard to prevent non admins from choosing role during creation
      options: [
        {label: 'Admin', value: 'admin'},
        {label: 'Mechanic', value: 'mechanic'},
        {label: 'Customer', value: 'customer'},
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'Phone Number',
      type: 'text',
      required: true,
    },

     // -- admin specific fields --

    {
      name: 'Admin ID',
      type: 'textarea',
      admin: {
        condition: (data) => data.role === 'admin',
      },
    },
    {
      name: 'Admin Work ID',
      type: 'textarea',
      admin: {
        condition: (data) => data.role === 'admin'
      },
    },

    // -- customer specific fields --

    {
      name: 'Customer ID',
      type: 'textarea',
      admin: {
        condition: (data) => data.role === 'customer',
      },
    },
    {
      name: 'Matric or Staff ID',
      type: 'textarea',
      admin: {
        condition: (data) => data.role === 'customer',
      },
    },

    // -- mechanic specific fields --

    {
      name: 'Mechanic ID',
      type: 'textarea',
      admin: {
        condition: (data) => data.role === 'mechanic',
      },
    },
    {
      name: 'Mechanic Work ID',
      type: 'textarea',
      admin: {
        condition: (data) => data.role === 'mechanic'
      },
    },
  ],
  timestamps: true,
}
