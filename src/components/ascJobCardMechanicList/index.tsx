'use client'

import React, { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  ArrowUpDown, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  FileText 
} from 'lucide-react'
import { formatDateTime } from '@/utilities/formatDateTime'

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Pending':
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 w-24 justify-center">Pending</Badge>
    case 'In Progress':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 w-24 justify-center">In Progress</Badge>
    case 'Completed':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 w-24 justify-center">Completed</Badge>
    default:
      return <Badge variant="secondary" className="w-24 justify-center">{status}</Badge>
  }
}

export interface JobCardData {
  id: string
  job_card_id: string
  customer_name: string
  phone_no: string
  date_in: string
  time_in: string
  plate_no: string
  brand: string
  model: string
  mileage: number
  customer_points: string[]
  service_advisor_remark: string
  status: 'Pending' | 'In Progress' | 'Completed'
}

interface JobCardListProps {
  data: JobCardData[]
  onSelectJob: (job: JobCardData) => void
}

export const JobCardList = ({ data, onSelectJob }: JobCardListProps) => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filtering and Sorting Logic
  const filteredData = useMemo(() => {
    return data
      .filter(job => {
        const matchesStatus = statusFilter === 'all' || job.status === statusFilter
        const matchesSearch = 
          job.job_card_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.plate_no.toLowerCase().includes(searchQuery.toLowerCase())
        
        return matchesStatus && matchesSearch
      })
      .sort((a, b) => {
        const dateA = new Date(a.date_in).getTime()
        const dateB = new Date(b.date_in).getTime()
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
      })
  }, [data, statusFilter, searchQuery, sortOrder])

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <Card className="rounded-md border bg-card text-card-foreground shadow-sm flex flex-col">
      <div className="p-4 border-b flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold leading-none tracking-tight">Active Job Cards</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Search Bar */}
          <div className="relative w-full sm:w-[220px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search ID or plate..."
              className="pl-8 h-9"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Status Filter */}
            <Select onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }} defaultValue="all">
              <SelectTrigger className="w-full sm:w-[130px] h-9">
                <Filter className="w-3.5 h-3.5 mr-2 opacity-50" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Toggle */}
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

      {/* Responsive Table with Horizontal Scroll */}
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm">
          <thead className="sticky top-0 z-20 border-b">
            <tr className="text-left bg-card">
              <th className="p-3 font-medium w-12 text-center bg-card">#</th>
              <th className="p-3 font-medium bg-card">Job ID</th>
              <th className="p-3 font-medium bg-card">Plate No.</th>
              <th className="p-3 font-medium hidden sm:table-cell bg-card">Car & Brand Model</th>
              <th className="p-3 font-medium bg-card">Date In</th>
              <th className="p-3 font-medium text-center bg-card">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((job, index) => (
              <tr 
                key={job.id} 
                className="border-b transition-colors hover:bg-muted/30 cursor-pointer"
                onClick={() => onSelectJob(job)}
              >
                <td className="p-3 text-center text-muted-foreground">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-3 font-medium">{job.job_card_id}</td>
                <td className="p-3 font-mono">{job.plate_no}</td>
                <td className="p-3 hidden sm:table-cell">{job.brand} {job.model}</td>
                <td className="p-3 whitespace-nowrap">{formatDateTime(job.date_in)}</td>
                <td className="p-3">
                  <div className="flex justify-center">
                    {getStatusBadge(job.status)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {paginatedData.length === 0 && (
          <div className="p-8 text-center text-muted-foreground italic">No job cards found matching your criteria.</div>
        )}
      </div>

      {/* Pagination Controls */}
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
    </Card>
  )
}