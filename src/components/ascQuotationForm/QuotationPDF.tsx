'use client'

import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import { BillingAppointment } from '../ascBillingList'

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
  header: { marginBottom: 20, borderBottomWidth: 1, borderColor: '#ccc', paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logoSection: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 90, height: 'auto', marginRight: 10 },
  headerText: { flexDirection: 'column' },
  companyName: { fontSize: 16, fontWeight: 'bold' },
  companyAddress: { fontSize: 9, color: '#666' },
  metaSection: { alignItems: 'flex-end' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  label: { fontSize: 8, color: '#666', marginBottom: 1 },
  value: { fontSize: 10, fontWeight: 'bold', marginBottom: 4 },
  row: { flexDirection: 'row', marginBottom: 10 },
  col: { flexGrow: 1, width: '33%' },
  section: { marginTop: 15, marginBottom: 5 },
  sectionHeader: { fontSize: 10, fontWeight: 'bold', backgroundColor: '#f3f4f6', padding: 5, marginBottom: 5 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#e5e7eb', padding: 5, borderBottomWidth: 1, borderColor: '#999' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee', padding: 5 },
  colDesc: { width: '70%' },
  colAmount: { width: '30%', textAlign: 'right' },
  totalSection: { marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderColor: '#000', paddingTop: 5 },
  footer: { position: 'absolute', bottom: 30, left: 30, right: 30, borderTopWidth: 1, borderColor: '#ccc', paddingTop: 10 },
  signatureRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }
})

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // Browser can use relative /
  return process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
};

export const QuotationPDF = ({ data }: { data: BillingAppointment }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <Image
            src={`${getBaseUrl()}/ASC.png`} 
            style={styles.logo}
          />
          <View style={styles.headerText}>
            <Text style={styles.companyName}>ASC SYSTEM</Text>
            <Text style={styles.companyAddress}>Universiti Teknologi Malaysia Kuala Lumpur</Text>
          </View>
        </View>
        <View style={styles.metaSection}>
          <Text style={styles.title}>QUOTATION</Text>
          <Text style={styles.label}>QUOTATION NO</Text>
          <Text style={styles.value}>{data.quotation_no}</Text>
          <Text style={styles.label}>VERSION</Text>
          <Text style={styles.value}>{data.quotation_version}</Text>
        </View>
      </View>

      {/* Info Grid */}
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>CUSTOMER NAME</Text>
          <Text style={styles.value}>{data.customer_name}</Text>
          <Text style={styles.label}>PHONE NO</Text>
          <Text style={styles.value}>{data.phone_no}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>VEHICLE</Text>
          <Text style={styles.value}>{data.brand} {data.model}</Text>
          <Text style={styles.label}>PLATE NO</Text>
          <Text style={styles.value}>{data.plate_no}</Text>
           <Text style={styles.label}>MILEAGE</Text>
                    <Text style={styles.value}>{data.mileage?.toLocaleString() || '-'} KM</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>ORDER RECEIVED BY</Text>
          <Text style={styles.value}>{data.admin_name}</Text>
          <Text style={styles.label}>PROMISED DATE</Text>
          <Text style={styles.value}>{new Date(data.date).toLocaleDateString('en-GB')}</Text>
        </View>
      </View>

      {/* Description / Problems */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>DESCRIPTION / DIAGNOSIS</Text>
        {data.descriptions.map((desc, i) => (
          <Text key={i} style={{ marginBottom: 2, fontSize: 9 }}>• {desc}</Text>
        ))}
      </View>

      {/* Charges Table */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>CHARGES</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.colDesc}>Item / Service Description</Text>
          <Text style={styles.colAmount}>Amount (RM)</Text>
        </View>
        {data.charges.map((item, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.colDesc}>{item.item}</Text>
            <Text style={styles.colAmount}>{item.amount.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Total */}
      <View style={styles.totalSection}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 10 }}>TOTAL AMOUNT:</Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
          RM {data.charges.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
        </Text>
      </View>

      {/* Signatures */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <View style={{ width: '40%', alignItems: 'center' }}>
            <Text style={styles.label}>Work Order Completed By</Text>
            <Text style={styles.value}>{data.admin_name}</Text>
          </View>
          <View style={{ width: '40%', alignItems: 'center' }}>
            <Text style={styles.label}>Work Authorized By</Text>
            <Text style={styles.value}>{data.head_mechanic_name}</Text>
          </View>
        </View>
        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 8, color: '#999' }}>
          Generated by ASC System UTMKL. Valid for 14 days from {new Date().toLocaleDateString('en-GB')}
        </Text>
      </View>
    </Page>
  </Document>
)