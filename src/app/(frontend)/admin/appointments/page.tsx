'use client'

import React, { useState } from 'react'
import { AdminNavbar } from '@/components/ascAdminBar'
import { Calendar } from '@/components/ui/calendar'
import { AppointmentList } from '@/components/ascAppointmentList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const initialAppointments = [
  { id: 1, customer: 'Ahmad bin Ali', plate: 'VCE 1234', brand: 'Proton', model: 'Saga', date: '2025-12-28T09:00:00', status: 'New' },
  { id: 2, customer: 'Sarah Johnson', plate: 'WXC 5678', brand: 'Honda', model: 'Civic', date: '2025-12-28T14:30:00', status: 'In Progress' },
  { id: 3, customer: 'John Doe', plate: 'ABC 9999', brand: 'Perodua', model: 'Myvi', date: '2025-12-29T10:00:00', status: 'Accepted' },
  { id: 4, customer: 'Fatimah Zakaria', plate: 'KAA 1122', brand: 'Toyota', model: 'Vios', date: '2025-12-27T11:00:00', status: 'Cancelled' },
  { id: 5, customer: 'Lim Guan Eng', plate: 'PBB 8888', brand: 'BMW', model: '3 Series', date: '2025-12-30T16:00:00', status: 'New' },
  { id: 6, customer: 'Siti Nurhaliza', plate: 'VAF 4321', brand: 'Proton', model: 'X50', date: '2025-12-31T08:30:00', status: 'Accepted' },
  { id: 7, customer: 'Ramasamy Govind', plate: 'ND 7766', brand: 'Nissan', model: 'Almera', date: '2026-01-02T14:00:00', status: 'New' },
  { id: 8, customer: 'Chong Wei', plate: 'WWD 1', brand: 'Mercedes', model: 'C200', date: '2026-01-02T15:30:00', status: 'In Progress' },
  { id: 9, customer: 'Nurul Izzah', plate: 'BEB 5544', brand: 'Perodua', model: 'Axia', date: '2025-12-26T09:45:00', status: 'Cancelled' },
  { id: 10, customer: 'Kevin Tan', plate: 'QM 8899', brand: 'Mazda', model: 'CX-5', date: '2026-01-03T11:20:00', status: 'New' },
  { id: 11, customer: 'Zul Ariffin', plate: 'VGG 202', brand: 'Ford', model: 'Ranger', date: '2026-01-04T10:00:00', status: 'Accepted' },
  { id: 12, customer: 'Mei Ling', plate: 'JKR 33', brand: 'Honda', model: 'City', date: '2025-12-25T13:00:00', status: 'Accepted' },
  { id: 13, customer: 'Haris Ismail', plate: 'WTP 909', brand: 'Toyota', model: 'Hilux', date: '2026-01-05T09:00:00', status: 'New' },
  { id: 14, customer: 'Aisha Rahman', plate: 'KV 456', brand: 'Mitsubishi', model: 'Xpander', date: '2026-01-05T15:00:00', status: 'In Progress' },
  { id: 15, customer: 'Tan Sri Azman', plate: 'UTM 1', brand: 'Mercedes', model: 'S-Class', date: '2026-01-06T08:00:00', status: 'Accepted' },
  { id: 16, customer: 'Muthu Kumaran', plate: 'BCC 7788', brand: 'Proton', model: 'Persona', date: '2025-12-24T11:30:00', status: 'Cancelled' },
  { id: 17, customer: 'Farah Quinn', plate: 'SAP 2025', brand: 'Hyundai', model: 'Ioniq 5', date: '2026-01-07T10:30:00', status: 'New' },
  { id: 18, customer: 'Lee Zii Jia', plate: 'LZJ 99', brand: 'Kia', model: 'EV6', date: '2026-01-08T14:00:00', status: 'Accepted' },
  { id: 19, customer: 'Nordin Ahmad', plate: 'WRA 3210', brand: 'Perodua', model: 'Bezza', date: '2026-01-09T09:15:00', status: 'In Progress' },
  { id: 20, customer: 'Jessica Lim', plate: 'VCF 8080', brand: 'Volkswagen', model: 'Golf', date: '2026-01-10T16:45:00', status: 'New' },
]

export default function AppointmentManagementPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)

  // Logic to find which dates have appointments for the "circle color" indicators
  const appointmentDates = initialAppointments.map(a => new Date(a.date).toDateString())

  // Filter logic: show ALL if no date selected, otherwise filter by date
  const filteredData = date 
    ? initialAppointments.filter(a => new Date(a.date).toDateString() === date.toDateString())
    : initialAppointments

  return (
    <div className="min-h-screen bg-muted/20 pb-10">
      <AdminNavbar />
      <main className="container py-8 space-y-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Appointment Bookings</h1>
          <p className="text-muted-foreground text-sm">Welcome back, admin. Manage and review upcoming service appointments across the facility.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Calendar Section (Left) */}
          <Card className="lg:col-span-4 shadow-md">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">Service Calendar</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col items-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border-none"
                modifiers={{
                  hasAppointment: (d) => appointmentDates.includes(d.toDateString())
                }}
                modifiersStyles={{
                  hasAppointment: { 
                    fontWeight: 'bold', 
                    textDecoration: 'underline',
                    color: 'hsl(var(--primary))'
                  }
                }}
              />
              {date && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-4 text-xs" 
                  onClick={() => setDate(undefined)}
                >
                  Clear Selection (Show All)
                </Button>
              )}
            </CardContent>
          </Card>

          {/* List Section (Right/Bottom) */}
          <div className="lg:col-span-8">
            <AppointmentList 
              data={filteredData} 
              title={date ? `Appointments for ${date.toLocaleDateString('en-GB')}` : "All Scheduled Appointments"} 
            />
          </div>
        </div>
      </main>
    </div>
  )
}