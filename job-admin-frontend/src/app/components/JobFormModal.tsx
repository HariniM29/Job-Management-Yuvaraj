'use client';
import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  Select,
  Button,
  Grid,
  Group,
  Box,
  NumberInput,
} from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// --- Interfaces ---
interface JobFormData {
  title: string;
  companyName: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salaryMin: number;
  salaryMax: number;
  applicationDeadline: string;
  description: string;
  salaryRange?: string; // Optional, will be set in handleFormSubmit
}

interface JobFormModalProps {
  opened: boolean;
  close: () => void;
  onSubmit: (data: JobFormData) => void;
}
// ---

export default function JobFormModal({ opened, close, onSubmit }: JobFormModalProps) {
  const { register, handleSubmit, reset, setValue } = useForm<JobFormData>();

  const handleFormSubmit: SubmitHandler<JobFormData> = (data) => {
    // Convert to numbers
    data.salaryMin = Number(data.salaryMin) || 0;
    data.salaryMax = Number(data.salaryMax) || 0;

    // Set average salary
    if (data.salaryMin > 0 && data.salaryMax > 0) {
      const avg = Math.round((data.salaryMin + data.salaryMax) / 2);
      data.salaryRange = `₹${avg.toLocaleString('en-IN')}`; // Formats with Indian numbering system
    } else {
      data.salaryRange = 'Not disclosed';
    }

    onSubmit(data);
    reset();
    close();
  };

  // Custom styles
  const sharedStyles = {
    label: { fontWeight: 500 },
    input: {
      '&:focus': {
        borderColor: 'black',
        boxShadow: '0 0 0 1px black',
      },
    },
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size="lg"
      centered
      radius="md"
      title={
        <div style={{ width: '100%', textAlign: 'center', fontWeight: 600 }}>
          Create Job Opening
        </div>
      }
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing="md" p="sm">
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Job Title"
                placeholder="Full Stack Developer"
                {...register('title')}
                required
                styles={sharedStyles}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Company Name"
                placeholder="Amazon, Microsoft, Swiggy"
                {...register('companyName')}
                required
                styles={sharedStyles}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Location"
                placeholder="Choose Preferred Location"
                data={['Chennai', 'Bangalore', 'Remote']}
                onChange={(val) => setValue('location', val as JobFormData['location'])}
                required
                styles={sharedStyles}
                rightSection={<KeyboardArrowDownIcon fontSize="small" />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Job Type"
                data={['Full-time', 'Part-time', 'Contract', 'Internship']}
                onChange={(val) => setValue('jobType', val as JobFormData['jobType'])}
                required
                styles={sharedStyles}
                rightSection={<KeyboardArrowDownIcon fontSize="small" />}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Grid gutter="sm">
                <Grid.Col span={6}>
                  <NumberInput
                    label="Salary Min"
                    placeholder="₹0"
                    prefix="₹"
                    onChange={(val) => setValue('salaryMin', val || 0)}
                    hideControls
                    styles={sharedStyles}
                    parser={(value) => value?.replace(/₹\s?|(,*)/g, '')}
                    formatter={(value) =>
                      !Number.isNaN(parseFloat(value || ''))
                        ? `₹${parseFloat(value || '').toLocaleString('en-IN')}`
                        : '₹'
                    }
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Salary Max"
                    placeholder="₹12,00,000"
                    prefix="₹"
                    onChange={(val) => setValue('salaryMax', val || 0)}
                    hideControls
                    styles={sharedStyles}
                    parser={(value) => value?.replace(/₹\s?|(,*)/g, '')}
                    formatter={(value) =>
                      !Number.isNaN(parseFloat(value || ''))
                        ? `₹${parseFloat(value || '').toLocaleString('en-IN')}`
                        : '₹'
                    }
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Application Deadline"
                type="date"
                {...register('applicationDeadline')}
                required
                styles={sharedStyles}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                label="Job Description"
                placeholder="Please share a description to let the candidate know more about the job role"
                minRows={3}
                autosize={false}
                styles={{
                  label: { fontWeight: 500 },
                  input: {
                    resize: 'vertical',
                    width: '100%',
                    '&:focus': {
                      borderColor: 'black',
                      boxShadow: '0 0 0 1px black',
                    },
                  },
                }}
                {...register('description')}
                required
              />
            </Grid.Col>
          </Grid>

          <Group mt="md" grow>
            <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="outline"
                color="dark"
                style={{ borderColor: 'black', color: 'black' }}
                rightSection={<KeyboardArrowDownIcon fontSize="small" />}
              >
                Save Draft
              </Button>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="filled" color="#00AAFF">
                Publish &raquo;
              </Button>
            </Box>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
