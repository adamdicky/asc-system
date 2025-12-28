'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { InvoicePDF } from './InvoicePDF'
import { BillingAppointment } from '../ascBillingList'
import { Download, ReceiptText } from 'lucide-react'

interface InvoiceFormProps {
  data: BillingAppointment | null
  isOpen: boolean
  onClose: () => void
}

export const InvoiceForm = ({ data, isOpen, onClose }: InvoiceFormProps) => {
  if (!data) return null

  const totalAmount = data.charges.reduce((acc, curr) => acc + curr.amount, 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ReceiptText className="w-5 h-5 text-emerald-600" />
              <div>
                <DialogTitle>Official Invoice</DialogTitle>
                <DialogDescription>Invoice No: {data.invoice_no || `INV-${data.quotation_no.split('-')[1]}`}</DialogDescription>
              </div>
            </div>
            <PDFDownloadLink document={<InvoicePDF data={data} />} fileName={`INV-${data.plate_no}.pdf`}>
              {/* @ts-ignore */}
              {({ loading }) => (
                <Button size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                  <Download className="w-4 h-4" />
                  {loading ? 'Generating...' : 'Download Invoice'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </DialogHeader>

        <div className="py-6 space-y-6">
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground uppercase text-[10px] font-bold">Bill To</p>
              <p className="font-bold text-lg">{data.customer_name}</p>
              <p>{data.phone_no}</p>
            </div>
            <div className="space-y-1 border-l pl-6">
              <p className="text-muted-foreground uppercase text-[10px] font-bold">Vehicle</p>
              <p className="font-bold">{data.brand} {data.model}</p>
              <p className="font-mono text-xs">{data.plate_no}</p>
            </div>
            <div className="space-y-1 border-l pl-6">
              <p className="text-muted-foreground uppercase text-[10px] font-bold">Service Details</p>
              <p><span className="font-medium">Date Delivered:</span> {data.date_delivered ? new Date(data.date_delivered).toLocaleDateString('en-GB') : 'Pending'}</p>
              <p><span className="font-medium">Mileage:</span> {data.mileage?.toLocaleString() || '-'} KM</p>
            </div>
          </div>

          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Task / Item Description</th>
                  <th className="text-right p-3 font-medium">Amount (RM)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.charges.map((c, i) => (
                  <tr key={i}>
                    <td className="p-3">{c.item}</td>
                    <td className="p-3 text-right">{c.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-emerald-50/50 font-bold border-t">
                  <td className="p-3 text-right">TOTAL PAID</td>
                  <td className="p-3 text-right text-emerald-700">RM {totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}