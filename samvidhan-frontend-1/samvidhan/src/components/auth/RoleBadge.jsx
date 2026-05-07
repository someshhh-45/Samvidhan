import React from 'react'
import { getRoleBadgeClass } from '../../utils/roleUtils.js'

export default function RoleBadge({ role }) {
  return <span className={getRoleBadgeClass(role)}>{role}</span>
}
