'use client'

import { useWorker } from '@/api/worker'
import Feedback from '@/components/Feedback/Feedback'
import MainLayout from '@/components/Layouts/MainLayout'
import Loading from '@/components/Loading/Loading'
import { Box, Button, Stack, Typography } from '@mui/joy'
import { FC } from 'react'

type WorkerPageProps = {
  params: {
    id: string
  }
}

const WorkerPage: FC<WorkerPageProps> = ({ params: { id } }) => {
  const { data, isLoading, isError, error } = useWorker(id)
  console.log(data)

  return (
    <MainLayout>
      <Box>
        {isLoading && <Loading />}
        {isError && <Box>{error.message}</Box>}
        {data && (
          <Stack direction={'column'} gap={'15px'}>
            <Stack
              gap={'15px'}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography level={'h2'}>{data.worker.name}</Typography>
              <Button>Написать</Button>
            </Stack>
            <Stack gap={'20px'} direction={'row'}>
              <Box sx={{ maxWidth: '280px', maxHeight: '280px' }}>
                <img src={data.worker.image} alt="Аватар" width="100%" />
              </Box>
              <Stack direction={'column'} gap={'10px'}>
                <Typography level={'h3'}>{data.worker.job}</Typography>
                <Typography level={'body-sm'}>
                  Стаж работы: {data.worker.experience}
                </Typography>
                <Typography level={'body-sm'}>
                  Email: {data.worker.email}
                </Typography>
                {data.worker.subway && (
                  <Typography level={'body-sm'}>
                    Метро: {data.worker.subway}
                  </Typography>
                )}

                <Typography level={'body-sm'}>
                  {data.worker.description}
                </Typography>
              </Stack>
            </Stack>
            <Feedback
              id={data.worker.id}
              feedback={data.worker.feedback}
              workerId={data.worker.workerId}
            />
          </Stack>
        )}
      </Box>
    </MainLayout>
  )
}

export default WorkerPage
