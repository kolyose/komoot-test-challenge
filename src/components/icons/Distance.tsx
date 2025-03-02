import React from 'react'

const Distance = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      role="presentation"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.17 13l-3.58 3.59L16 18l6-6-6-6-1.41 1.41L18.17 11H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13h12.34z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export default Distance
