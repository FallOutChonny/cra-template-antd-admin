class EnvStore {
  pageSize = 10
  apiBaseUrl = process.env.REACT_APP_API_ROOT || 'http://localhost:3000/api'

  get isEnvDev(): boolean {
    return process.env.NODE_ENV === 'development'
  }
  get appBaseName(): string {
    return process.env.REACT_APP_BASENAME || ''
  }
  get publicUrl(): string {
    return process.env.PUBLIC_URL || ''
  }
  get appUrl(): string {
    return `${window.location.protocol}//${window.location.host}${this.appBaseName}`
  }
  get canUseDOM(): boolean {
    return !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )
  }
}

export const envStore = new EnvStore()

export const endpoints = {
  apiBaseUrl: envStore.apiBaseUrl,
}

export const publicUrl = envStore.publicUrl

export default envStore
