'use client'

import React, { useState } from 'react'
import { AdminNavbar } from '@/components/ascAdminBar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BillingList, BillingAppointment } from '@/components/ascBillingList'
import { QuotationForm } from '@/components/ascQuotationForm'
import { InvoiceForm } from '@/components/ascInvoiceForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { FileClock, AlertCircle, FileCheck, RefreshCw } from 'lucide-react'

// Mock Data
const mockBillingData: BillingAppointment[] = [
  { 
    id: '1', quotation_no: 'QT-25-001', quotation_version: 1, customer_name: 'Ahmad bin Ali', phone_no: '012-3456789', plate_no: 'VCE 1234', brand: 'Proton', model: 'Saga', date: '2025-12-28T09:00:00', mileage: 45200, quotation_status: 'Waiting Agreement', job_card_status: 'Pending', job_card_done: false, service_type: 'General Service', admin_name: 'Admin Sarah', head_mechanic_name: 'Chief Razak', descriptions: ['Engine Oil Change'], 
    charges: [{ item: 'Engine Oil (Fully Syn)', amount: 210 }, { item: 'Oil Filter', amount: 120 }, { item: 'Labor Charges', amount: 150 }] 
  },
  { 
    id: '2', quotation_no: 'QT-25-002', quotation_version: 2, customer_name: 'Sarah Johnson', phone_no: '017-8889999', plate_no: 'WXC 5678', brand: 'Honda', model: 'Civic', date: '2025-12-28T14:30:00', mileage: 12500, date_delivered: '2025-12-30T10:00:00', quotation_status: 'Accepted', job_card_status: 'Completed', job_card_done: true, service_type: 'Repair', admin_name: 'Admin Sarah', head_mechanic_name: 'Chief Razak', descriptions: ['AC Repair'], 
    charges: [{ item: 'AC Compressor Unit', amount: 280 }, { item: 'Refrigerant Gas', amount: 115 }, { item: 'System Cleaning', amount: 200 }] 
  },
  { 
    id: '3', quotation_no: 'QT-25-003', quotation_version: 1, customer_name: 'John Doe', phone_no: '019-1112222', plate_no: 'ABC 9999', brand: 'Perodua', model: 'Myvi', date: '2025-12-29T10:00:00', mileage: 80150, date_delivered: '2025-12-31T16:00:00', quotation_status: 'Accepted', job_card_status: 'Completed', job_card_done: true, service_type: 'General Service', admin_name: 'Admin Ali', head_mechanic_name: 'Chief Razak', descriptions: ['80k Service'], 
    charges: [{ item: 'Major Service Kit', amount: 255 }, { item: 'Spark Plugs (Iridium)', amount: 180 }, { item: 'Gearbox Fluid', amount: 140 }] 
  },
  { 
    id: '4', quotation_no: 'QT-25-004', quotation_version: 1, customer_name: 'Fatimah Zakaria', phone_no: '011-2223334', plate_no: 'KAA 1122', brand: 'Toyota', model: 'Vios', date: '2025-12-27T11:00:00', mileage: 34000, quotation_status: 'Expired', job_card_status: 'Pending', job_card_done: false, service_type: 'Repair', admin_name: 'Admin Ali', head_mechanic_name: 'Chief Razak', descriptions: ['Brake Noise'], 
    charges: [{ item: 'Front Brake Pads', amount: 195 }, { item: 'Rotor Skimming', amount: 150 }, { item: 'Brake Fluid Flush', amount: 110 }] 
  },
  { 
    id: '5', quotation_no: 'QT-25-005', quotation_version: 1, customer_name: 'Lim Guan Eng', phone_no: '012-4445556', plate_no: 'PBB 8888', brand: 'BMW', model: '3 Series', date: '2025-12-30T16:00:00', mileage: 56700, quotation_status: 'Revising', job_card_status: 'In Progress', job_card_done: false, service_type: 'Repair', admin_name: 'Admin Sarah', head_mechanic_name: 'Chief Razak', descriptions: ['Transmission Scan'], 
    charges: [{ item: 'Transmission Fluid', amount: 245 }, { item: 'ATF Filter', amount: 160 }, { item: 'Electronic Diagnostic', amount: 135 }] 
  },
  { 
    id: '6', quotation_no: 'QT-25-006', quotation_version: 1, customer_name: 'Siti Nurhaliza', phone_no: '013-5556667', plate_no: 'VAF 4321', brand: 'Proton', model: 'X50', date: '2025-12-31T08:30:00', mileage: 5000, date_delivered: '2026-01-02T11:00:00', quotation_status: 'Accepted', job_card_status: 'Completed', job_card_done: true, service_type: 'General Service', admin_name: 'Admin Ali', head_mechanic_name: 'Chief Razak', descriptions: ['First Service'], 
    charges: [{ item: 'Full System Inspection', amount: 105 }, { item: 'Body Waxing', amount: 220 }, { item: 'Interior Sanitization', amount: 110 }] 
  },
  { 
    id: '7', quotation_no: 'QT-25-007', quotation_version: 1, customer_name: 'Ramasamy Govind', phone_no: '014-6667778', plate_no: 'ND 7766', brand: 'Nissan', model: 'Almera', date: '2026-01-02T14:00:00', mileage: 23400, quotation_status: 'Waiting Agreement', job_card_status: 'Pending', job_card_done: false, service_type: 'Repair', admin_name: 'Admin Ali', head_mechanic_name: 'Chief Razak', descriptions: ['Battery Weak'], 
    charges: [{ item: 'NS60 Maintenance Free Battery', amount: 240 }, { item: 'Alternator Performance Test', amount: 110 }, { item: 'Terminal Cleaning', amount: 100 }] 
  },
  { 
    id: '8', quotation_no: 'QT-25-008', quotation_version: 1, customer_name: 'Chong Wei', phone_no: '015-7778889', plate_no: 'WWD 1', brand: 'Mercedes', model: 'C200', date: '2026-01-02T15:30:00', mileage: 15800, quotation_status: 'Revising', job_card_status: 'In Progress', job_card_done: false, service_type: 'Repair', admin_name: 'Admin Sarah', head_mechanic_name: 'Chief Razak', descriptions: ['Suspension'], 
    charges: [{ item: 'Lower Control Arm', amount: 295 }, { item: 'Bushing Set', amount: 140 }, { item: 'Suspension Tuning', amount: 210 }] 
  },
  { 
    id: '9', quotation_no: 'QT-25-009', quotation_version: 1, customer_name: 'Nurul Izzah', phone_no: '016-8889990', plate_no: 'BEB 5544', brand: 'Perodua', model: 'Axia', date: '2025-12-26T09:45:00', mileage: 12000, date_delivered: '2025-12-28T14:00:00', quotation_status: 'Accepted', job_card_status: 'Completed', job_card_done: true, service_type: 'Repair', admin_name: 'Admin Sarah', head_mechanic_name: 'Chief Razak', descriptions: ['Tire replacement'], 
    charges: [{ item: 'Michelin 14" Tire', amount: 215 }, { item: 'Wheel Alignment', amount: 120 }, { item: 'Nitrogen Fill', amount: 100 }] 
  },
  { 
    id: '10', quotation_no: 'QT-25-010', quotation_version: 1, customer_name: 'Kevin Tan', phone_no: '017-9990001', plate_no: 'QM 8899', brand: 'Mazda', model: 'CX-5', date: '2026-01-03T11:20:00', mileage: 45600, quotation_status: 'Waiting Agreement', job_card_status: 'Pending', job_card_done: false, service_type: 'General Service', admin_name: 'Admin Ali', head_mechanic_name: 'Chief Razak', descriptions: ['Engine Oil'], 
    charges: [{ item: '0W-20 Fully Syn Oil', amount: 265 }, { item: 'Oil Filter', amount: 105 }, { item: 'Engine Flush', amount: 130 }] 
  },
  { 
    id: '11', quotation_no: 'QT-25-011', quotation_version: 1, customer_name: 'Zul Ariffin', phone_no: '018-0001112', plate_no: 'VGG 202', brand: 'Ford', model: 'Ranger', date: '2026-01-04T10:00:00', mileage: 67900, date_delivered: '2026-01-06T15:00:00', quotation_status: 'Accepted', job_card_status: 'Completed', job_card_done: true, service_type: 'Repair', admin_name: 'Admin Sarah', head_mechanic_name: 'Chief Razak', descriptions: ['Wiper Blades'], 
    charges: [{ item: 'Silicone Wiper Set', amount: 125 }, { item: 'Washer Motor Repair', amount: 180 }, { item: 'Windshield Coating', amount: 110 }] 
  },
  { 
    id: '12', quotation_no: 'QT-25-012', quotation_version: 1, customer_name: 'Mei Ling', phone_no: '019-1112223', plate_no: 'JKR 33', brand: 'Honda', model: 'City', date: '2025-12-25T13:00:00', mileage: 22100, date_delivered: '2025-12-27T09:00:00', quotation_status: 'Accepted', job_card_status: 'Completed', job_card_done: true, service_type: 'General Service', admin_name: 'Admin Sarah', head_mechanic_name: 'Chief Razak', descriptions: ['Coolant Flush'], 
    charges: [{ item: 'Radiator Coolant', amount: 140 }, { item: 'Expansion Tank Replacement', amount: 210 }, { item: 'Cooling System Pressure Test', amount: 160 }] 
  },
  { 
    id: '13', quotation_no: 'QT-25-013', quotation_version: 1, customer_name: 'Haris Ismail', phone_no: '010-2223334', plate_no: 'WTP 909', brand: 'Toyota', model: 'Hilux', date: '2026-01-05T09:00:00', mileage: 100400, quotation_status: 'Waiting Agreement', job_card_status: 'Pending', job_card_done: false, service_type: 'Repair', admin_name: 'Admin Ali', head_mechanic_name: 'Chief Razak', descriptions: ['Timing Belt'], 
    charges: [{ item: 'Timing Belt Kit', amount: 280 }, { item: 'Tensioner Bearing', amount: 230 }, { item: 'Water Pump Service', amount: 290 }] 
  },
  { 
    id: '14', quotation_no: 'QT-25-014', quotation_version: 1, customer_name: 'Aisha Rahman', phone_no: '011-3334445', plate_no: 'KV 456', brand: 'Mitsubishi', model: 'Xpander', date: '2026-01-05T15:00:00', mileage: 8200, quotation_status: 'Revising', job_card_status: 'In Progress', job_card_done: false, service_type: 'Repair', admin_name: 'Admin Ali', head_mechanic_name: 'Chief Razak', descriptions: ['Brake Fluid'], 
    charges: [{ item: 'DOT4 High Temp Fluid', amount: 115 }, { item: 'Hydraulic Bleeding', amount: 145 }, { item: 'Master Cylinder Check', amount: 130 }] 
  },
  { 
    id: '15', quotation_no: 'QT-25-015', quotation_version: 1, customer_name: 'Tan Sri Azman', phone_no: '012-4445556', plate_no: 'UTM 1', brand: 'Mercedes', model: 'S-Class', date: '2026-01-06T08:00:00', mileage: 30500, date_delivered: '2026-01-08T17:00:00', quotation_status: 'Accepted', job_card_status: 'Completed', job_card_done: true, service_type: 'General Service', admin_name: 'Admin Sarah', head_mechanic_name: 'Chief Razak', descriptions: ['Plugs replacement'], 
    charges: [{ item: 'Laser Iridium Plugs', amount: 260 }, { item: 'Ignition Coil Pack', amount: 295 }, { item: 'Combustion Chamber Clean', amount: 155 }] 
  },
  { 
    id: '16', quotation_no: 'QT-25-016', quotation_version: 1, customer_name: 'Muthu Kumaran', phone_no: '013-5556667', plate_no: 'BCC 7788', brand: 'Proton', model: 'Persona', date: '2025-12-24T11:30:00', mileage: 45000, quotation_status: 'Expired', job_card_status: 'Pending', job_card_done: false, service_type: 'Repair', admin_name: 'Admin Ali', head_mechanic_name: 'Chief Razak', descriptions: ['Clutch kit'], 
    charges: [{ item: 'Clutch Cover & Disc', amount: 285 }, { item: 'Release Bearing', amount: 190 }, { item: 'Flywheel Resurfacing', amount: 240 }] 
  },
  { 
    id: '17', quotation_no: 'QT-25-017', quotation_version: 1, customer_name: 'Farah Quinn', phone_no: '014-6667778', plate_no: 'SAP 2025', brand: 'Hyundai', model: 'Ioniq 5', date: '2026-01-07T10:30:00', mileage: 1550, quotation_status: 'Waiting Agreement', job_card_status: 'Pending', job_card_done: false, service_type: 'General Service', admin_name: 'Admin Ali', head_mechanic_name: 'Chief Razak', descriptions: ['Tire Rotation'], 
    charges: [{ item: 'Rotation Service', amount: 105 }, { item: 'Digital Wheel Balancing', amount: 135 }, { item: 'Chassis Lubrication', amount: 115 }] 
  },
  { 
    id: '18', quotation_no: 'QT-25-018', quotation_version: 1, customer_name: 'Lee Zii Jia', phone_no: '015-7778889', plate_no: 'LZJ 99', brand: 'Kia', model: 'EV6', date: '2026-01-08T14:00:00', mileage: 5300, date_delivered: '2026-01-10T12:00:00', quotation_status: 'Accepted', job_card_status: 'Completed', job_card_done: true, service_type: 'General Service', admin_name: 'Admin Sarah', head_mechanic_name: 'Chief Razak', descriptions: ['Cabin Filter'], 
    charges: [{ item: 'Antimicrobial HEPA Filter', amount: 185 }, { item: 'Ozone Deodorizing', amount: 220 }, { item: 'AC Evaporator Foaming', amount: 140 }] 
  },
  { 
    id: '19', quotation_no: 'QT-25-019', quotation_version: 1, customer_name: 'Nordin Ahmad', phone_no: '016-8889990', plate_no: 'WRA 3210', brand: 'Perodua', model: 'Bezza', date: '2026-01-09T09:15:00', mileage: 44200, quotation_status: 'Revising', job_card_status: 'In Progress', job_card_done: false, service_type: 'Repair', admin_name: 'Admin Sarah', head_mechanic_name: 'Chief Razak', descriptions: ['Headlamp bulb'], 
    charges: [{ item: 'LED Headlamp Kit', amount: 245 }, { item: 'Wiring Socket Set', amount: 110 }, { item: 'Headlamp Alignment', amount: 150 }] 
  },
  { 
    id: '20', quotation_no: 'QT-25-020', quotation_version: 1, customer_name: 'Jessica Lim', phone_no: '017-9990001', plate_no: 'VCF 8080', brand: 'Volkswagen', model: 'Golf', date: '2026-01-10T16:45:00', mileage: 25100, quotation_status: 'Waiting Agreement', job_card_status: 'Pending', job_card_done: false, service_type: 'Repair', admin_name: 'Admin Ali', head_mechanic_name: 'Chief Razak', descriptions: ['DSG Scan'], 
    charges: [{ item: 'DSG Adaptation Service', amount: 215 }, { item: 'Electronic Software Update', amount: 280 }, { item: 'Transmission Diagnostic', amount: 195 }] 
  },
]

