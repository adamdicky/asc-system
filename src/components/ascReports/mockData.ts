export type TimeRange = 'Day' | 'Week' | 'Month' | 'Quarter'

export interface AnalyticsData {
  serviceOps: {
    totalServiced: number
    statusBreakdown: { name: string; value: number; color: string }[]
    trend: { name: string; jobs: number }[]
  }
  inventory: {
    mostUsed: { name: string; count: number }[]
    lowStock: { name: string; stock: number; min: number }[]
  }
  performance: {
    mechanicTasks: { name: string; tasks: number }[]
    avgTime: { name: string; minutes: number }[]
  }
}

// Helpers for randomization
const getRandomInt = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const partsList = [
  'Oil Filter (Proton)', 'Oil Filter (Honda)', '5W-30 Fully Syn Oil', '10W-40 Semi Syn Oil', 
  'Brake Pads (Front)', 'Brake Pads (Rear)', 'Spark Plugs (Iridium)', 'Battery NS60', 
  'Battery NS40', 'Wiper Blades 22"', 'Wiper Blades 18"', 'Coolant (Red)', 
  'Coolant (Green)', 'Air Filter', 'Cabin Filter'
];

const mechanicsList = ['Ali', 'Ah Hock', 'Muthu', 'Sarah', 'Ken', 'Razak'];

const jobTypes = ['General Service', 'Brake Service', 'Tyre Change', 'Aircond Service', 'Major Repair', 'Diagnostic'];

export const getMockData = (range: TimeRange): AnalyticsData => {
  let trendData: { name: string; jobs: number }[] = [];
  let totalJobs = 0;

  // 1. Generate Trend Data based on Range
  if (range === 'Day') {
    // Hourly breakdown (8 AM to 7 PM)
    const hours = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'];
    trendData = hours.map(hour => {
      const jobs = getRandomInt(0, 5); // 0 to 5 cars per hour
      totalJobs += jobs;
      return { name: hour, jobs };
    });
  } 
  else if (range === 'Week') {
    // Daily breakdown (Mon - Sun)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    trendData = days.map(day => {
      const jobs = day === 'Sun' ? getRandomInt(0, 5) : getRandomInt(8, 25); // Less on Sunday
      totalJobs += jobs;
      return { name: day, jobs };
    });
  } 
  else if (range === 'Month') {
    // Daily breakdown (1 - 30)
    trendData = Array.from({ length: 30 }, (_, i) => {
      const jobs = getRandomInt(5, 20);
      totalJobs += jobs;
      return { name: `${i + 1}`, jobs };
    });
  } 
  else if (range === 'Quarter') {
    // Weekly breakdown (Week 1 - 12)
    trendData = Array.from({ length: 12 }, (_, i) => {
      const jobs = getRandomInt(40, 90); // Weekly volume
      totalJobs += jobs;
      return { name: `W${i + 1}`, jobs };
    });
  }

  // 2. Service Ops Data
  // Ensure status breakdown matches totalJobs mostly, with some variance for ongoing
  const pending = Math.floor(totalJobs * 0.15);
  const inProgress = Math.floor(totalJobs * 0.25);
  const completed = totalJobs - pending - inProgress;

  const serviceOps = {
    totalServiced: totalJobs,
    statusBreakdown: [
      { name: 'Pending', value: pending, color: '#ef4444' },      // Red
      { name: 'In Progress', value: inProgress, color: '#f59e0b' }, // Yellow
      { name: 'Completed', value: completed, color: '#10b981' },    // Green
    ],
    trend: trendData
  };

  // 3. Inventory Data
  // Randomize top 5 used parts based on total jobs volume
  const shuffledParts = [...partsList].sort(() => 0.5 - Math.random());
  const mostUsed = shuffledParts.slice(0, 5).map(part => ({
    name: part,
    count: Math.floor(totalJobs * (getRandomInt(10, 40) / 100)) // Used in 10-40% of jobs
  })).sort((a, b) => b.count - a.count);

  const lowStock = shuffledParts.slice(5, 8).map(part => ({
    name: part,
    stock: getRandomInt(0, 4), // Critical levels
    min: 5
  }));

  // 4. Performance Data
  // Distribute total jobs among mechanics
  let assignedJobs = 0;
  const mechanicTasks = mechanicsList.map((mech, index) => {
    // Last mechanic gets the remainder to ensure numbers match up roughly
    if (index === mechanicsList.length - 1) {
      return { name: mech, tasks: Math.max(0, totalJobs - assignedJobs) };
    }
    const tasks = Math.floor(totalJobs * (getRandomInt(10, 25) / 100));
    assignedJobs += tasks;
    return { name: mech, tasks };
  }).sort((a, b) => b.tasks - a.tasks);

  const avgTime = jobTypes.map(type => ({
    name: type,
    minutes: getRandomInt(25, 120) // Random avg time between 25m and 2h
  }));

  return {
    serviceOps,
    inventory: {
      mostUsed,
      lowStock
    },
    performance: {
      mechanicTasks,
      avgTime
    }
  }
}