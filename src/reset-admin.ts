import { getPayload } from 'payload'
import config from './payload.config'

const reset = async () => {
  const payload = await getPayload({ config })
  await payload.update({
    collection: 'users',
    where: { email: { equals: 'ascadmin@gmail.com' } },
    data: {
      password: 'NewSecurePassword123!',
      role: 'admin', // Ensure you have the admin role we just defined
    },
  })
  console.log('Admin account updated!')
  process.exit(0)
}

reset()