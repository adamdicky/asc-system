import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'serviceName',
  },
  fields: [
    {
      name: 'serviceName',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'basePrice',
      label: 'Standard Labor Charge (RM)',
      type: 'number',
      required: true,
    },
    {
      name: 'estimatedDuration',
      label: 'Estimated Duration (Minutes)',
      type: 'number',
      admin: {
        placeholder: 'e.g. 60',
      },
    },
  ],
}