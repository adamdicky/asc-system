import React from 'react'
import { AdminNavbar } from '@/components/ascAdminBar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AppointmentList } from '@/components/ascAppointmentList'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted/20">
      <AdminNavbar />
      <main className="container py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back, Admin. Here is the operational status for today.
          </p>
        </header>

        {/* Dashboard Metrics (US004 Visualization) */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">12</div>
              <p className="text-xs text-muted-foreground">+2 since 9:00 AM</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ongoing Job Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">5</div>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">Spare parts below 10 units</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">RM 1,240.00</div>
              <p className="text-xs text-muted-foreground">Today's billing</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 pt-8">
          <AppointmentList />
        </div>
      </main>
    </div>
  )
}