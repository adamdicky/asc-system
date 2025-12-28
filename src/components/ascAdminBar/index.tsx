'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react' // Use lucide-react for icons

const navLinks = [
  { name: 'Customer Registry', href: '/admin/customer-registry' },
  { name: 'Appointment Bookings', href: '/admin/appointments' },
  { name: 'Job Cards', href: '/admin/jobcards' },
  { name: 'Billing', href: '/admin/billings' },
  { name: 'Analytics', href: '/admin/analytics' },
]

export const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Left: Logo */}
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
          {/* <span className="hidden font-bold sm:inline-block">Admin Panel</span> */}
        </Link>

        {/* Right: Desktop Navigation */}
        <div className="hidden md:flex md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}