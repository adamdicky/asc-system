import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { User } from '../payload-types'
import { getClientSideURL } from './getURL'

import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const protectRoute = async (allowedRoles: string[]) => {
  const payload = await getPayload({config})
  const headers = await getHeaders()
  const {user} = await payload.auth({headers})

  if (!user) {
    redirect('/login')
  }

  let authorized = true
  let fallbackRoute = '/'

  if (!allowedRoles.includes(user.role)) {
    //redirect unauthorized users to their appropriate dashboard instead
    authorized = false
    if (user.role === 'admin') fallbackRoute = ('/admin/dashboard')
    else if (user.role === 'mechanic') fallbackRoute = ('/mechanic/dashboard')
    else fallbackRoute = ('/customer/appointments')
  }

  return {user, authorized, fallbackRoute}
}

export const getMeUser = async (args?: {
  nullUserRedirect?: string
  validUserRedirect?: string
}): Promise<{
  token: string
  user: User
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {}
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  const meUserReq = await fetch(`${getClientSideURL()}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  const {
    user,
  }: {
    user: User
  } = await meUserReq.json()

  if (validUserRedirect && meUserReq.ok && user) {
    redirect(validUserRedirect)
  }

  if (nullUserRedirect && (!meUserReq.ok || !user)) {
    redirect(nullUserRedirect)
  }

  // Token will exist here because if it doesn't the user will be redirected
  return {
    token: token!,
    user,
  }
}
