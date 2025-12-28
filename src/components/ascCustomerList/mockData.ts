export interface Vehicle {
  plate_no: string
  model: string
  last_service: string
}

export interface User {
  user_id: string
  created_at: string
  role: 'customer' | 'admin' | 'staff' // In this context, mostly 'customer'
  email: string
  name: string
  phone_no: string
  matric_staff_id: string
  
  // UI Helper: Vehicles are relational data fetched for the view
  vehicles: Vehicle[] 
}

// Generators
const getVehicles = (count: number): Vehicle[] => {
  const models = ['Perodua Myvi', 'Proton Saga', 'Honda City', 'Toyota Vios', 'Perodua Axia', 'Proton X50']
  return Array.from({ length: count }).map(() => ({
    plate_no: `V${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${1000 + Math.floor(Math.random() * 9000)}`,
    model: models[Math.floor(Math.random() * models.length)],
    last_service: '2025-11-15'
  }))
}

export const customersData: User[] = [
  // 13 UTM Staff (IDs start with UTM)
  ...Array.from({ length: 13 }).map((_, i) => ({
    user_id: `USR-STF-${100 + i}`,
    created_at: '2024-01-15T08:00:00Z',
    role: 'customer' as const, // STRICTLY 'customer'
    email: `staff${i}@utm.my`,
    name: ['Dr. Azman', 'Prof. Sarah', 'Dr. Lee', 'En. Haris', 'Pn. Siti', 'Dr. Rajesh', 'Assoc. Prof. Tan', 'Dr. Aminah', 'En. Chong', 'Pn. Nor', 'Dr. Kumar', 'Prof. Zaid', 'En. Bob'][i],
    phone_no: `012-${1000000 + i}`,
    matric_staff_id: `UTM${5000 + i}`, // Starts with UTM
    vehicles: getVehicles(i % 3 === 0 ? 2 : 1)
  })),

  // 7 UTM Students (IDs start with A22)
  ...Array.from({ length: 7 }).map((_, i) => ({
    user_id: `USR-STD-${200 + i}`,
    created_at: '2025-06-20T09:30:00Z',
    role: 'customer' as const, // STRICTLY 'customer'
    email: `student${i}@graduate.utm.my`,
    name: ['Ahmad Ali', 'Mei Ling', 'Muthu K.', 'Jessica Wong', 'Farid Kamil', 'Nurul Izzah', 'Kevin Lim'][i],
    phone_no: `011-${2000000 + i}`,
    matric_staff_id: `A22EC${200 + i}`, // Starts with A22
    vehicles: getVehicles(1)
  }))
]