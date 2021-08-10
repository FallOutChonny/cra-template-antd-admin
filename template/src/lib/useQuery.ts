import { useQuery as useReactQuery } from 'react-query'
import { UseQueryOptions } from '@lib/types'

export default function useQuery<TData = unknown, TError = unknown>(
  key: string,
  options: UseQueryOptions = {}
) {
  const { variables, ...others } = options

  const { data, ...rest } = useReactQuery<TData, TError>([key, variables], {
    suspense: false,
    cacheTime: 0,
    keepPreviousData: true,
    ...(others as any),
  })

  return {
    ...rest,
    data,
  }
}
