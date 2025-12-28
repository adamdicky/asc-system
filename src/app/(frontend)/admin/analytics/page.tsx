'use client'

import React, { useState } from 'react'
import { AdminNavbar } from '@/components/ascAdminBar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getMockData, TimeRange } from '@/components/ascReports/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { FileBarChart, AlertTriangle, Users, Download } from 'lucide-react'

const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('Month')
  const [selectedSections, setSelectedSections] = useState({
    serviceOps: true,
    inventory: true,
    performance: true
  })

  const data = getMockData(timeRange)

  const toggleSection = (key: keyof typeof selectedSections) => {
    setSelectedSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-10">
      <AdminNavbar />
      <main className="container py-8 space-y-8 px-4 sm:px-8">
        
        {/* Header Section */}
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Audit Reports & Analytics</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Generate comprehensive reports on service operations, inventory status, and staff performance metrics.
          </p>
        </header>

        {/* Consolidated Controls Toolbar */}
        <Card className="shadow-sm border-none ring-1 ring-border">
          <CardContent className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left: Global Filters */}
            <div className="flex flex-col gap-3 w-full lg:w-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Report Configuration</span>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="ops" checked={selectedSections.serviceOps} onCheckedChange={() => toggleSection('serviceOps')} />
                  <label htmlFor="ops" className="text-sm font-medium leading-none cursor-pointer">Service & Ops</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="inv" checked={selectedSections.inventory} onCheckedChange={() => toggleSection('inventory')} />
                  <label htmlFor="inv" className="text-sm font-medium leading-none cursor-pointer">Parts & Inventory</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="perf" checked={selectedSections.performance} onCheckedChange={() => toggleSection('performance')} />
                  <label htmlFor="perf" className="text-sm font-medium leading-none cursor-pointer">Performance</label>
                </div>
              </div>
            </div>

            {/* Right: Time Range & Action */}
            <div className="flex flex-col gap-3 w-full lg:w-auto lg:items-end">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:text-right w-full">Actions</span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
                <Select value={timeRange} onValueChange={(v: TimeRange) => setTimeRange(v)}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Day">Last 24 Hours</SelectItem>
                    <SelectItem value="Week">Last 7 Days</SelectItem>
                    <SelectItem value="Month">Last 30 Days</SelectItem>
                    <SelectItem value="Quarter">Quarter (Last 3 Months)</SelectItem>
                  </SelectContent>
                </Select>

                {/* Export Button - Styled to match standard "Export" buttons (Outline variant) */}
                <div className="w-full sm:w-auto">
                  <Button 
                    variant="outline"
                    className="gap-2 w-full sm:w-auto"
                    onClick={() => alert("PDF Generation is disabled during development.")}
                  >
                    <Download className="w-4 h-4" />
                    Export Report
                  </Button>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* 1. Service & Ops Analytics */}
        {selectedSections.serviceOps && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileBarChart className="w-5 h-5 text-primary" /> Service & Operations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Cars Serviced</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{data.serviceOps.totalServiced}</div>
                  <p className="text-xs text-muted-foreground mt-1">Based on job card entry dates</p>
                </CardContent>
              </Card>

              {/* Status Pie Chart */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Job Status Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] flex flex-col justify-center pb-6"> 
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.serviceOps.statusBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data.serviceOps.statusBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs mt-[-20px]">
                    {data.serviceOps.statusBreakdown.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="font-medium">{item.name}:</span> {item.value}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trend Line Chart */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-sm">Service Trend</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.serviceOps.trend} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                      <YAxis fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        itemStyle={{ fontSize: '12px' }}
                      />
                      <Line type="monotone" dataKey="jobs" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* 2. Parts & Inventory Analytics */}
        {selectedSections.inventory && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" /> Parts & Inventory Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Top Moving Parts</CardTitle>
                  <CardDescription>Highest consumption items in this period</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={data.inventory.mostUsed} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" fontSize={10} hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={110} 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false} 
                        interval={0}
                      />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                      <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50/20">
                <CardHeader>
                  <CardTitle className="text-sm text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Critical Stock Alerts
                  </CardTitle>
                  <CardDescription>Items below minimum re-order threshold</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.inventory.lowStock.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white border border-red-100 rounded-md shadow-sm">
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate pr-2">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Min Level: {item.min}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xl font-bold text-red-600">{item.stock}</p>
                          <p className="text-[10px] text-red-400 font-medium uppercase">Units Left</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* 3. Mechanic Performance */}
        {selectedSections.performance && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" /> Mechanic & Staff Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Job Completion Volume</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.performance.mechanicTasks} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                      <YAxis fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                      <Bar dataKey="tasks" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Efficiency: Avg. Time per Job</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5 mt-2">
                    {data.performance.avgTime.map((job, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium truncate pr-4">{job.name}</span>
                          <span className="text-muted-foreground flex-shrink-0">{job.minutes} mins</span>
                        </div>
                        <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary/80 transition-all duration-500 ease-out" 
                            style={{ width: `${Math.min((job.minutes / 120) * 100, 100)}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}