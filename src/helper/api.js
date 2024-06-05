import axios from "axios"
import { useQueryClient, useMutation, useQuery } from "react-query"

const registerVisitor = async (data) => {
  return await axios.post('http://localhost:8000/save-visitor', data)
}

const updateVisitor = async (id) => {
  return await axios.patch(`http://localhost:8000/update-visitor/${id}`)
}

const getVisitors = async (page) => {
  return await axios.get(`http://localhost:8000/get-all-visitors?page=${page}`)
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

export function useGetVisitorsQuery(page = 1) {
  return useQuery(
      ['useGetVisitorsQuery', page],
      () => getVisitors(page),
      {
          keepPreviousData: true,
          staleTime: Infinity,
          enabled: true,
      },
  )
}

export function useUpdateVisitorQuery() {
  const queryClient = useQueryClient()
  return useMutation((arg) => updateVisitor(arg), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['UpdateVisitor'])
      return data
    }
  })
}