import axios from "axios"
import { useQueryClient, useMutation } from "react-query"

const registerVisitor = async data => {
  return await axios.get('https://cdn2.thecatapi.com/images/ebv.jpg')
}

export function useRegisterVisitorQuery() {
  const queryClient = useQueryClient()
  return useMutation((arg) => registerVisitor(arg), {
      onSuccess: (data) => {
          queryClient.invalidateQueries(['RegisterVisitor'])
          return data
      },
  })
}