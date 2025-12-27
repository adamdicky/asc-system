'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Input } from '@/components/ui/input' // Ensure this shadcn component is installed
import { ArrowUpDown, Filter, ChevronLeft, ChevronRight, Search } from 'lucide-react'
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

interface Appointment {
  id: number;
  customer: string;
  plate: string;
  brand: string;
  model: string;
  date: string;
  status: string;
}

export const AppointmentList = ({ data, title = "Appointment Bookings" }: { data: Appointment[], title?: string }) => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('') // New state for search
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Updated filtering logic to include search
  const filteredAppointments = useMemo(() => {
    return data
      .filter(apt => {
        const matchesStatus = statusFilter === 'all' || apt.status === statusFilter
        const matchesSearch = 
          apt.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          apt.plate.toLowerCase().includes(searchQuery.toLowerCase())
        
        return matchesStatus && matchesSearch
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
      })
  }, [data, statusFilter, searchQuery, sortOrder])

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
  const paginatedData = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="rounded-md border bg-card text-card-foreground shadow-sm flex flex-col">
      <div className="p-4 border-b flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
        
        {/* Toolbar Section */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Search Bar */}
          <div className="relative w-full sm:w-[220px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search name or plate..."
              className="pl-8 h-9"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1) // Reset to page 1 on search
              }}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Status Filter Dropdown */}
            <Select onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }} defaultValue="all">
              <SelectTrigger className="w-full sm:w-[130px] h-9">
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

            {/* Sort Toggle Button */}
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 px-3 flex-shrink-0" 
              onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-2 opacity-50" />
              {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm">
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
                <td className="p-3 text-center text-muted-foreground">{(currentPage - 1) * itemsPerPage + index + 1}</td>
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
          <div className="p-8 text-center text-muted-foreground italic">No appointments found matching your criteria.</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t flex items-center justify-between bg-card">
          <div className="text-xs text-muted-foreground text-center sm:text-left">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}