export default function BillingPage() {
  const [selectedQuote, setSelectedQuote] = useState<BillingAppointment | null>(null)
  const [selectedInvoice, setSelectedInvoice] = useState<BillingAppointment | null>(null) // NEW
  const [viewDetails, setViewDetails] = useState<BillingAppointment | null>(null)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false) // NEW

  // Analytics
  const waitingCount = mockBillingData.filter(i => i.quotation_status === 'Waiting Agreement').length
  const expiredCount = mockBillingData.filter(i => i.quotation_status === 'Expired').length
  const revisingCount = mockBillingData.filter(i => i.quotation_status === 'Revising').length
  const acceptedCount = mockBillingData.filter(i => i.quotation_status === 'Accepted').length

  return (
    <div className="min-h-screen bg-muted/20 pb-10">
      <AdminNavbar />
      <main className="container py-8 space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Quotations & Invoices</h1>
          <p className="text-muted-foreground">Welcome back, Admin. Manage and review quotations, invoices from existing appointment bookings.</p>
        </header>

        {/* Analytics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Waiting Agreement</CardTitle><FileClock className="text-yellow-500 h-4 w-4"/></CardHeader>
            <CardContent><div className="text-2xl font-bold">{waitingCount}</div></CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Expired</CardTitle><AlertCircle className="text-red-500 h-4 w-4"/></CardHeader>
            <CardContent><div className="text-2xl font-bold">{expiredCount}</div></CardContent>
          </Card>
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Revising</CardTitle><RefreshCw className="text-orange-500 h-4 w-4"/></CardHeader>
            <CardContent><div className="text-2xl font-bold">{revisingCount}</div></CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Accepted</CardTitle><FileCheck className="text-green-500 h-4 w-4"/></CardHeader>
            <CardContent><div className="text-2xl font-bold">{acceptedCount}</div></CardContent>
          </Card>
        </div>

        {/* Billing List */}
        <BillingList 
          data={mockBillingData}
          onOpenQuotation={(item) => { setSelectedQuote(item); setIsQuoteOpen(true) }}
          onOpenInvoice={(item) => alert(`Opening Invoice for ${item.customer_name}`)} // Placeholder for Invoice logic
          onSelectAppointment={setViewDetails}
        />

        {/* Quotation Dialog */}
        <QuotationForm 
          data={selectedQuote} 
          isOpen={isQuoteOpen} 
          onClose={() => setIsQuoteOpen(false)} 
        />

        <InvoiceForm
          data={selectedInvoice}
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
        />

        {/* Appointment Details Modal */}
        <Dialog open={!!viewDetails} onOpenChange={() => setViewDetails(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
            </DialogHeader>
            {viewDetails && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Customer:</span> <span className="font-medium">{viewDetails.customer_name}</span></div>
                  <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{viewDetails.phone_no}</span></div>
                  <div><span className="text-muted-foreground">Vehicle:</span> <span className="font-medium">{viewDetails.brand} {viewDetails.model}</span></div>
                  <div><span className="text-muted-foreground">Service Type:</span> <Badge variant="outline">{viewDetails.service_type}</Badge></div>
                </div>
                <div className="border p-3 rounded-md bg-muted/20">
                  <p className="text-xs font-semibold mb-2 uppercase text-muted-foreground">Reported Problems</p>
                  <ul className="list-disc pl-4 text-sm space-y-1">
                    {viewDetails.descriptions.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
                {/* 3 Action Buttons */}
                <div className="flex gap-2 justify-end pt-2 border-t">
                  <Button variant="outline" size="sm" onClick={() => { setIsQuoteOpen(true); setSelectedQuote(viewDetails); }}>Quotation</Button>
                  <Button variant="outline" size="sm">Job Card</Button>
                  {viewDetails.quotation_status === 'Accepted' && viewDetails.job_card_done && (
                    <Button size="sm">Invoice</Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}