'use client'

import React, { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, Filter, ArrowUpDown, Receipt, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDateTime } from '@/utilities/formatDateTime'

export interface Charge {
  item: string
  amount: number
}

export interface BillingAppointment {
  id: string
  quotation_no: string
  quotation_version: number
  invoice_no?: string
  date_delivered?: string // Date of job card completion
  customer_name: string
  phone_no: string
  plate_no: string
  brand: string
  model: string
  date: string
  mileage: number
  quotation_status: 'Waiting Agreement' | 'Expired' | 'Revising' | 'Accepted'
  job_card_status: 'Pending' | 'In Progress' | 'Completed'
  job_card_done: boolean
  descriptions: string[]
  service_type: 'General Service' | 'Repair'
  admin_name: string
  head_mechanic_name: string
  charges: Charge[]
}

const getQuotationBadge = (status: string) => {
  switch (status) {
    case 'Waiting Agreement': return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 w-24 justify-center">Waiting</Badge>
    case 'Expired': return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 w-24 justify-center">Expired</Badge>
    case 'Revising': return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200 w-24 justify-center">Revising</Badge>
    case 'Accepted': return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 w-24 justify-center">Accepted</Badge>
    default: return <Badge variant="secondary" className="w-24 justify-center">{status}</Badge>
  }
}

interface BillingListProps {
  data: BillingAppointment[]
  onOpenQuotation: (apt: BillingAppointment) => void
  onOpenInvoice: (apt: BillingAppointment) => void
  onSelectAppointment: (apt: BillingAppointment) => void
}

export const BillingList = ({ data, onOpenQuotation, onOpenInvoice, onSelectAppointment }: BillingListProps) => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter, Search, and Sort Logic
  const filteredData = useMemo(() => {
    return data
      .filter(item => {
        const matchesStatus = statusFilter === 'all' || item.quotation_status === statusFilter
        const matchesSearch = 
          item.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.plate_no.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesStatus && matchesSearch
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
      })
  }, [data, statusFilter, searchQuery, sortOrder])

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <Card className="rounded-md border bg-card text-card-foreground shadow-sm flex flex-col">
      <div className="p-4 border-b flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Receipt className="w-4 h-4 text-primary" /> Billing & Quotations
        </h3>
        
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Search Bar */}
          <div className="relative w-full sm:w-[220px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search name or plate..."
              className="pl-8 h-9 text-xs"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }} defaultValue="all">
              <SelectTrigger className="w-full sm:w-[130px] h-9 text-xs">
                <Filter className="w-3.5 h-3.5 mr-2 opacity-50" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Waiting Agreement">Waiting</SelectItem>
                <SelectItem value="Revising">Revising</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>

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
        <table className="min-w-[900px] w-full text-sm">
          <thead className="sticky top-0 z-20 border-b">
            <tr className="text-left bg-card">
              <th className="p-3 font-medium w-12 text-center bg-card">#</th>
              <th className="p-3 font-medium bg-card">Customer</th>
              <th className="p-3 font-medium bg-card">Plate No.</th>
              <th className="p-3 font-medium hidden sm:table-cell bg-card">Vehicle</th>
              <th className="p-3 font-medium bg-card">Date</th>
              <th className="p-3 font-medium text-center bg-card">Quotation Status</th>
              <th className="p-3 font-medium text-right bg-card pr-6">Documents</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.id} className="border-b transition-colors hover:bg-muted/30">
                <td className="p-3 text-center text-muted-foreground">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td 
                  className="p-3 font-medium cursor-pointer hover:underline text-primary"
                  onClick={() => onSelectAppointment(item)}
                >
                  {item.customer_name}
                </td>
                <td className="p-3 font-mono">{item.plate_no}</td>
                <td className="p-3 hidden sm:table-cell">{item.brand} {item.model}</td>
                <td className="p-3 whitespace-nowrap">{formatDateTime(item.date)}</td>
                <td className="p-3 text-center">{getQuotationBadge(item.quotation_status)}</td>
                <td className="p-3 text-right pr-6">
                  <div className="flex justify-end gap-2">
                    {/* Quotation Button with fixed width */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-20 text-[10px]" 
                      onClick={() => onOpenQuotation(item)}
                    >
                      Quotation
                    </Button>
                    
                    {/* Invoice Button with same fixed width and emerald styling */}
                    {item.quotation_status === 'Accepted' && item.job_card_done && (
                      <Button 
                        size="sm" 
                        className="h-7 w-20 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white" 
                        onClick={() => onOpenInvoice(item)}
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
          <div className="p-8 text-center text-muted-foreground italic">No records found matching your criteria.</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t flex items-center justify-between bg-card">
          <div className="text-xs text-muted-foreground">
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
    </Card>
  )
}