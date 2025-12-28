'use client'

import React, { useState } from 'react'
import { CustomerNavbar } from '@/components/ascCustomerBar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { initialAppointments, myVehicles } from '@/components/ascCustomer/mockData'
import { isSameDay } from 'date-fns'

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState('')

  // Identify disabled dates based on appointments
  const disabledDates = initialAppointments.map(app => new Date(app.date))

  const handleDateSelect = (selected: Date | undefined) => {
    setDate(selected)
    if (selected) {
      setIsDialogOpen(true)
    }
  }

  const isDateDisabled = (date: Date) => {
    return disabledDates.some(disabledDate => isSameDay(date, disabledDate))
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-10">
      <CustomerNavbar />
      <main className="container max-w-5xl mx-auto py-8 space-y-8 px-4 sm:px-6">
        
        {/* Layout Grid: Centered and Balanced */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* Left Card: Booking Calendar with Title Inside */}
          <Card className="h-full shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Book Appointment</CardTitle>
              <CardDescription>Select an available date below to schedule your service.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                className="rounded-md border shadow-sm p-4"
              />
            </CardContent>
          </Card>

          {/* Right Card: Instructions */}
          <Card className="h-full shadow-md">
            <CardHeader>
              <CardTitle>How it works</CardTitle>
              <CardDescription>Before booking an appointment, make sure you have a registered vehicle. Then, follow these simple steps to secure your slot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">1</div>
                <div>
                  <p className="font-medium text-sm">Select a Date</p>
                  <p className="text-xs text-muted-foreground">Pick a preferred date from the calendar.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">2</div>
                <div>
                  <p className="font-medium text-sm">Check Availability</p>
                  <p className="text-xs text-muted-foreground">Dates marked in gray are fully booked.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">3</div>
                <div>
                  <p className="font-medium text-sm">Vehicle Details</p>
                  <p className="text-xs text-muted-foreground">Choose your vehicle and the type of service needed.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">4</div>
                <div>
                  <p className="font-medium text-sm">Confirmation</p>
                  <p className="text-xs text-muted-foreground">Submit your request and wait for approval.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule Service</DialogTitle>
              <DialogDescription>
                Booking for <span className="font-semibold text-primary">{date?.toDateString()}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Select Vehicle</Label>
                <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a car" />
                  </SelectTrigger>
                  <SelectContent>
                    {myVehicles.map(v => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.plate} - {v.brand} {v.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Service Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Service</SelectItem>
                    <SelectItem value="repair">Major Repair</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Remarks</Label>
                <Textarea placeholder="Describe any issues..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>Confirm Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}