'use client'

interface Props {
  error: Error

}

const ErrorMessage = ({ error }: Props) => {
  console.error('error Log:', error)
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
    </div>
  )
}

export default ErrorMessage







