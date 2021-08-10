import React from 'react'
import { message } from 'antd'
import { envStore, endpoints } from '@utils/env'

const preserveCamelCase = (string: string) => {
  let isLastCharLower = false
  let isLastCharUpper = false
  let isLastLastCharUpper = false

  for (let i = 0; i < string.length; i++) {
    const character = string[i]

    if (
      isLastCharLower &&
      /[a-zA-Z]/.test(character) &&
      character.toUpperCase() === character
    ) {
      string = string.slice(0, i) + '-' + string.slice(i)
      isLastCharLower = false
      isLastLastCharUpper = isLastCharUpper
      isLastCharUpper = true
      i++
    } else if (
      isLastCharUpper &&
      isLastLastCharUpper &&
      /[a-zA-Z]/.test(character) &&
      character.toLowerCase() === character
    ) {
      string = string.slice(0, i - 1) + '-' + string.slice(i - 1)
      isLastLastCharUpper = isLastCharUpper
      isLastCharUpper = false
      isLastCharLower = true
    } else {
      isLastCharLower =
        character.toLowerCase() === character &&
        character.toUpperCase() !== character
      isLastLastCharUpper = isLastCharUpper
      isLastCharUpper =
        character.toUpperCase() === character &&
        character.toLowerCase() !== character
    }
  }

  return string
}

const camelCase = (
  input: string | string[],
  options: { pascalCase?: boolean } = {}
) => {
  if (!(typeof input === 'string' || Array.isArray(input))) {
    throw new TypeError('Expected the input to be `string | string[]`')
  }

  options = Object.assign(
    {
      pascalCase: false,
    },
    options
  )

  const postProcess = (x: string) =>
    options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x

  if (Array.isArray(input)) {
    input = input
      .map(x => x.trim())
      .filter(x => x.length)
      .join('-')
  } else {
    input = input.trim()
  }

  if (input.length === 0) {
    return ''
  }

  if (input.length === 1) {
    return options.pascalCase ? input.toUpperCase() : input.toLowerCase()
  }

  const hasUpperCase = input !== input.toLowerCase()

  if (hasUpperCase) {
    input = preserveCamelCase(input)
  }

  input = input
    .replace(/^[_.\- ]+/, '')
    .toLowerCase()
    .replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase())
    .replace(/\d+(\w|$)/g, m => m.toUpperCase())

  return postProcess(input)
}

function mergeDeep(target: any, source: any) {
  const isObject = (obj: any) => obj && typeof obj === 'object'

  if (!isObject(target) || !isObject(source)) {
    return source
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key]
    const sourceValue = source[key]

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue)
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue)
    } else {
      target[key] = sourceValue
    }
  })

  return target
}

/**
 * replate variables of url，ex: /v1/api/user/{id} into /v1/api/user/5
 * @param url API Url
 * @param body Query Parameters
 */
export function format(url: string, params: { [key: string]: any } = {}) {
  const regex = /(\{.+?\})/gi
  const _params = { ...params }

  const _url = url.replace(regex, v => {
    const replacable = v[0] === '{'

    if (!replacable) {
      return v
    }

    const propName = v.slice(1, -1)
    const replacedValue = _params[propName]

    _params[propName] = undefined

    return replacedValue
  })

  return { fullUrl: _url, params: _params }
}

interface RequestInit_ {
  body?: any
  credentials?: RequestCredentials
  headers?: HeadersInit
  integrity?: string
  keepalive?: boolean
  method?: 'DELETE' | 'PUT' | 'PATCH' | 'GET' | 'POST'
  mode?: RequestMode
  referrer?: string
  window?: any
  displayError?: boolean
  displayMessage?: boolean
  okText?: string
  throwable?: boolean
  withToken?: boolean
  endpoint?: 'apiBaseUrl'
  signal?: AbortSignal | null | undefined
  onError?: (err: Error) => any
  onSuccess?: (data: any) => any
}

export function useMeta() {
  const [loading, setIsLoading] = React.useState(false)

  const withMeta = React.useCallback((handler: any) => {
    setIsLoading(true)

    return handler()
      .then((response: any) => response)
      .finally(() => setIsLoading(false))
  }, [])

  return [loading, withMeta] as [boolean, (handler: any) => any]
}

export function toQueryString(
  paramsObject: {
    [key: string]: any
  } = {}
) {
  if (!paramsObject) {
    return ''
  }

  return Object.keys(paramsObject)
    .filter(
      (key: string) =>
        paramsObject[key] !== '' &&
        paramsObject[key] !== null &&
        typeof paramsObject[key] !== 'undefined'
    )
    .map((key: string) =>
      Array.isArray(paramsObject[key])
        ? // convert to key=val1,val2,val3 string
          `${key}=${paramsObject[key]
            .map((val: string | number) => `${encodeURIComponent(val)}`)
            .join(',')}`
        : // convert to key=val string
          `${key}=${encodeURIComponent(paramsObject[key])}`
    )
    .join('&')
}

