'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { InvoicePDF } from './InvoicePDF'
import { BillingAppointment } from '../ascBillingList'
import { Download } from 'lucide-react'

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
            <div>
              <DialogTitle>Official Invoice</DialogTitle>
              <DialogDescription>Invoice No: {data.invoice_no || `INV-${data.quotation_no.split('-')[1]}`}</DialogDescription>
            </div>
            {/* Added padding wrapper to prevent X button overlap */}
            <div className="pr-8">
              <PDFDownloadLink document={<InvoicePDF data={data} />} fileName={`INV-${data.plate_no}.pdf`}>
                {/* @ts-ignore */}
                {({ loading }) => (
                  <Button 
                    size="sm" 
                    className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white" 
                    disabled={loading}
                  >
                    <Download className="w-4 h-4" />
                    {loading ? 'Generating...' : 'Export Invoice'}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-8 py-4">
          <div className="space-y-4">
            <h4 className="font-semibold text-emerald-600">Customer & Vehicle</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{data.customer_name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium">{data.phone_no}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Vehicle</p>
                <p className="font-medium">{data.brand} {data.model}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Plate No</p>
                <p className="font-medium font-mono">{data.plate_no}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Mileage</p>
                <p className="font-medium">{data.mileage ? `${data.mileage.toLocaleString()} KM` : '-'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Date Delivered</p>
                <p className="font-medium">
                  {data.date_delivered ? new Date(data.date_delivered).toLocaleDateString('en-GB') : 'Pending'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-emerald-600">Charges Summary</h4>
            <div className="border rounded-md p-0 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-2 font-medium">Item</th>
                    <th className="text-right p-2 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.charges.map((c, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">{c.item}</td>
                      <td className="p-2 text-right">RM {c.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="border-t bg-emerald-50/50 font-bold">
                    <td className="p-2 text-emerald-900">Total Paid</td>
                    <td className="p-2 text-right text-emerald-700">RM {totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}