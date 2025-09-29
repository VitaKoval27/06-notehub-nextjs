'use client'

interface Props {
  error: Error
  reset: () => void
}

const ErrorMessage = ({ error, reset }: Props) => {
  console.error('error Log:', error)
  return (
    <div>
      <h1>Could not fetch the list of notes. {error.message}</h1>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default ErrorMessage


