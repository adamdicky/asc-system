import { CollectionConfig } from 'payload'

export const Parts: CollectionConfig = {
  slug: 'parts',
  admin: {
    useAsTitle: 'partName',
    defaultColumns: ['partName', 'partNumber', 'stock', 'price'],
  },
  fields: [
    {
      name: 'partName',
      type: 'text',
      required: true,
    },
    {
      name: 'partNumber',
      type: 'text',
      unique: true,
      admin: {
        description: 'SKU or Manufacturer Part Number',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      type: 'row', // Horizontal layout in admin UI
      fields: [
        {
          name: 'price',
          label: 'Selling Price (RM)',
          type: 'number',
          required: true,
        },
        {
          name: 'cost',
          label: 'Purchase Cost (RM)',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'stock',
          type: 'number',
          defaultValue: 0,
          required: true,
        },
        {
          name: 'minStock',
          label: 'Minimum Stock Alert Level',
          type: 'number',
          defaultValue: 5,
          required: true,
        },
      ],
    },
  ],
}