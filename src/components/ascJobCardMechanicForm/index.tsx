'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { JobCardData } from '../ascJobCardMechanicList'
import { Box, Plus, History, Save, CheckCircle2 } from 'lucide-react'

// --- MOCK DATA ---
const INVENTORY_PARTS = [
  { id: 'p1', name: '5W-30 Fully Syn Oil (4L)', stock: 10 },
  { id: 'p2', name: 'Oil Filter (Proton)', stock: 24 },
  { id: 'p3', name: 'Brake Pads (Front)', stock: 8 },
  { id: 'p4', name: 'Coolant (Red)', stock: 15 },
]

const SERVICE_HISTORY_MOCK = [
  { date: '2024-08-10', invoice: 'INV-2024-099', desc: 'General Service', amount: 250.00 },
  { date: '2024-02-15', invoice: 'INV-2024-012', desc: 'Battery Change', amount: 320.00 },
]
// -----------------

interface JobCardFormProps {
  data: JobCardData | null
  isOpen: boolean
  onClose: () => void
}

interface TaskState {
  description: string
  status: 'Pending' | 'In Progress' | 'Completed'
  parts: { partId: string; name: string; qty: number }[]
}

export const JobCardForm = ({ data, isOpen, onClose }: JobCardFormProps) => {
  const [tasks, setTasks] = useState<TaskState[]>([])
  
  // Modal State
  const [isPartsModalOpen, setIsPartsModalOpen] = useState(false)
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null)
  const [selectedPartId, setSelectedPartId] = useState('')
  const [partQty, setPartQty] = useState(1)

  // Initialize
  useEffect(() => {
    if (data) {
      setTasks(data.customer_points.map(point => ({
        description: point,
        status: 'Pending',
        parts: []
      })))
    }
  }, [data])

  if (!data) return null

  // Handle Status Change
  const handleStatusChange = (index: number, val: string) => {
    const newTasks = [...tasks]
    newTasks[index].status = val as any
    setTasks(newTasks)

    if (val === 'Completed') {
      setCurrentTaskIndex(index)
      setIsPartsModalOpen(true)
    }
  }

  // Handle Adding Part (Keeps modal open)
  const handleAddPart = () => {
    if (currentTaskIndex === null || !selectedPartId) return
    const partDef = INVENTORY_PARTS.find(p => p.id === selectedPartId)
    if (!partDef) return

    const newTasks = [...tasks]
    newTasks[currentTaskIndex].parts.push({
      partId: partDef.id,
      name: partDef.name,
      qty: partQty
    })
    setTasks(newTasks)
    
    // Reset selection for next item
    setSelectedPartId('')
    setPartQty(1)
  }

  // Handle Main Form Save
  const handleSaveJobCard = () => {
    console.log('Saving Job Card Updates:', {
      jobCardId: data.job_card_id,
      updatedTasks: tasks
    })
    onClose() // Close after saving
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto flex flex-col p-4 sm:p-6">
          <DialogHeader className="border-b pb-4 mb-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-lg sm:text-xl">Job Card Details</DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">Ref: {data.job_card_id}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Scrollable Content Area */}
          <div className="flex-1 pr-1">
            {/* Digital Form Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
              
              {/* Section 1: Customer Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-xs sm:text-sm text-primary uppercase tracking-wider">Customer Information</h4>
                <div className="grid gap-2">
                  <Label className="text-xs">Customer Name</Label>
                  <Input value={data.customer_name} readOnly className="bg-muted/50 h-9" />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">Phone No</Label>
                  <Input value={data.phone_no} readOnly className="bg-muted/50 h-9" />
                </div>
              </div>

              {/* Section 2: Vehicle Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-xs sm:text-sm text-primary uppercase tracking-wider">Vehicle Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-xs">Plate No</Label>
                    <Input value={data.plate_no} readOnly className="bg-muted/50 h-9" />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs">Mileage (km)</Label>
                    <Input value={data.mileage} readOnly className="bg-muted/50 h-9" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">Model</Label>
                  <Input value={`${data.brand} ${data.model}`} readOnly className="bg-muted/50 h-9" />
                </div>
              </div>

              {/* Section 3: Time Logs */}
              <div className="md:col-span-2 grid grid-cols-2 gap-6 border-t pt-4">
                <div className="grid gap-2">
                  <Label className="text-xs">Date In</Label>
                  <Input value={new Date(data.date_in).toLocaleDateString()} readOnly className="bg-muted/50 h-9" />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">Time In</Label>
                  <Input value={data.time_in} readOnly className="bg-muted/50 h-9" />
                </div>
              </div>

              {/* Section 4: Job Sheet (Interactive) */}
              <div className="md:col-span-2 space-y-4 border-t pt-4">
                <h4 className="font-semibold text-xs sm:text-sm text-primary uppercase tracking-wider">Job Sheet / Customer Points</h4>
                <div className="bg-muted/20 p-3 sm:p-4 rounded-md border space-y-3">
                  {tasks.map((task, index) => (
                    <div key={index} className="flex flex-col gap-2 border-b border-dashed border-gray-300 pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium flex-1 truncate">• {task.description}</span>
                        <Select 
                          value={task.status} 
                          onValueChange={(val) => handleStatusChange(index, val)}
                        >
                          <SelectTrigger className={`w-[110px] sm:w-[140px] h-8 text-[10px] sm:text-xs ${
                            task.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-200' :
                            task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
                            'bg-background'
                          }`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {task.parts.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pl-4">
                          {task.parts.map((p, i) => (
                            <Badge key={i} variant="secondary" className="text-[9px] h-5 px-1.5 gap-1 bg-background border">
                              <Box className="w-2.5 h-2.5" /> {p.qty}x {p.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Remarks */}
              <div className="md:col-span-2 space-y-4">
                <Label className="text-xs">Service Advisor Remark</Label>
                <Textarea 
                  value={data.service_advisor_remark} 
                  readOnly 
                  className="min-h-[80px] sm:min-h-[100px] bg-muted/50 text-sm" 
                />
              </div>

              {/* Section 6: Status Display */}
              <div className="md:col-span-2 flex justify-end items-center gap-4 pt-4 border-t">
                <span className="text-xs sm:text-sm text-muted-foreground">Current Status:</span>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                  data.status === 'Pending' ? 'bg-red-100 text-red-800 border-red-200' :
                  data.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                  'bg-green-100 text-green-800 border-green-200'
                }`}>
                  {data.status}
                </div>
              </div>

              {/* Section 7: Service History (Horizontal Scroll Fix) */}
              <div className="md:col-span-2 space-y-4 border-t pt-4">
                <h4 className="font-semibold text-xs sm:text-sm text-primary uppercase tracking-wider flex items-center gap-2">
                  <History className="w-4 h-4" /> Service History
                </h4>
                <div className="border rounded-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <div className="min-w-[600px]">
                      <div className="bg-muted px-4 py-2 border-b grid grid-cols-12 text-[10px] font-semibold text-muted-foreground">
                        <div className="col-span-3">Date</div>
                        <div className="col-span-3">Invoice #</div>
                        <div className="col-span-4">Service</div>
                        <div className="col-span-2 text-right">Amount</div>
                      </div>
                      <div className="divide-y">
                        {SERVICE_HISTORY_MOCK.map((rec, i) => (
                          <div key={i} className="px-4 py-3 grid grid-cols-12 text-xs items-center hover:bg-muted/5 transition-colors">
                            <div className="col-span-3">{new Date(rec.date).toLocaleDateString()}</div>
                            <div className="col-span-3 font-mono text-[10px]">{rec.invoice}</div>
                            <div className="col-span-4 truncate pr-2">{rec.desc}</div>
                            <div className="col-span-2 text-right font-medium">RM {rec.amount.toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* MAIN FOOTER (Mobile stacking fix) */}
          <DialogFooter className="border-t pt-4 mt-auto flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto order-2 sm:order-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSaveJobCard} 
              className="w-full sm:w-auto order-1 sm:order-2 gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save Updates
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PARTS MODAL (US009) */}
      <Dialog open={isPartsModalOpen} onOpenChange={setIsPartsModalOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">Add Used Parts</DialogTitle>
            <DialogDescription className="text-xs">
              Task: <span className="font-medium text-primary">{currentTaskIndex !== null ? tasks[currentTaskIndex]?.description : ''}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label className="text-xs">Select Part</Label>
              <Select value={selectedPartId} onValueChange={setSelectedPartId}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Choose inventory item..." />
                </SelectTrigger>
                <SelectContent>
                  {INVENTORY_PARTS.map(part => (
                    <SelectItem key={part.id} value={part.id} className="text-xs">
                      {part.name} (Stock: {part.stock})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label className="text-xs">Quantity</Label>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setPartQty(Math.max(1, partQty - 1))}>-</Button>
                <Input value={partQty} className="h-8 w-16 text-center text-xs" readOnly />
                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setPartQty(partQty + 1)}>+</Button>
              </div>
            </div>

            {currentTaskIndex !== null && tasks[currentTaskIndex]?.parts.length > 0 && (
              <div className="bg-muted/30 p-2 rounded text-[10px] space-y-1">
                <p className="font-semibold text-muted-foreground uppercase">Added so far:</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  {tasks[currentTaskIndex].parts.map((p, i) => (
                    <li key={i}>{p.qty}x {p.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="secondary" onClick={handleAddPart} disabled={!selectedPartId} className="w-full sm:w-auto text-xs h-9">
              <Plus className="w-4 h-4 mr-1" /> Add Part
            </Button>
            <Button onClick={() => setIsPartsModalOpen(false)} className="w-full sm:w-auto text-xs h-9">
              <Save className="w-4 h-4 mr-1" /> Save & Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}