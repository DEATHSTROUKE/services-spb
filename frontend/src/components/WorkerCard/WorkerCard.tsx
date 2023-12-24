'use client'
import { Worker } from '@/types/worker'
import { Box, Button, Stack, Typography } from '@mui/joy'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

type WorkerCardProps = Worker

const WorkerCard: FC<WorkerCardProps> = ({
  id,
  email,
  job,
  experience,
  description,
  name,
  image,
  subway,
}) => {
  const router = useRouter()

  return (
    <Box
      sx={{
        padding: '20px',
        border: '1px solid var(--border-color)',
        borderRadius: '15px',
        cursor: 'pointer',
      }}
      onClick={() => router.push(`/worker/${id}`)}
    >
      <Stack direction="row" gap="20px">
        <Box sx={{ maxWidth: '130px', maxHeight: '130px', width: '100%' }}>
          <img
            src={image}
            alt="Аватар"
            style={{ borderRadius: '10px', width: '100%' }}
          />
        </Box>
        <Stack flex="1 1 auto">
          <Stack direction="row" gap="15px" alignItems={'flex-end'}>
            <Typography level="h4">{job}</Typography>
            <Typography level="h3">{name}</Typography>
          </Stack>
          <Stack>
            <Typography>Стаж работы: {experience}</Typography>
            <Typography>Email: {email}</Typography>
            {subway && <Typography>Метро: {subway}</Typography>}
          </Stack>
          <Stack>
            <Typography>{description}</Typography>
          </Stack>
        </Stack>
        <Stack>
          <a href={`mailto:${email}`} target="_blank">
            <Button>Написать</Button>
          </a>
        </Stack>
      </Stack>
    </Box>
  )
}

export default WorkerCard
