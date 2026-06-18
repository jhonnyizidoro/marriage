import type { FC, SVGAttributes } from 'react'

const DownloadIcon: FC<SVGAttributes<SVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3V15M12 15L7 10M12 15L17 10M5 21H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default DownloadIcon
