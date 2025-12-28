'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog' // Check if you have dialog, otherwise use a div overlay
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { JobCardPDF } from './JobCardPDF'
import { JobCardData } from '../ascJobCardList'
import { Download, X } from 'lucide-react'

interface JobCardFormProps {
  data: JobCardData | null
  isOpen: boolean
  onClose: () => void
}

export const JobCardForm = ({ data, isOpen, onClose }: JobCardFormProps) => {
  if (!data) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">Job Card Details</DialogTitle>
              <DialogDescription>Reference: {data.job_card_id}</DialogDescription>
            </div>
            {/* PDF Export Button */}
            <div className="pr-8"> {/* Padding to avoid X button overlap */}
              <PDFDownloadLink
                document={<JobCardPDF data={data} />}
                fileName={`JC-${data.job_card_id}.pdf`}
              >
                {/* @ts-ignore: React-pdf types can sometimes be finicky */}
                {({ loading }) => (
                  <Button size="sm" variant="outline" disabled={loading} className="gap-2">
                    <Download className="w-4 h-4" />
                    {loading ? 'Preparing...' : 'Export PDF'}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </DialogHeader>

        {/* Digital Form Layout mimicking the physical form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Section 1: Customer Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-primary uppercase tracking-wider">Customer Information</h4>
            <div className="grid gap-2">
              <Label>Customer Name</Label>
              <Input value={data.customer_name} readOnly className="bg-muted/50" />
            </div>
            <div className="grid gap-2">
              <Label>Phone No</Label>
              <Input value={data.phone_no} readOnly className="bg-muted/50" />
            </div>
          </div>

          {/* Section 2: Vehicle Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-primary uppercase tracking-wider">Vehicle Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Plate No</Label>
                <Input value={data.plate_no} readOnly className=" bg-muted/50" />
              </div>
              <div className="grid gap-2">
                <Label>Mileage (km)</Label>
                <Input value={data.mileage} readOnly className="bg-muted/50" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Model</Label>
              <Input value={`${data.brand} ${data.model}`} readOnly className="bg-muted/50" />
            </div>
          </div>

          {/* Section 3: Time Logs */}
          <div className=" md:col-span-2 grid grid-cols-2 gap-6 border-t pt-4">
            <div className="grid gap-2">
              <Label>Date In</Label>
              <Input value={new Date(data.date_in).toLocaleDateString()} readOnly className="bg-muted/50" />
            </div>
            <div className="grid gap-2">
              <Label>Time In</Label>
              <Input value={data.time_in} readOnly className="bg-muted/50" />
            </div>
          </div>

          {/* Section 4: Job Sheet */}
          <div className="md:col-span-2 space-y-4 border-t pt-4">
            <h4 className="font-semibold text-sm text-primary uppercase tracking-wider">Job Sheet / Customer Points</h4>
            <div className="bg-muted/20 p-4 rounded-md border">
              <ul className="list-disc pl-5 space-y-1">
                {data.customer_points.map((point, index) => (
                  <li key={index} className="text-sm">{point}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 5: Remarks */}
          <div className="md:col-span-2 space-y-4">
            <Label>Service Advisor Remark</Label>
            <Textarea 
              value={data.service_advisor_remark} 
              readOnly 
              className="min-h-[100px] bg-muted/50" 
            />
          </div>

          {/* Section 6: Status Display */}
          <div className="md:col-span-2 flex justify-end items-center gap-4 pt-4 border-t">
            <span className="text-sm text-muted-foreground">Current Status:</span>
            <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
              data.status === 'Pending' ? 'bg-red-100 text-red-800 border-red-200' :
              data.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
              'bg-green-100 text-green-800 border-green-200'
            }`}>
              {data.status}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}