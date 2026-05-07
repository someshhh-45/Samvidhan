const KEY = 'samvidhan_token'

export const getToken   = () => localStorage.getItem(KEY)
export const setToken   = (t) => localStorage.setItem(KEY, t)
export const removeToken = () => localStorage.removeItem(KEY)

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
