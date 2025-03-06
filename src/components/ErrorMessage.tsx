import { useEffect } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify'

const ErrorMessage = () => (
  <>
    <div className="flex flex-col text-left">
      <p className="font-bold">Oh Snap!</p>
      <p className="leading-5" role="alert">
        Something went... <br /> on a wrong adventure.
      </p>
    </div>
    <button
      aria-label="Reload page after an error"
      onClick={() => window.location.reload()}
      className="absolute right-4 cursor-pointer rounded border-1 border-solid p-1 text-white"
    >
      <p className="text-md">Try Again</p>
    </button>
  </>
)

export default function () {
  useEffect(() => {
    toast.error(<ErrorMessage />, {
      position: 'top-center',
      transition: Bounce,
      theme: 'colored',
      role: 'alert',
      hideProgressBar: true,
      closeButton: false,
      autoClose: false,
    })
  }, [])

  return <ToastContainer />
}
