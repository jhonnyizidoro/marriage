import type { FC, SVGAttributes } from 'react'

const PlusIcon: FC<SVGAttributes<SVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 800 762"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M800 342.905V419.095H440V761.952H360V419.095H0V342.905H360V0.0476074H440V342.905H800Z"
      fill="#FFFAF0"
    />
  </svg>
)

export default PlusIcon
