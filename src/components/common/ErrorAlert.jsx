import React from 'react'

export default function ErrorAlert({ message }) {
  if (!message) return null
  return (
    <div className="error-alert">
      <span>⚠️</span>
      <span>{message}</span>
    </div>
  )
}
