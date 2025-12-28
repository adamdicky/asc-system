'use client'

import React, { useState } from 'react'
import { AdminNavbar } from '@/components/ascAdminBar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { JobCardList, JobCardData } from '@/components/ascJobCardList'
import { JobCardForm } from '@/components/ascJobCardForm'
import { ClipboardList, Clock, CheckCircle2 } from 'lucide-react'

// Mock Data based on your requirements
const mockJobCards: JobCardData[] = [
  { id: '1', job_card_id: 'JC-2025-001', customer_name: 'Ahmad Ali', phone_no: '012-3456789', date_in: '2025-12-28T09:00:00', time_in: '09:00 AM', plate_no: 'VCE 1234', brand: 'Proton', model: 'Saga', mileage: 45000, customer_points: ['Engine check'], service_advisor_remark: 'Worn pads', status: 'Pending' },
  { id: '2', job_card_id: 'JC-2025-002', customer_name: 'Sarah Johnson', phone_no: '017-8889999', date_in: '2025-12-28T10:30:00', time_in: '10:30 AM', plate_no: 'WXC 5678', brand: 'Honda', model: 'Civic', mileage: 12000, customer_points: ['AC filter'], service_advisor_remark: 'Low refrigerant', status: 'In Progress' },
  { id: '3', job_card_id: 'JC-2025-003', customer_name: 'John Doe', phone_no: '019-1112222', date_in: '2025-12-27T14:00:00', time_in: '02:00 PM', plate_no: 'ABC 9999', brand: 'Perodua', model: 'Myvi', mileage: 80000, customer_points: ['80k Service'], service_advisor_remark: 'Completed', status: 'Completed' },
  { id: '4', job_card_id: 'JC-2025-004', customer_name: 'Fatimah Zakaria', plate_no: 'KAA 1122', brand: 'Toyota', model: 'Vios', date_in: '2025-12-26T11:00:00', status: 'Pending', phone_no: '011-2223334', time_in: '11:00 AM', mileage: 34000, customer_points: ['Oil leak'], service_advisor_remark: 'Gasket replacement needed' },
  { id: '5', job_card_id: 'JC-2025-005', customer_name: 'Lim Guan Eng', plate_no: 'PBB 8888', brand: 'BMW', model: '3 Series', date_in: '2025-12-30T16:00:00', status: 'In Progress', phone_no: '012-4445556', time_in: '04:00 PM', mileage: 56000, customer_points: ['Brake noise'], service_advisor_remark: 'Rotor skimming' },
  { id: '6', job_card_id: 'JC-2025-006', customer_name: 'Siti Nurhaliza', plate_no: 'VAF 4321', brand: 'Proton', model: 'X50', date_in: '2025-12-31T08:30:00', status: 'Completed', phone_no: '013-5556667', time_in: '08:30 AM', mileage: 5000, customer_points: ['First service'], service_advisor_remark: 'Fluid top-up only' },
  { id: '7', job_card_id: 'JC-2025-007', customer_name: 'Ramasamy Govind', plate_no: 'ND 7766', brand: 'Nissan', model: 'Almera', date_in: '2026-01-02T14:00:00', status: 'Pending', phone_no: '014-6667778', time_in: '02:00 PM', mileage: 23000, customer_points: ['Battery weak'], service_advisor_remark: 'Test battery health' },
  { id: '8', job_card_id: 'JC-2025-008', customer_name: 'Chong Wei', plate_no: 'WWD 1', brand: 'Mercedes', model: 'C200', date_in: '2026-01-02T15:30:00', status: 'In Progress', phone_no: '015-7778889', time_in: '03:30 PM', mileage: 15000, customer_points: ['Software update'], service_advisor_remark: 'Updating MBUX system' },
  { id: '9', job_card_id: 'JC-2025-009', customer_name: 'Nurul Izzah', plate_no: 'BEB 5544', brand: 'Perodua', model: 'Axia', date_in: '2025-12-26T09:45:00', status: 'Completed', phone_no: '016-8889990', time_in: '09:45 AM', mileage: 12000, customer_points: ['Flat tire'], service_advisor_remark: 'Tire replaced' },
  { id: '10', job_card_id: 'JC-2025-010', customer_name: 'Kevin Tan', plate_no: 'QM 8899', brand: 'Mazda', model: 'CX-5', date_in: '2026-01-03T11:20:00', status: 'Pending', phone_no: '017-9990001', time_in: '11:20 AM', mileage: 45000, customer_points: ['Suspension noise'], service_advisor_remark: 'Inspect struts' },
  { id: '11', job_card_id: 'JC-2025-011', customer_name: 'Zul Ariffin', plate_no: 'VGG 202', brand: 'Ford', model: 'Ranger', date_in: '2026-01-04T10:00:00', status: 'In Progress', phone_no: '018-0001112', time_in: '10:00 AM', mileage: 67000, customer_points: ['Wiper blade replacement'], service_advisor_remark: 'Ordered parts' },
  { id: '12', job_card_id: 'JC-2025-012', customer_name: 'Mei Ling', plate_no: 'JKR 33', brand: 'Honda', model: 'City', date_in: '2025-12-25T13:00:00', status: 'Completed', phone_no: '019-1112223', time_in: '01:00 PM', mileage: 22000, customer_points: ['Rear sensor fix'], service_advisor_remark: 'Wiring repaired' },
  { id: '13', job_card_id: 'JC-2025-013', customer_name: 'Haris Ismail', plate_no: 'WTP 909', brand: 'Toyota', model: 'Hilux', date_in: '2026-01-05T09:00:00', status: 'Pending', phone_no: '010-2223334', time_in: '09:00 AM', mileage: 100000, customer_points: ['Timing belt change'], service_advisor_remark: 'Major component replacement' },
  { id: '14', job_card_id: 'JC-2025-014', customer_name: 'Aisha Rahman', plate_no: 'KV 456', brand: 'Mitsubishi', model: 'Xpander', date_in: '2026-01-05T15:00:00', status: 'In Progress', phone_no: '011-3334445', time_in: '03:00 PM', mileage: 8000, customer_points: ['Odd smell'], service_advisor_remark: 'Deodorizing treatment' },
  { id: '15', job_card_id: 'JC-2025-015', customer_name: 'Tan Sri Azman', plate_no: 'UTM 1', brand: 'Mercedes', model: 'S-Class', date_in: '2026-01-06T08:00:00', status: 'Completed', phone_no: '012-4445556', time_in: '08:00 AM', mileage: 30000, customer_points: ['Key battery low'], service_advisor_remark: 'Replaced' },
  { id: '16', job_card_id: 'JC-2025-016', customer_name: 'Muthu Kumaran', plate_no: 'BCC 7788', brand: 'Proton', model: 'Persona', date_in: '2025-12-24T11:30:00', status: 'Pending', phone_no: '013-5556667', time_in: '11:30 AM', mileage: 45000, customer_points: ['Clutch slipping'], service_advisor_remark: 'Clutch kit replacement quote' },
  { id: '17', job_card_id: 'JC-2025-017', customer_name: 'Farah Quinn', plate_no: 'SAP 2025', brand: 'Hyundai', model: 'Ioniq 5', date_in: '2026-01-07T10:30:00', status: 'In Progress', phone_no: '014-6667778', time_in: '10:30 AM', mileage: 1500, customer_points: ['Charging issue'], service_advisor_remark: 'Testing ICCU' },
  { id: '18', job_card_id: 'JC-2025-018', customer_name: 'Lee Zii Jia', plate_no: 'LZJ 99', brand: 'Kia', model: 'EV6', date_in: '2026-01-08T14:00:00', status: 'Completed', phone_no: '015-7778889', time_in: '02:00 PM', mileage: 5000, customer_points: ['Tire pressure sensor'], service_advisor_remark: 'Recalibrated' },
  { id: '19', job_card_id: 'JC-2025-019', customer_name: 'Nordin Ahmad', plate_no: 'WRA 3210', brand: 'Perodua', model: 'Bezza', date_in: '2026-01-09T09:15:00', status: 'In Progress', phone_no: '016-8889990', time_in: '09:15 AM', mileage: 44000, customer_points: ['Windshield crack'], service_advisor_remark: 'Glass repair in progress' },
  { id: '20', job_card_id: 'JC-2025-020', customer_name: 'Jessica Lim', plate_no: 'VCF 8080', brand: 'Volkswagen', model: 'Golf', date_in: '2026-01-10T16:45:00', status: 'Pending', phone_no: '017-9990001', time_in: '04:45 PM', mileage: 25000, customer_points: ['DSG Jerking'], service_advisor_remark: 'Transmission scan scheduled' },
];

