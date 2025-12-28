'use client'

import React, { useState } from 'react'
import { CustomerNavbar } from '@/components/ascCustomerBar'
import { CustomerHistoryList } from '@/components/ascCustomerHistoryList'
import { DocumentViewer } from '@/components/ascCustomerHistoryList/DocumentViewer'
import { customerAppointments } from '@/components/ascCustomerHistoryList/mockData'
import { BillingAppointment } from '@/components/ascBillingList'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function AppointmentHistoryPage() {
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean,
    data: BillingAppointment | null,
    type: 'quotation' | 'invoice'
  }>({ isOpen: false, data: null, type: 'quotation' })

  // Find items requiring attention
  const pendingQuotations = customerAppointments.filter(a => a.quotation_status === 'Waiting Agreement')

  const handleOpenDocument = (data: BillingAppointment, type: 'quotation' | 'invoice') => {
    setViewerState({ isOpen: true, data, type })
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-10">
      <CustomerNavbar />
      <main className="container max-w-6xl mx-auto py-8 px-4 space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
          <p className="text-muted-foreground">Manage your appointments and view billing documents.</p>
        </header>

        {/* Alert Cards Section */}
        {pendingQuotations.length > 0 && (
          <div className={`grid gap-4 ${pendingQuotations.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
            {pendingQuotations.map(quote => (
              <Card key={quote.id} className="border-l-4 border-l-yellow-500 shadow-sm bg-yellow-50/50">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="p-2 bg-yellow-100 rounded-full flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-yellow-700" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-yellow-900">Action Required</h4>
                    <p className="text-xs text-yellow-800">
                      Quotation <strong>{quote.quotation_no}</strong> for vehicle <strong>{quote.plate_no}</strong> is waiting for your agreement.
                    </p>
                    <button 
                      onClick={() => handleOpenDocument(quote, 'quotation')}
                      className="text-xs font-bold text-yellow-700 hover:underline mt-2 inline-block"
                    >
                      Review Quotation &rarr;
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Main List */}
        <CustomerHistoryList 
          data={customerAppointments} 
          onViewDocument={handleOpenDocument} 
        />

        {/* Document Viewer Modal */}
        <DocumentViewer 
          isOpen={viewerState.isOpen}
          onClose={() => setViewerState(prev => ({ ...prev, isOpen: false }))}
          data={viewerState.data}
          type={viewerState.type}
        />
      </main>
    </div>
  )
}