'use client'

import React from 'react'
import { CustomerNavbar } from '@/components/ascCustomerBar'
import { CustomerProfileForm } from '@/components/ascCustomerProfile'

export default function CustomerProfilePage() {
  return (
    <div className="min-h-screen bg-muted/10 pb-10">
      <CustomerNavbar />
      <main className="container max-w-4xl mx-auto py-8 px-4 space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and personal information.</p>
        </header>

        {/* Profile Component */}
        <CustomerProfileForm />
      </main>
    </div>
  )
}