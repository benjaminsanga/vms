import axios from "axios"
import { useQueryClient, useMutation, useQuery } from "react-query"

const registerVisitor = async (data) => {
  return await axios.get('https://catfact.ninja/fact')
}

const getVisitors = async () => {
  return {}
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

export function useGetVisitorsQuery(page = 1, limit = 10, search = '') {
  return useQuery(
      ['useGetVisitorsQuery', page, limit, search],
      () => getVisitors(page, limit, search),
      {
          keepPreviousData: true,
          staleTime: Infinity,
          enabled: true,
      },
  )
}