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
import { useForm } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ReactNode } from 'react';

type JobFormModalProps = {
  opened: boolean;
  close: () => void;
  onSubmit: (data: any) => void;
};

export default function JobFormModal({ opened, close, onSubmit }: JobFormModalProps) {
  const { register, handleSubmit, reset, setValue } = useForm();

  const handleFormSubmit = (data: any) => {
    data.salaryMin = Number(data.salaryMin) || 0;
    data.salaryMax = Number(data.salaryMax) || 0;

    if (data.salaryMin > 0 && data.salaryMax > 0) {
      const avg = Math.round((data.salaryMin + data.salaryMax) / 2);
      data.salaryRange = `₹${avg}`;
    } else {
      data.salaryRange = 'Not disclosed';
    }

    onSubmit(data);
    reset();
    close();
  };

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
        <Stack spacing={16} style={{ padding: '1rem' }}>
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
                onChange={(val) => setValue('location', val)}
                required
                styles={sharedStyles}
                rightSection={<KeyboardArrowDownIcon fontSize="small" />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Job Type"
                data={['Full-time', 'Part-time', 'Contract', 'Internship']}
                onChange={(val) => setValue('jobType', val)}
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
                        ? `₹${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
                        ? `₹${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
