'use client'

import React, { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Search, Filter, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { BillingAppointment } from '@/components/ascBillingList'
import { formatDateTime } from '@/utilities/formatDateTime'

interface CustomerHistoryListProps {
  data: BillingAppointment[]
  onViewDocument: (item: BillingAppointment, type: 'quotation' | 'invoice') => void
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Waiting Agreement': return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 w-32 justify-center">Action Required</Badge>
    case 'Accepted': return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 w-32 justify-center">Accepted</Badge>
    case 'Expired': return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 w-32 justify-center">Expired</Badge>
    case 'Revising': return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200 w-32 justify-center">Revising</Badge>
    default: return <Badge variant="secondary" className="w-32 justify-center">{status}</Badge>
  }
}

export const CustomerHistoryList = ({ data, onViewDocument }: CustomerHistoryListProps) => {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  const filteredData = useMemo(() => {
    return data
      .filter(item => {
        const matchesStatus = filter === 'all' || item.quotation_status === filter
        const matchesSearch = item.plate_no.toLowerCase().includes(search.toLowerCase()) || 
                              item.service_type.toLowerCase().includes(search.toLowerCase())
        return matchesStatus && matchesSearch
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Default latest first
  }, [data, filter, search])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <Card className="rounded-md border bg-card shadow-sm">
      <div className="p-4 border-b flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-primary" /> My Appointments
        </h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search plate..." 
              className="pl-9 h-9 w-full sm:w-[200px] text-xs" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select defaultValue="all" onValueChange={setFilter}>
            <SelectTrigger className="h-9 w-full sm:w-[140px] text-xs">
              <Filter className="w-3.5 h-3.5 mr-2 opacity-50" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Waiting Agreement">Action Needed</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
              <SelectItem value="Revising">Revising</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr className="text-left">
              <th className="p-3 font-medium w-12 text-center text-muted-foreground">#</th>
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium">Vehicle</th>
              <th className="p-3 font-medium">Service Type</th>
              <th className="p-3 font-medium text-center">Quotation Status</th>
              <th className="p-3 font-medium text-right pr-6">Documents</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-muted/30 transition-colors">
                <td className="p-3 text-center text-muted-foreground">
                  {(page - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-3 whitespace-nowrap">{formatDateTime(item.date)}</td>
                <td className="p-3">
                  <div className="font-mono font-medium">{item.plate_no}</div>
                  <div className="text-xs text-muted-foreground">{item.brand} {item.model}</div>
                </td>
                <td className="p-3">{item.service_type}</td>
                <td className="p-3">
                  <div className="flex justify-center">
                    {getStatusBadge(item.quotation_status)}
                  </div>
                </td>
                <td className="p-3 text-right pr-6">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-24 text-[10px]" 
                      onClick={() => onViewDocument(item, 'quotation')}
                    >
                      Quotation
                    </Button>
                    {item.invoice_no && (
                      <Button 
                        size="sm" 
                        className="h-7 w-24 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white" 
                        onClick={() => onViewDocument(item, 'invoice')}
                      >
                        Invoice
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {paginatedData.length === 0 && (
          <div className="p-8 text-center text-muted-foreground italic text-sm">
            No appointment records found.
          </div>
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="p-3 border-t flex justify-end gap-2 bg-muted/10">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </Card>
  )
}