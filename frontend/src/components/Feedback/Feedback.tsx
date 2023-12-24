import { Box, Stack } from '@mui/joy'
import React, { FC } from 'react'
import FeedbackForm from './FeedbackForm'
import FeedbackCard from '../FeedbackCard/FeedbackCard'
import { FeedbackItem } from '@/types/worker'

type FeedbackProps = {
  id: string
  workerId: string
  feedback: FeedbackItem[]
}

const Feedback: FC<FeedbackProps> = ({ feedback, workerId, id }) => {
  return (
    <Box>
      <Stack direction={'column'} gap={'30px'}>
        <FeedbackForm workerId={workerId} id={id} />
        <Stack gap={'15px'}>
          {feedback.map((item, idx) => {
            return (
              <FeedbackCard
                key={idx}
                text={item.text}
                score={item.score}
                client={item.client}
              />
            )
          })}
        </Stack>
      </Stack>
    </Box>
  )
}

export default Feedback
