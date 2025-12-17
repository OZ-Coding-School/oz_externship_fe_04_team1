import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

export const useS3Upload = () => {
  return useMutation({
    mutationFn: ({ uploadUrl, file }: { uploadUrl: string; file: File }) =>
      axios.put(uploadUrl, file, {
        headers: { 'Content-Type': file.type },
      }),
  })
}
