import { FeedbackItem } from '@/types/worker'
import { Box, Stack, Typography } from '@mui/joy'
import React, { FC } from 'react'

type FeedbackCardProps = FeedbackItem

const FeedbackCard: FC<FeedbackCardProps> = ({ text, score, client }) => {
  return (
    <Box
      sx={{
        p: '11px 20px',
        border: '1px solid var(--border-color)',
        borderRadius: '15px',
      }}
    >
      <Stack direction={'row'} gap={'11px'}>
        <Box sx={{ width: '100%', maxWidth: '111px', maxHeight: '111px' }}>
          <img
            src={client.image}
            alt="Аватар"
            style={{ borderRadius: '10px', width: '100%' }}
          />
        </Box>
        <Stack direction={'column'} gap={'24px'} flex={'1 1 auto'}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography>{client.name}</Typography>
            <Typography>Оценка: {score}</Typography>
          </Stack>
          <Typography level="body-sm">{text}</Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default FeedbackCard
