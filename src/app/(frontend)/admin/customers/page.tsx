'use client'

import React from 'react'
import { AdminNavbar } from '@/components/ascAdminBar'
import { CustomerList } from '@/components/ascCustomerList'
import { customersData } from '@/components/ascCustomerList/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, GraduationCap, Briefcase, Car } from 'lucide-react'

export default function CustomerRegistryPage() {
  const totalUsers = customersData.length
  
  // Logic: Identify staff/student based on matric_staff_id prefix
  const staffCount = customersData.filter(c => c.matric_staff_id.startsWith('UTM')).length
  const studentCount = customersData.filter(c => c.matric_staff_id.startsWith('A22')).length
  
  const totalVehicles = customersData.reduce((acc, curr) => acc + curr.vehicles.length, 0)

  return (
    <div className="min-h-screen bg-muted/20 pb-10">
      <AdminNavbar />
      <main className="container py-8 space-y-8 px-4 sm:px-8">
        
        {/* Header */}
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Customer Registry</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Manage user profiles and view vehicle information.
          </p>
        </header>

        {/* Analytics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered in System</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">UTM Staff</CardTitle>
              <Briefcase className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{staffCount}</div>
              <p className="text-xs text-muted-foreground">{Math.round((staffCount/totalUsers)*100)}% of user base</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">UTM Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentCount}</div>
              <p className="text-xs text-muted-foreground">{Math.round((studentCount/totalUsers)*100)}% of user base</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              <Car className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVehicles}</div>
              <p className="text-xs text-muted-foreground">Associated with accounts</p>
            </CardContent>
          </Card>
        </div>

        {/* Customer List Component */}
        <CustomerList data={customersData} />
      </main>
    </div>
  )
}