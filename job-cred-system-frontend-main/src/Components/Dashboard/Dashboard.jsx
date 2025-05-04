import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Heading,
//   SimpleGrid,
//   Stat,
//   StatLabel,
//   StatNumber,
//   StatHelpText,
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   VStack,
//   HStack,
//   Text,
//   Badge
// } from '@chakra-ui/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import DashboardLayout from './DashboardLayout';
// import { getUserProfile, getJobs, getCreditHistory } from '../api/api';

const Dashboard = ({  }) => {

  const getUserProfile = () => {
    console.log("Fetching user profile...");
  }

  const getJobs = () => {
    console.log("Fetching jobs...");
  }

  const pendingJobs = 0; // Placeholder for pending jobs count

  const [userData, setUserData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [creditHistory, setCreditHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mock chart data - in a real app, you would generate this from actual data
  const chartData = [
    { name: 'Mon', jobs: 3, credits: 30 },
    { name: 'Tue', jobs: 5, credits: 45 },
    { name: 'Wed', jobs: 2, credits: 25 },
    { name: 'Thu', jobs: 0, credits: 0 },
    { name: 'Fri', jobs: 4, credits: 15 },
    { name: 'Sat', jobs: 3, credits: 10 },
    { name: 'Sun', jobs: 2, credits: 13 },
  ];
  
  useEffect(() => {
    async function fetchData() {
      try {
        const [userResponse, jobsResponse, creditsResponse] = await Promise.all([
          getUserProfile(),
          getJobs(),
          getCreditHistory()
        ]);
        
        setUserData(userResponse.data);
        setJobs(jobsResponse.data);
        setCreditHistory(creditsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout>
        {/* <Box p={4}>Loading...</Box> */}
        <p>Loading</p>
      </DashboardLayout>
    );
  }
  
  // const completedJobs = jobs.filter(job => job.status === 'completed').length;
  // const pendingJobs = jobs.filter(job => job.status === 'pending').length;
  
//   return (
//     <DashboardLayout>
//       <Box p={4}>
//         <Heading mb={6}>Dashboard</Heading>
        
//         <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
//           <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
//             <StatLabel>Available Credits</StatLabel>
//             <StatNumber>{userData?.credits || 0}</StatNumber>
//             <StatHelpText>Last purchase: 50 credits</StatHelpText>
//           </Stat>
          
//           <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
//             <StatLabel>Jobs Submitted</StatLabel>
//             <StatNumber>{jobs.length}</StatNumber>
//             <StatHelpText>+2 from last week</StatHelpText>
//           </Stat>
          
//           <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
//             <StatLabel>Jobs Completed</StatLabel>
//             <StatNumber>{completedJobs}</StatNumber>
//             <StatHelpText>
//               {jobs.length > 0 ? `${Math.round((completedJobs / jobs.length) * 100)}% completion rate` : 'No jobs yet'}
//             </StatHelpText>
//           </Stat>
          
//           <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
//             <StatLabel>Pending Jobs</StatLabel>
//             <StatNumber>{pendingJobs}</StatNumber>
//             <StatHelpText>Est. completion: 2 hours</StatHelpText>
//           </Stat>
//         </SimpleGrid>
        
//         <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
//           <Box p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
//             <Heading size="md" mb={4}>Usage Overview</Heading>
//             <Box height="300px">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
//                   <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
//                   <Tooltip />
//                   <Bar yAxisId="left" dataKey="jobs" fill="#8884d8" name="Jobs" />
//                   <Bar yAxisId="right" dataKey="credits" fill="#82ca9d" name="Credits Used" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </Box>
//           </Box>
          
//           <Box p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
//             <Heading size="md" mb={4}>Recent Activity</Heading>
//             <Tabs>
//               <TabList>
//                 <Tab>Jobs</Tab>
//                 <Tab>Credits</Tab>
//               </TabList>
              
//               <TabPanels>
//                 <TabPanel>
//                   <VStack align="stretch" spacing={4}>
//                     {jobs.slice(0, 5).map((job) => (
//                       <HStack key={job.id} justify="space-between">
//                         <VStack align="start" spacing={0}>
//                           <Text fontWeight="medium">{job.name}</Text>
//                           <Text fontSize="sm" color="gray.500">
//                             {job.created_at} • {job.credits} credits
//                           </Text>
//                         </VStack>
//                         <Badge colorScheme={job.status === 'completed' ? 'green' : 'yellow'}>
//                           {job.status}
//                         </Badge>
//                       </HStack>
//                     ))}
//                   </VStack>
//                 </TabPanel>
                
//                 <TabPanel>
//                   <VStack align="stretch" spacing={4}>
//                     {creditHistory.slice(0, 5).map((item) => (
//                       <HStack key={item.id} justify="space-between">
//                         <VStack align="start" spacing={0}>
//                           <Text fontWeight="medium">
//                             {item.type === 'purchase' ? 'Credit Purchase' : 'Credit Usage'}
//                           </Text>
//                           <Text fontSize="sm" color="gray.500">{item.date}</Text>
//                         </VStack>
//                         <Text 
//                           fontWeight="medium" 
//                           color={item.type === 'purchase' ? 'green.500' : 'red.500'}
//                         >
//                           {item.type === 'purchase' ? '+' : ''}{item.amount}
//                         </Text>
//                       </HStack>
//                     ))}
//                   </VStack>
//                 </TabPanel>
//               </TabPanels>
//             </Tabs>
//           </Box>
//         </SimpleGrid>
//       </Box>
//     </DashboardLayout>
//   );
// }



  return (
    <div className="container py-4">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row g-4 mb-5">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm border">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Available Credits</h6>
              <h4 className="card-title">{userData?.credits || 0}</h4>
              <p className="card-text">Last purchase: 50 credits</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm border">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Jobs Submitted</h6>
              <h4 className="card-title">{jobs.length}</h4>
              <p className="card-text">+2 from last week</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm border">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Jobs Completed</h6>
              {/* <h4 className="card-title">{completedJobs}</h4> */}
              <h4 className="card-title">{}</h4>
              <p className="card-text">
                {jobs.length > 0
                  ? `${Math.round((120 / jobs.length) * 100)}% completion rate`
                  : 'No jobs yet'}
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm border">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Pending Jobs</h6>
              <h4 className="card-title">{pendingJobs}</h4>
              <p className="card-text">Est. completion: 2 hours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Usage Overview</h5>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="jobs" fill="#8884d8" name="Jobs" />
                    <Bar yAxisId="right" dataKey="credits" fill="#82ca9d" name="Credits Used" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Recent Activity</h5>
              <ul className="nav nav-tabs" id="activityTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="jobs-tab" data-bs-toggle="tab" data-bs-target="#jobs" type="button" role="tab">Jobs</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="credits-tab" data-bs-toggle="tab" data-bs-target="#credits" type="button" role="tab">Credits</button>
                </li>
              </ul>

              <div className="tab-content mt-3" id="activityTabsContent">
                <div className="tab-pane fade show active" id="jobs" role="tabpanel">
                  {jobs.slice(0, 5).map((job) => (
                    <div key={job.id} className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <div className="fw-semibold">{job.name}</div>
                        <div className="text-muted small">
                          {job.created_at} • {job.credits} credits
                        </div>
                      </div>
                      <span className={`badge ${job.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {job.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="tab-pane fade" id="credits" role="tabpanel">
                  {creditHistory.slice(0, 5).map((item) => (
                    <div key={item.id} className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <div className="fw-semibold">
                          {item.type === 'purchase' ? 'Credit Purchase' : 'Credit Usage'}
                        </div>
                        <div className="text-muted small">{item.date}</div>
                      </div>
                      <div className={`fw-semibold ${item.type === 'purchase' ? 'text-success' : 'text-danger'}`}>
                        {item.type === 'purchase' ? '+' : ''}{item.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default Dashboard;

