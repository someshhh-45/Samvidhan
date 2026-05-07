const KEY = 'samvidhan_token'

export const getToken = () => localStorage.getItem(KEY)

export const setToken = token =>
  localStorage.setItem(KEY, token)

export const removeToken = () =>
  localStorage.removeItem(KEY)

export function decodeToken(token) {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export function isTokenExpired(token) {
  const decoded = decodeToken(token)

  if (!decoded?.exp) return true

  return decoded.exp * 1000 < Date.now()
}

export function isAuthenticated() {
  const token = getToken()

  if (!token) return false

  return !isTokenExpired(token)
}