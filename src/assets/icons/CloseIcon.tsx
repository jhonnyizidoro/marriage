import type { FC, SVGAttributes } from 'react'

const CloseIcon: FC<SVGAttributes<SVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 2.1225L18.8775 0L10.5 8.3775L2.1225 0L0 2.1225L8.3775 10.5L0 18.8775L2.1225 21L10.5 12.6225L18.8775 21L21 18.8775L12.6225 10.5L21 2.1225Z"
      fill="#260E00"
    />
  </svg>
)

export default CloseIcon
