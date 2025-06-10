'use client';

import { Box, Group, Image, Text, Title, Button } from '@mantine/core';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InventoryIcon from '@mui/icons-material/Inventory';

// Define an interface for the job prop
interface Job {
  companyName: string;
  title: string;
  experience: string; // Assuming you'll pass this in the job object
  type: string;       // Assuming you'll pass this in the job object (e.g., Onsite, Remote)
  salary: string;     // Assuming you'll pass this in the job object
  description: string;
}

export default function JobCard({ job }: { job: Job }) {
  const logoSrc =
    job.companyName?.toLowerCase() === 'swiggy'
      ? '/swiggy.svg'
      : job.companyName?.toLowerCase() === 'amazon'
      ? '/amazon.svg'
      : job.companyName?.toLowerCase() === 'microsoft'
      ? '/microsoft.svg'
      : '/default.svg';

  return (
    <Box
      p="md"
      bg="white"
      shadow="sm"
      radius="md"
      style={{ maxWidth: 280, borderRadius: 10, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)' }}
    >
      <Group position="apart" mb="xs">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div
            style={{
              width: 48,
              height: 48,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}
          >
            <Image
              src={logoSrc}
              width="70%"
              height="70%"
              fit="contain"
              alt="Logo"
            />
          </div>

          <Text size="xs" bg="#B0D9FF" p="4px 8px" radius="xl" color="black" fw={500} style={{ borderRadius: 10 }}>
            24h Ago
          </Text>
        </div>
      </Group>

      <Title order={4} mb="xs" style={{ fontWeight: 500 }}>{job.title}</Title>

      <Text size="sm" c="dimmed" mb="xs">
        <Group gap="xs" wrap="nowrap" align="center">
          <PersonIcon fontSize="small" />
          <span style={{ whiteSpace: 'nowrap' }}>{job.experience} Exp</span>
          <ApartmentIcon fontSize="small" />
          <span style={{ whiteSpace: 'nowrap' }}>{job.type}</span>
          <InventoryIcon fontSize="small" />
          <span style={{ whiteSpace: 'nowrap' }}>{job.salary}</span>
        </Group>
      </Text>

      <Text size="xs" mb="sm" style={{ lineHeight: 1.4 }}>
        {job.description}
      </Text>

      <Button fullWidth radius="md" color="#00AAFF">
        Apply Now
      </Button>
    </Box>
  );
}
