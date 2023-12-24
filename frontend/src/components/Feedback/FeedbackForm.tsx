'use client'
import { useSendFeedback } from '@/api/worker'
import {
  Box,
  Button,
  Option,
  Select,
  Stack,
  Textarea,
  Typography,
} from '@mui/joy'
import React, { FC, useState } from 'react'

type FeedbackFormProps = {
  id: string
  workerId: string
}

const FeedbackForm: FC<FeedbackFormProps> = ({ workerId, id }) => {
  const { mutate: sendFeedback } = useSendFeedback(id)
  const [isShowForm, setIsShowForm] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackScore, setFeedbackScore] = useState(1)

  const onSend = () => {
    sendFeedback({ workerId, text: feedbackText, score: feedbackScore })
  }

  return (
    <Box>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography level="body-lg">Отзывы</Typography>
        {!isShowForm && (
          <Button onClick={() => setIsShowForm(true)}>Оставить отзыв</Button>
        )}
      </Stack>
      {isShowForm && (
        <Stack direction={'column'} gap={'5px'}>
          <Typography level="body-sm">Выберите оценку</Typography>
          <Box>
            <Select
              value={feedbackScore}
              onChange={(e) => {
                const text = (e?.target as { textContent: string }).textContent
                setFeedbackScore(parseInt(text))
              }}
            >
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
            </Select>
          </Box>

          <Textarea
            placeholder="Напишите ваш отзыв"
            minRows={5}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          ></Textarea>
          <Box>
            <Button onClick={() => onSend()}>Опубликовать</Button>
          </Box>
        </Stack>
      )}
    </Box>
  )
}

export default FeedbackForm
