'use client'

import React, { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  User as UserIcon, 
  Car, 
  Mail, 
  Phone, 
  Hash, 
  Calendar,
  ArrowUpDown 
} from 'lucide-react'
import { User } from './mockData'

// Logic to determine type based on ID prefix
const getUserType = (matricId: string) => {
  if (matricId.startsWith('UTM')) return 'UTM Staff'
  if (matricId.startsWith('A22')) return 'UTM Student'
  return 'Public'
}

// Updated: Badges now have a fixed width and centered text
const getTypeBadge = (matricId: string) => {
  const type = getUserType(matricId)
  const badgeBaseClass = "w-20 justify-center" // Standardized width
  
  switch (type) {
    case 'UTM Staff': 
      return (
        <Badge variant="secondary" className={`bg-blue-100 text-blue-700 hover:bg-blue-200 ${badgeBaseClass}`}>
          Staff
        </Badge>
      )
    case 'UTM Student': 
      return (
        <Badge variant="secondary" className={`bg-green-100 text-green-700 hover:bg-green-200 ${badgeBaseClass}`}>
          Student
        </Badge>
      )
    default: 
      return <Badge variant="outline" className={badgeBaseClass}>Public</Badge>
  }
}

export const CustomerList = ({ data }: { data: User[] }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all') 
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  
  const itemsPerPage = 10

  const filteredAndSortedData = useMemo(() => {
    let result = data.filter(item => {
      const userType = getUserType(item.matric_staff_id)
      const matchesCategory = categoryFilter === 'all' || userType === categoryFilter
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.matric_staff_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vehicles.some(v => v.plate_no.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesCategory && matchesSearch
    })

    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB
    })

    return result
  }, [data, searchQuery, categoryFilter, sortOrder])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <>
      <Card className="rounded-md border bg-card text-card-foreground shadow-sm flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-primary" /> Registered Users
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full sm:w-[220px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search name, ID, or plate..."
                className="pl-8 h-9 text-xs"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select onValueChange={(v) => { setCategoryFilter(v); setCurrentPage(1); }} defaultValue="all">
                <SelectTrigger className="w-full sm:w-[130px] h-9 text-xs">
                  <Filter className="w-3.5 h-3.5 mr-2 opacity-50" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="UTM Staff">UTM Staff</SelectItem>
                  <SelectItem value="UTM Student">UTM Student</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 px-3 flex-shrink-0 text-xs font-medium" 
                onClick={() => setSortOrder(prev => prev === 'latest' ? 'oldest' : 'latest')}
              >
                <ArrowUpDown className="w-3.5 h-3.5 mr-2 opacity-50" />
                {sortOrder === 'latest' ? 'Latest' : 'Oldest'}
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr className="text-left">
                <th className="p-3 font-medium w-12 text-center">#</th>
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium hidden sm:table-cell">Contact</th>
                <th className="p-3 font-medium">Category</th>
                <th className="p-3 font-medium hidden md:table-cell">Vehicles</th>
                <th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.user_id} className="border-b transition-colors hover:bg-muted/30">
                  <td className="p-3 text-center text-muted-foreground">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="p-3">
                    <div className="font-medium text-primary hover:underline cursor-pointer" onClick={() => setSelectedUser(item)}>
                      {item.name}
                    </div>
                    <div className="text-xs font-mono">{item.matric_staff_id}</div>
                  </td>
                  <td className="p-3 hidden sm:table-cell">
                    <div className="flex flex-col text-xs gap-0.5">
                      <span className="flex items-center gap-1 text-muted-foreground"><Phone className="w-3 h-3" /> {item.phone_no}</span>
                      <span className="flex items-center gap-1 text-muted-foreground"><Mail className="w-3 h-3" /> {item.email}</span>
                    </div>
                  </td>
                  <td className="p-3">{getTypeBadge(item.matric_staff_id)}</td>
                  <td className="p-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-[250px]">
                      {item.vehicles.map((v, i) => (
                        <Badge key={i} variant="outline" className="text-[12px] font-mono">{v.plate_no}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setSelectedUser(item)}>
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAndSortedData.length === 0 && (
            <div className="p-8 text-center text-muted-foreground italic text-sm">
              No matching users found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t flex items-center justify-between bg-card rounded-b-md">
            <div className="text-xs text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Prev
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Detail Sheet */}
      <Sheet open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>User Profile</SheetTitle>
            <SheetDescription>Details from User Table.</SheetDescription>
          </SheetHeader>

          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 border rounded-lg bg-muted/20">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedUser.name}</h3>
                  <div className="flex gap-2 mt-1">
                    {getTypeBadge(selectedUser.matric_staff_id)}
                    <span className="text-xs bg-muted px-2 py-0.5 rounded border font-mono flex items-center">
                      {selectedUser.matric_staff_id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-md">
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Hash className="w-3 h-3"/> User ID</div>
                    <div className="font-mono text-xs">{selectedUser.user_id}</div>
                </div>
                <div className="p-3 border rounded-md">
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Created At</div>
                    <div className="font-mono text-xs">{new Date(selectedUser.created_at).toLocaleDateString('en-GB')}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-md">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Phone className="w-3 h-3"/> Phone</div>
                  <div className="font-medium text-sm">{selectedUser.phone_no}</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Mail className="w-3 h-3"/> Email</div>
                  <div className="font-medium text-sm truncate" title={selectedUser.email}>{selectedUser.email}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Car className="w-4 h-4 text-blue-600" /> Registered Vehicles
                </h4>
                <div className="space-y-2">
                  {selectedUser.vehicles.map((v, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-md bg-card shadow-sm">
                      <div>
                        <div className="font-bold font-mono">{v.plate_no}</div>
                        <div className="text-xs text-muted-foreground">{v.model}</div>
                      </div>
                      <div className="text-right">
                         <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Last Service</div>
                         <div className="text-xs font-medium">{v.last_service}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}