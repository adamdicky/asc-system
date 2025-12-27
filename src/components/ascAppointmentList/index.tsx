'use client'

import React, { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { ArrowUpDown, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDateTime } from '@/utilities/formatDateTime'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200'
    case 'Accepted': return 'bg-green-100 text-green-800 border-green-200'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Sample data using ISO strings for accurate sorting
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

export const AppointmentList = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 1. Logic for filtering and sorting
  const filteredAppointments = useMemo(() => {
    return initialAppointments
      .filter(apt => statusFilter === 'all' || apt.status === statusFilter)
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
      })
  }, [statusFilter, sortOrder])

  // 2. Pagination Logic
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
  const paginatedData = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1) // Reset to first page on filter
  }

  return (
    <div className="rounded-md border bg-card text-card-foreground shadow-sm flex flex-col h-full">
      <div className="p-4 border-b flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold leading-none tracking-tight">Recent Appointment Bookings</h3>
        
        <div className="flex items-center gap-2">
          <Select onValueChange={handleStatusChange} defaultValue="all">
            <SelectTrigger className="w-[140px] h-9">
              <Filter className="w-3.5 h-3.5 mr-2 opacity-50" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 px-3"
            onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
          >
            <ArrowUpDown className="w-3.5 h-3.5 mr-2 opacity-50" />
            {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
          </Button>
        </div>
      </div>

      {/* 3. HORIZONTAL SCROLL FIX: 
          Using overflow-x-auto on a wrapper div ensures the table can be swiped 
          horizontally on mobile without breaking the card layout.
      */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-[800px] w-full text-sm">
            {/* 4. OPAQUE HEADER FIX:
                Added 'bg-card' and 'z-20' to <th> to prevent data from bleeding through.
            */}
            <thead className="sticky top-0 z-20 border-b">
              <tr className="text-left bg-card">
                <th className="p-3 font-medium w-12 text-center bg-card">#</th>
                <th className="p-3 font-medium bg-card">Customer Name</th>
                <th className="p-3 font-medium bg-card">Plate No.</th>
                <th className="p-3 font-medium hidden sm:table-cell bg-card">Car Brand & Model</th>
                <th className="p-3 font-medium bg-card">Date</th>
                <th className="p-3 font-medium text-center bg-card">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((apt, index) => (
                <tr key={apt.id} className="border-b transition-colors hover:bg-muted/30">
                  <td className="p-3 text-center text-muted-foreground">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="p-3 font-medium">{apt.customer}</td>
                  <td className="p-3 font-mono">{apt.plate}</td>
                  <td className="p-3 hidden sm:table-cell">{apt.brand} {apt.model}</td>
                  <td className="p-3 whitespace-nowrap">{formatDateTime(apt.date)}</td>
                  <td className="p-3">
                    <div className="flex justify-center">
                      <span className={`inline-flex items-center justify-center w-24 px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paginatedData.length === 0 && (
            <div className="p-8 text-center text-muted-foreground italic">
              No appointments found for this filter.
            </div>
          )}
        </div>
      </div>

      {/* 5. PAGINATION BUTTONS:
          Fixed at the bottom of the card. Only shows if navigation is necessary.
      */}
      {totalPages > 1 && (
        <div className="p-4 border-t flex items-center justify-between bg-card">
          <div className="text-xs text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}