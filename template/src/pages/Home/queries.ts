import React from 'react'
import { useMutation } from 'react-query'
import { UseQueryOptions } from '@lib/types'
import { request } from '@utils/request'
import useQuery from '@lib/useQuery'
import type { MutationResult, MutationOptions } from '@lib/types'

export type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: number
      lng: number
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export const useUsers = (options?: UseQueryOptions) => {
  const { data, ...rest } = useQuery<User[]>(
    `https://jsonplaceholder.typicode.com/users`,
    options
  )

  return {
    ...rest,
    data,
  }
}

export const useQueryUser = ({
  variables,
  ...options
}: UseQueryOptions = {}) => {
  const [query, setQuery] = React.useState<{ [key: string]: any }>()
  const { data, ...rest } = useQuery<User>(
    `https://jsonplaceholder.typicode.com/users/{id}`,
    {
      ...options,
      variables: { ...variables, ...query },
      enabled: !!variables?.id || !!query?.id,
    }
  )

  const refetch = (values: { [key: string]: any }) => {
    setQuery(values)
  }

  return {
    ...rest,
    data,
    refetch,
  }
}

export const useCreateUser = (options: MutationOptions = {}) => {
  const { mutate, isLoading } = useMutation(
    (data: Partial<User>) =>
      request('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: data,
      }),
    {
      ...options,
    }
  )

  return [isLoading, mutate] as MutationResult
}

export const useUpdateUser = (options: MutationOptions = {}) => {
  const { mutate, isLoading } = useMutation(
    (data: Partial<User>) =>
      request('https://jsonplaceholder.typicode.com/users/{id}', {
        method: 'PATCH',
        body: data,
      }),
    {
      ...options,
    }
  )

  return [isLoading, mutate] as MutationResult
}
