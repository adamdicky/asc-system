'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, AlertCircle, Phone } from 'lucide-react'
import dynamic from 'next/dynamic'
import { QuotationPDF } from '@/components/ascQuotationForm/QuotationPDF'
import { InvoicePDF } from '@/components/ascInvoiceForm/InvoicePDF'
import { BillingAppointment } from '@/components/ascBillingList'

// Dynamically import PDFViewer to avoid SSR issues
// const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
//   ssr: false,
//   loading: () => <div className="h-[500px] flex items-center justify-center bg-muted/20">Loading Document...</div>,
// })

interface DocumentViewerProps {
  isOpen: boolean
  onClose: () => void
  data: BillingAppointment | null
  type: 'quotation' | 'invoice'
}

export const DocumentViewer = ({ isOpen, onClose, data, type }: DocumentViewerProps) => {
  const [accepted, setAccepted] = useState(false)

  if (!data) return null

  const handleAccept = () => {
    // In a real app, this would trigger an API call
    setAccepted(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => { setAccepted(false); onClose(); }}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl flex items-center gap-2">
            {type === 'quotation' ? 'Review Quotation' : 'Official Invoice'}
            <span className="text-sm font-normal text-muted-foreground ml-2">
              {type === 'quotation' ? data.quotation_no : data.invoice_no}
            </span>
          </DialogTitle>
        </DialogHeader>

        {/* <div className="flex-1 bg-muted/10 p-0 overflow-hidden relative">
          <PDFViewer width="100%" height="100%" className="border-none">
            {type === 'quotation' ? <QuotationPDF data={data} /> : <InvoicePDF data={data} />}
          </PDFViewer>
        </div> */}

        {/* Action Area for Quotations */}
        {type === 'quotation' && (
          <div className="p-6 border-t bg-background">
            {accepted ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <AlertTitle className="text-green-800 font-bold mb-1">Quotation Accepted Successfully</AlertTitle>
                <AlertDescription className="text-green-700">
                  Come to ASC on <strong>{new Date(data.date).toLocaleDateString()} at 9AM</strong>. 
                  For any enquiries on appointment, please contact ASC Admin at <strong>+60133223537</strong>.
                </AlertDescription>
              </Alert>
            ) : data.quotation_status === 'Waiting Agreement' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                    Reject Quotation
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white min-w-[150px]"
                    onClick={handleAccept}
                  >
                    Accept Quotation
                  </Button>
                </div>
                <div className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1 bg-muted/30 p-2 rounded">
                  <AlertCircle className="w-3 h-3" />
                  If you wish to revise the quotation, please contact ASC admin at <span className="font-mono text-primary">+60133223537</span>.
                </div>
              </div>
            ) : (
              <div className="text-center text-sm text-muted-foreground">
                This quotation is currently <strong>{data.quotation_status}</strong>.
              </div>
            )}
          </div>
        )}

        {/* Simple Close for Invoice */}
        {type === 'invoice' && (
          <DialogFooter className="p-4 border-t">
            <Button onClick={onClose}>Close Viewer</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}