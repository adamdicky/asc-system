'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Download, Loader2, FileCheck } from 'lucide-react'
import { AnalyticsData, TimeRange } from './mockData'

// 1. Dynamically import the PDF Link to keep it Client-Side Only
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
)

// 2. CRITICAL: Dynamically import your Document component too.
// If you import this statically, the '@react-pdf/renderer' inside it 
// will execute on the server and crash the app.
const ReportPDF = dynamic(
  () => import('./ReportPDF').then((mod) => mod.ReportPDF),
  { ssr: false }
)

interface PDFDownloadButtonProps {
  data: AnalyticsData
  range: TimeRange
  sections: {
    serviceOps: boolean
    inventory: boolean
    performance: boolean
  }
}

export const PDFDownloadButton = ({ data, range, sections }: PDFDownloadButtonProps) => {
  const [isClient, setIsClient] = useState(false)
  const [shouldGenerate, setShouldGenerate] = useState(false)

  // Hydration guard: Ensure we only render on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Reset the "Ready" state if the user changes filters.
  // This prevents the heavy PDF generation from running while you tick checkboxes.
  useEffect(() => {
    setShouldGenerate(false)
  }, [range, sections])

  if (!isClient) {
    return (
      <Button disabled size="sm" variant="outline" className="gap-2 w-full sm:w-auto">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading...
      </Button>
    )
  }

  // State 1: "Prepare" button (Lightweight, no PDF calculation yet)
  if (!shouldGenerate) {
    return (
      <Button 
        onClick={() => setShouldGenerate(true)} 
        variant="outline" 
        className="gap-2 w-full sm:w-auto"
      >
        <FileCheck className="w-4 h-4" />
        Prepare Report PDF
      </Button>
    )
  }

  // State 2: "Download" button (PDF Engine is now running)
  return (
    <PDFDownloadLink
      document={<ReportPDF data={data} range={range} sections={sections} />}
      fileName={`ASC_Audit_Report_${range}.pdf`}
    >
      {/* @ts-ignore */}
      {({ loading }) => (
        <Button 
          disabled={loading} 
          className={`gap-2 w-full sm:w-auto ${loading ? '' : 'bg-green-600 hover:bg-green-700 text-white'}`}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {loading ? 'Generating...' : 'Download PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  )
}