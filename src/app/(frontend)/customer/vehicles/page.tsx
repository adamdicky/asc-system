'use client'

import React, { useState } from 'react'
import { CustomerNavbar } from '@/components/ascCustomerBar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Car, History, FileText } from 'lucide-react'
import { myVehicles, serviceHistoryMock } from '@/components/ascCustomer/mockData'

export default function MyVehiclesPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  const handleOpenHistory = (vehicle: any) => {
    setSelectedVehicle(vehicle)
    setIsHistoryOpen(true)
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-10">
      <CustomerNavbar />
      <main className="container py-8 space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">My Vehicles</h1>
          <p className="text-muted-foreground">Manage your registered vehicles and view service history.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {myVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  {vehicle.plate}
                </CardTitle>
                <CardDescription>{vehicle.brand} {vehicle.model}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Year: {vehicle.year}</p>
                  <p>Mileage: {vehicle.mileage.toLocaleString()} km</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2" onClick={() => handleOpenHistory(vehicle)}>
                  <History className="h-4 w-4" /> View History
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Service History Dialog (Reusing Mechanic View Style) */}
        <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Service History</DialogTitle>
              <DialogDescription>
                Records for <span className="font-bold text-primary">{selectedVehicle?.plate}</span> ({selectedVehicle?.brand} {selectedVehicle?.model})
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 border rounded-md overflow-hidden">
              <div className="bg-muted px-4 py-2 border-b grid grid-cols-12 text-xs font-semibold text-muted-foreground">
                <div className="col-span-3">Date</div>
                <div className="col-span-3">Invoice #</div>
                <div className="col-span-4">Service Description</div>
                <div className="col-span-2 text-right">Amount</div>
              </div>
              <div className="divide-y max-h-[400px] overflow-y-auto">
                {serviceHistoryMock.map((rec, i) => (
                  <div key={i} className="px-4 py-3 grid grid-cols-12 text-sm items-center hover:bg-muted/10">
                    <div className="col-span-3 text-muted-foreground">{new Date(rec.date).toLocaleDateString()}</div>
                    <div className="col-span-3 font-mono text-xs">{rec.invoice}</div>
                    <div className="col-span-4 font-medium">{rec.desc}</div>
                    <div className="col-span-2 text-right font-bold">RM {rec.amount.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
               <Button variant="ghost" onClick={() => setIsHistoryOpen(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}