export const ROLES = { ADMIN: 'admin', OFFICER: 'officer', VIEWER: 'viewer' }

export const hasRole   = (user, role) => user?.role === role
export const isAdmin   = (user) => user?.role === ROLES.ADMIN
export const isOfficer = (user) => [ROLES.ADMIN, ROLES.OFFICER].includes(user?.role)

export function getRoleBadgeClass(role) {
  switch (role) {
    case ROLES.ADMIN:   return 'role-badge role-admin'
    case ROLES.OFFICER: return 'role-badge role-officer'
    default:            return 'role-badge role-viewer'
  }
}
