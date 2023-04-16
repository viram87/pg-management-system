import React from 'react'

const ErrorMessage = ({ message }) => {
  return (
    <div className="text-red-500 outfit-regular mt-1 text-sm">{message}</div>
  )
}

export default ErrorMessage