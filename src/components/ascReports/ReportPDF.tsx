'use client'

import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import { AnalyticsData, TimeRange } from './mockData'

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: 1, borderColor: '#eee', paddingBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111' },
  subtitle: { fontSize: 10, color: '#666' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, padding: 4, backgroundColor: '#f3f4f6', color: '#333' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  label: { fontSize: 10, color: '#444' },
  value: { fontSize: 10, fontWeight: 'bold' },
  barContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  barLabel: { width: 80, fontSize: 9 },
  bar: { height: 8, backgroundColor: '#3b82f6', borderRadius: 2 },
  table: { width: '100%', marginTop: 5 },
  tableRow: { flexDirection: 'row', borderBottom: 1, borderColor: '#eee', paddingVertical: 4 },
  tableCol: { width: '33%', fontSize: 9 },
  alertText: { color: '#ef4444', fontWeight: 'bold' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 8, color: '#999' }
})

interface ReportPDFProps {
  data: AnalyticsData
  range: TimeRange
  sections: {
    serviceOps: boolean
    inventory: boolean
    performance: boolean
  }
}

export const ReportPDF = ({ data, range, sections }: ReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>AUDIT REPORT</Text>
          <Text style={styles.subtitle}>Automotive Service Centre (ASC) UTMKL</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.value}>Period: {range}</Text>
          <Text style={styles.subtitle}>Generated: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      {/* 1. Service & Ops */}
      {sections.serviceOps && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Service & Operations Analytics</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Total Cars Serviced:</Text>
            <Text style={styles.value}>{data.serviceOps.totalServiced}</Text>
          </View>
          
          <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Job Status Breakdown:</Text>
          {data.serviceOps.statusBreakdown.map((stat, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.label}>• {stat.name}</Text>
              <Text style={{ ...styles.value, color: stat.color === '#ef4444' ? 'red' : stat.color === '#10b981' ? 'green' : 'orange' }}>
                {stat.value} jobs
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* 2. Parts & Inventory */}
      {sections.inventory && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Parts & Inventory Analytics</Text>
          
          <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 5 }}>Most Used Parts (Top 4)</Text>
          {data.inventory.mostUsed.map((item, i) => (
            <View key={i} style={styles.barContainer}>
              <Text style={styles.barLabel}>{item.name}</Text>
              <View style={{ ...styles.bar, width: item.count * 2, backgroundColor: '#6366f1' }} />
              <Text style={{ fontSize: 8, marginLeft: 5 }}>{item.count}</Text>
            </View>
          ))}

          <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Low Stock Alerts Less Than 5</Text>
          <View style={styles.table}>
            <View style={{ ...styles.tableRow, backgroundColor: '#fee2e2' }}>
              <Text style={styles.tableCol}>Part Name</Text>
              <Text style={styles.tableCol}>Current Stock</Text>
              <Text style={styles.tableCol}>Min Level</Text>
            </View>
            {data.inventory.lowStock.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.tableCol}>{item.name}</Text>
                <Text style={{ ...styles.tableCol, ...styles.alertText }}>{item.stock}</Text>
                <Text style={styles.tableCol}>{item.min}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 3. Performance */}
      {sections.performance && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Mechanic & Staff Performance</Text>
          
          <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 5 }}>Tasks Per Mechanic</Text>
          {data.performance.mechanicTasks.map((mech, i) => (
            <View key={i} style={styles.barContainer}>
              <Text style={styles.barLabel}>{mech.name}</Text>
              <View style={{ ...styles.bar, width: mech.tasks * 3, backgroundColor: '#10b981' }} />
              <Text style={{ fontSize: 8, marginLeft: 5 }}>{mech.tasks}</Text>
            </View>
          ))}

          <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Average Job Time (Minutes)</Text>
          {data.performance.avgTime.map((job, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.label}>• {job.name}</Text>
              <Text style={styles.value}>{job.minutes} mins</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.footer}>ASC System Confidential Report. Not for external distribution.</Text>
    </Page>
  </Document>
)