interface UseRequestOptions extends RequestInit_ {
  lazy?: boolean
  variables?: { [key: string]: any }
}

export function useRequest<T = any>(
  url: string,
  { lazy = true, variables = {}, ..._options }: UseRequestOptions = {}
) {
  const called = React.useRef(false)

  const [loading, withMeta] = useMeta()

  const [data, setData] = React.useState<T>()

  const [error, setError] = React.useState<Error>()

  const controllerRef = React.useRef<AbortController | null>(null)

  React.useEffect(() => {
    return function cleanup() {
      if (controllerRef.current && loading) {
        controllerRef.current.abort()
      }
    }
  }, [loading])

  const _refetch = (data: { [key: string]: any } = {}) => {
    let { fullUrl, params } = format(url, mergeDeep(variables, data))

    if (_options.method === 'GET') {
      fullUrl = `${fullUrl}?${toQueryString(params)}`
    }

    if (controllerRef.current) {
      controllerRef.current.abort()
    }

    controllerRef.current = new AbortController()

    return withMeta(async () => {
      const response = await request<T>(fullUrl, {
        ..._options,
        ...(_options.method !== 'GET' ? { body: data } : {}),
        signal: controllerRef.current?.signal,
        onSuccess: response => {
          if (_options.onSuccess) {
            _options.onSuccess({ data, response })
          }

          setData(response)
        },
        onError: error => {
          if (_options.onError) {
            _options.onError(error)
          }

          setError(error)
        },
      })

      controllerRef.current = null

      return response
    })
  }

  React.useEffect(() => {
    if (!lazy && !called.current) {
      _refetch()

      called.current = true
    }
  }, [lazy, called]) // eslint-disable-line

  return {
    loading,
    mutate: _refetch as (
      v?: { [key: string]: any } | { [key: string]: any }[]
    ) => Promise<T>,
    data,
    error,
    called,
  }
}

const contentTypeIs = (s: string) => {
  return (response: Response) =>
    response?.headers?.get('content-type')?.includes(s)
}

const convertObjectKeys: any = (
  object: any[] | { [key: string]: any },
  keypath: string[] = []
) => {
  if (!object || typeof object !== 'object') {
    return object
  }

  if (Array.isArray(object)) {
    return object.map((o, index) =>
      convertObjectKeys(o, [...keypath, String(index)])
    )
  }

  return Object.keys(object).reduce((acc: any, key: string) => {
    let value = object[key]

    const nestedKeyPath = [...keypath, key]

    acc[camelCase(key)] = convertObjectKeys(value, nestedKeyPath)
    return acc
  }, {})
}

export function request<T = any>(
  url: string,
  {
    body,
    headers,
    displayError = true,
    displayMessage = true,
    withToken = true,
    throwable = true,
    okText,
    onSuccess,
    onError,
    endpoint,
    ...options
  }: RequestInit_ = {}
): Promise<T> {
  const _url = (() => {
    let result = url
    if (result.includes('http')) {
      return result
    }
    if (endpoint) {
      return (endpoints[endpoint] ?? envStore.apiBaseUrl) + url
    }
    return envStore.apiBaseUrl + url
  })()

  let _fullUrl = _url

  const isForm = body instanceof FormData

  if (!isForm) {
    let formatted = format(_fullUrl, body)
    _fullUrl = formatted.fullUrl

    if (options.method === 'GET') {
      _fullUrl = `${_fullUrl}?${toQueryString(formatted.params)}`
    }
  }

  return fetch(_fullUrl, {
    ...options,
    body: isForm ? body : JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
  })
    .then(async (response: Response) => {
      const isMutate =
        !!options.method && !!displayMessage && options.method !== 'GET'

      if (isMutate) {
        message.success({
          content: okText || 'update successfully',
          type: 'success',
        })
      }

      let result: any

      if (response.status === 404) {
        return Promise.reject(response.statusText)
      }

      if (contentTypeIs('application/json')(response)) {
        result = await response.json()

        if (!response.ok) {
          return Promise.reject(result)
        }

        result = convertObjectKeys(result)
      }

      if (contentTypeIs('sheet')(response)) {
        result = await response.blob()
      }

      if (!result) {
        result = await response.text()
      }

      if (onSuccess) {
        onSuccess(result)
      }

      return result
    })
    .catch((err: Error) => {
      if (displayError) {
        message.error(err)
      }

      if (onError) {
        onError(err.message as any)
      }

      if (throwable) {
        throw err
      }

      return err
    })
}

export default request
