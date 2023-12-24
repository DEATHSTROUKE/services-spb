'use client'
import { useWorkers } from '@/api/worker'
import MainLayout from '@/components/Layouts/MainLayout'
import Loading from '@/components/Loading/Loading'
import WorkerCard from '@/components/WorkerCard/WorkerCard'
import { UserType } from '@/types/user'
import { Box, Stack, Typography } from '@mui/joy'

const MainPage = () => {
  const { data, isLoading, isError, error } = useWorkers()

  return (
    <MainLayout>
      <Stack gap="24px">
        <Typography level="h2">Главная</Typography>
        {isLoading && <Loading />}
        {isError && <Box>{error.message}</Box>}
        {data &&
          data.workers.map((item) => {
            return (
              <WorkerCard
                key={item.id}
                id={item.id}
                description={item.description}
                email={item.email}
                experience={item.experience}
                job={item.job}
                name={item.name}
                image={item.image}
                subway={item.subway}
                type={UserType.Worker}
              />
            )
          })}
      </Stack>
    </MainLayout>
  )
}

export default MainPage