export default function JobCardPage() {
  const [selectedJob, setSelectedJob] = useState<JobCardData | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleOpenJob = (job: JobCardData) => {
    setSelectedJob(job)
    setIsFormOpen(true)
  }

  // Calculate metrics for summary cards
  const pendingCount = mockJobCards.filter(j => j.status === 'Pending').length
  const inProgressCount = mockJobCards.filter(j => j.status === 'In Progress').length
  const completedCount = mockJobCards.filter(j => j.status === 'Completed').length

  return (
    <div className="min-h-screen bg-muted/20 pb-10">
      <AdminNavbar />
      <main className="container py-8 space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Job Card Management</h1>
          <p className="text-muted-foreground">Welcome back, Admin. Manage and review job cards for accepted appointments across the facility.</p>
        </header>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Jobs</CardTitle>
              <ClipboardList className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting mechanic assignment</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{inProgressCount}</div>
              <p className="text-xs text-muted-foreground">Currently being serviced</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <p className="text-xs text-muted-foreground">Ready for invoicing</p>
            </CardContent>
          </Card>
        </div>

        {/* Job Card List */}
        <div className="mt-8">
          <JobCardList 
            data={mockJobCards} 
            onSelectJob={handleOpenJob} 
          />
        </div>

        {/* Job Card Form Modal */}
        <JobCardForm 
          data={selectedJob} 
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
        />
      </main>
    </div>
  )
}