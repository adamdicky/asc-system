import React from 'react'
import { getMeUser } from '@/utilities/getMeUser'
import LoginForm from './LoginForm'

export default async function LoginPage() {
  // if a user has a valid Payload token, redirect them to their dashboard
  // this utilizes the existing utility's validUserRedirect parameter

  await getMeUser({
    validUserRedirect: '/admin',
  })

  // if no valid session, render cleint side login form
  return <LoginForm/>
}