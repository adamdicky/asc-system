import { BillingAppointment } from '@/components/ascBillingList'

export const customerAppointments: BillingAppointment[] = [
  // 1. Existing - Waiting
  {
    id: '1',
    quotation_no: 'QT-2025-001',
    quotation_version: 1,
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'VCE 1234',
    brand: 'Proton',
    model: 'Saga',
    date: '2025-12-28T09:00:00',
    mileage: 45000,
    quotation_status: 'Waiting Agreement',
    job_card_status: 'Pending',
    job_card_done: false,
    descriptions: ['Engine making rattling noise', 'Check brake pads'],
    service_type: 'Repair',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Engine Diagnostic', amount: 80.00 },
      { item: 'Valve Adjustment', amount: 150.00 },
      { item: 'Brake Pad Set (Front)', amount: 120.00 }
    ]
  },
  // 2. Existing - Accepted/Completed
  {
    id: '2',
    quotation_no: 'QT-2025-005',
    quotation_version: 2,
    invoice_no: 'INV-2025-005',
    date_delivered: '2025-11-20T14:00:00',
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'WXC 5678',
    brand: 'Honda',
    model: 'Civic',
    date: '2025-11-15T10:00:00',
    mileage: 12000,
    quotation_status: 'Accepted',
    job_card_status: 'Completed',
    job_card_done: true,
    descriptions: ['Regular Maintenance', 'Oil Change'],
    service_type: 'General Service',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Fully Synthetic Oil', amount: 220.00 },
      { item: 'Oil Filter', amount: 45.00 },
      { item: 'Labor Charge', amount: 60.00 }
    ]
  },
  // 3. Existing - Revising
  {
    id: '3',
    quotation_no: 'QT-2025-012',
    quotation_version: 1,
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'VCE 1234',
    brand: 'Proton',
    model: 'Saga',
    date: '2026-01-05T09:00:00',
    mileage: 46000,
    quotation_status: 'Revising',
    job_card_status: 'Pending',
    job_card_done: false,
    descriptions: ['Aircond not cold'],
    service_type: 'Repair',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'AC Gas Refill', amount: 50.00 },
      { item: 'Compressor Check', amount: 30.00 }
    ]
  },
  // 4. Expired Quote
  {
    id: '4',
    quotation_no: 'QT-2024-880',
    quotation_version: 1,
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'WXC 5678',
    brand: 'Honda',
    model: 'Civic',
    date: '2024-10-10T11:00:00',
    mileage: 10500,
    quotation_status: 'Expired',
    job_card_status: 'Pending',
    job_card_done: false,
    descriptions: ['Upgrade Sound System'],
    service_type: 'Repair',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Sony Player Headunit', amount: 850.00 },
      { item: 'Installation Wiring', amount: 150.00 }
    ]
  },
  // 5. Completed General Service
  {
    id: '5',
    quotation_no: 'QT-2024-700',
    quotation_version: 1,
    invoice_no: 'INV-2024-700',
    date_delivered: '2024-08-16T17:00:00',
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'VCE 1234',
    brand: 'Proton',
    model: 'Saga',
    date: '2024-08-15T09:30:00',
    mileage: 40000,
    quotation_status: 'Accepted',
    job_card_status: 'Completed',
    job_card_done: true,
    descriptions: ['40k Major Service'],
    service_type: 'General Service',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Engine Oil', amount: 180.00 },
      { item: 'Spark Plugs', amount: 60.00 },
      { item: 'Air Filter', amount: 35.00 },
      { item: 'Labor', amount: 100.00 }
    ]
  },
  // 6. Waiting Agreement (High Value)
  {
    id: '6',
    quotation_no: 'QT-2026-002',
    quotation_version: 1,
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'WXC 5678',
    brand: 'Honda',
    model: 'Civic',
    date: '2026-01-15T14:00:00',
    mileage: 13000,
    quotation_status: 'Waiting Agreement',
    job_card_status: 'Pending',
    job_card_done: false,
    descriptions: ['Gearbox jerking', 'Check transmission fluid'],
    service_type: 'Repair',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'CVT Fluid Flush', amount: 350.00 },
      { item: 'Transmission Filter', amount: 120.00 },
      { item: 'Diagnostic Scan', amount: 80.00 }
    ]
  },
  // 7. Completed Repair
  {
    id: '7',
    quotation_no: 'QT-2024-550',
    quotation_version: 1,
    invoice_no: 'INV-2024-550',
    date_delivered: '2024-05-21T11:00:00',
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'VCE 1234',
    brand: 'Proton',
    model: 'Saga',
    date: '2024-05-20T10:00:00',
    mileage: 35000,
    quotation_status: 'Accepted',
    job_card_status: 'Completed',
    job_card_done: true,
    descriptions: ['Battery Dead', 'Replace Battery'],
    service_type: 'Repair',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Century Battery DIN55', amount: 280.00 },
      { item: 'Trade-in Old Battery', amount: -20.00 }
    ]
  },
  // 8. Revising
  {
    id: '8',
    quotation_no: 'QT-2026-003',
    quotation_version: 3,
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'WXC 5678',
    brand: 'Honda',
    model: 'Civic',
    date: '2026-01-20T09:00:00',
    mileage: 13500,
    quotation_status: 'Revising',
    job_card_status: 'Pending',
    job_card_done: false,
    descriptions: ['Body paint touch up'],
    service_type: 'Repair',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Bumper Spray Paint', amount: 300.00 }
    ]
  },
  // 9. Completed
  {
    id: '9',
    quotation_no: 'QT-2024-100',
    quotation_version: 1,
    invoice_no: 'INV-2024-100',
    date_delivered: '2024-01-15T15:00:00',
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'VCE 1234',
    brand: 'Proton',
    model: 'Saga',
    date: '2024-01-15T09:00:00',
    mileage: 30000,
    quotation_status: 'Accepted',
    job_card_status: 'Completed',
    job_card_done: true,
    descriptions: ['Oil Change'],
    service_type: 'General Service',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Semi Synthetic Oil', amount: 120.00 },
      { item: 'Labor', amount: 40.00 }
    ]
  },
  // 10. Waiting
  {
    id: '10',
    quotation_no: 'QT-2026-010',
    quotation_version: 1,
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'VCE 1234',
    brand: 'Proton',
    model: 'Saga',
    date: '2026-02-01T10:30:00',
    mileage: 48000,
    quotation_status: 'Waiting Agreement',
    job_card_status: 'Pending',
    job_card_done: false,
    descriptions: ['Tinted film replacement'],
    service_type: 'Repair',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Remove Old Tint', amount: 100.00 },
      { item: 'Install New 3M Tint', amount: 450.00 }
    ]
  },
  // 11. Completed
  {
    id: '11',
    quotation_no: 'QT-2023-900',
    quotation_version: 1,
    invoice_no: 'INV-2023-900',
    date_delivered: '2023-12-20T12:00:00',
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'WXC 5678',
    brand: 'Honda',
    model: 'Civic',
    date: '2023-12-20T09:00:00',
    mileage: 8000,
    quotation_status: 'Accepted',
    job_card_status: 'Completed',
    job_card_done: true,
    descriptions: ['First Service (1000km/10k)'],
    service_type: 'General Service',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Labor (Free)', amount: 0.00 },
      { item: 'Oil Filter', amount: 45.00 },
      { item: 'Engine Oil', amount: 180.00 }
    ]
  },
  // 12. Expired
  {
    id: '12',
    quotation_no: 'QT-2023-850',
    quotation_version: 1,
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'VCE 1234',
    brand: 'Proton',
    model: 'Saga',
    date: '2023-11-15T14:00:00',
    mileage: 28000,
    quotation_status: 'Expired',
    job_card_status: 'Pending',
    job_card_done: false,
    descriptions: ['Add-on Bodykit'],
    service_type: 'Repair',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Side Skirts', amount: 400.00 },
      { item: 'Front Lip', amount: 250.00 }
    ]
  },
  // 13. Completed
  {
    id: '13',
    quotation_no: 'QT-2023-700',
    quotation_version: 1,
    invoice_no: 'INV-2023-700',
    date_delivered: '2023-09-10T16:00:00',
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'VCE 1234',
    brand: 'Proton',
    model: 'Saga',
    date: '2023-09-10T09:00:00',
    mileage: 20000,
    quotation_status: 'Accepted',
    job_card_status: 'Completed',
    job_card_done: true,
    descriptions: ['20k Service'],
    service_type: 'General Service',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Engine Oil', amount: 120.00 },
      { item: 'Oil Filter', amount: 25.00 },
      { item: 'Labor', amount: 60.00 }
    ]
  },
  // 14. Waiting
  {
    id: '14',
    quotation_no: 'QT-2026-020',
    quotation_version: 1,
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'WXC 5678',
    brand: 'Honda',
    model: 'Civic',
    date: '2026-02-15T11:00:00',
    mileage: 14000,
    quotation_status: 'Waiting Agreement',
    job_card_status: 'Pending',
    job_card_done: false,
    descriptions: ['Alignment & Balancing'],
    service_type: 'Repair',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Wheel Alignment', amount: 60.00 },
      { item: 'Balancing (4 Wheels)', amount: 40.00 }
    ]
  },
  // 15. Completed
  {
    id: '15',
    quotation_no: 'QT-2023-500',
    quotation_version: 1,
    invoice_no: 'INV-2023-500',
    date_delivered: '2023-06-05T13:00:00',
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'VCE 1234',
    brand: 'Proton',
    model: 'Saga',
    date: '2023-06-05T09:30:00',
    mileage: 10000,
    quotation_status: 'Accepted',
    job_card_status: 'Completed',
    job_card_done: true,
    descriptions: ['10k Service'],
    service_type: 'General Service',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Engine Oil', amount: 120.00 },
      { item: 'Oil Filter', amount: 25.00 }
    ]
  },
  // 16. Revising
  {
    id: '16',
    quotation_no: 'QT-2026-025',
    quotation_version: 4,
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'VCE 1234',
    brand: 'Proton',
    model: 'Saga',
    date: '2026-03-01T09:00:00',
    mileage: 49000,
    quotation_status: 'Revising',
    job_card_status: 'Pending',
    job_card_done: false,
    descriptions: ['Replace all absorbers'],
    service_type: 'Repair',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Front Absorbers (Pair)', amount: 400.00 },
      { item: 'Rear Absorbers (Pair)', amount: 300.00 },
      { item: 'Labor', amount: 150.00 }
    ]
  },
  // 17. Completed
  {
    id: '17',
    quotation_no: 'QT-2022-900',
    quotation_version: 1,
    invoice_no: 'INV-2022-900',
    date_delivered: '2022-12-15T15:00:00',
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'VCE 1234',
    brand: 'Proton',
    model: 'Saga',
    date: '2022-12-15T10:00:00',
    mileage: 5000,
    quotation_status: 'Accepted',
    job_card_status: 'Completed',
    job_card_done: true,
    descriptions: ['5k Service'],
    service_type: 'General Service',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Mineral Oil', amount: 80.00 },
      { item: 'Filter', amount: 20.00 }
    ]
  },
  // 18. Waiting
  {
    id: '18',
    quotation_no: 'QT-2026-030',
    quotation_version: 1,
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'WXC 5678',
    brand: 'Honda',
    model: 'Civic',
    date: '2026-03-15T10:00:00',
    mileage: 15000,
    quotation_status: 'Waiting Agreement',
    job_card_status: 'Pending',
    job_card_done: false,
    descriptions: ['Dashcam Installation'],
    service_type: 'Repair',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: '70mai A800S 4K', amount: 600.00 },
      { item: 'Installation', amount: 80.00 }
    ]
  },
  // 19. Completed
  {
    id: '19',
    quotation_no: 'QT-2022-500',
    quotation_version: 1,
    invoice_no: 'INV-2022-500',
    date_delivered: '2022-09-01T11:00:00',
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'VCE 1234',
    brand: 'Proton',
    model: 'Saga',
    date: '2022-09-01T09:00:00',
    mileage: 1000,
    quotation_status: 'Accepted',
    job_card_status: 'Completed',
    job_card_done: true,
    descriptions: ['1k Inspection Service'],
    service_type: 'General Service',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Labor', amount: 0.00 },
      { item: 'Consumables', amount: 10.00 }
    ]
  },
  // 20. Expired
  {
    id: '20',
    quotation_no: 'QT-2023-100',
    quotation_version: 2,
    customer_name: 'Ahmad bin Ali',
    phone_no: '012-3456789',
    plate_no: 'WXC 5678',
    brand: 'Honda',
    model: 'Civic',
    date: '2023-01-20T14:30:00',
    mileage: 2000,
    quotation_status: 'Expired',
    job_card_status: 'Pending',
    job_card_done: false,
    descriptions: ['Ceramic Coating'],
    service_type: 'Repair',
    admin_name: 'Puan Aniza',
    head_mechanic_name: 'Encik Hairil',
    charges: [
      { item: 'Full Body Coating', amount: 1500.00 }
    ]
  }
]