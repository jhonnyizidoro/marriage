import type { FC, SVGAttributes } from 'react'

const GiftIcon: FC<SVGAttributes<SVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 800 750"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M150 150V0H250C332.842 0 400 67.1575 400 150C400 67.1575 467.158 0 550 0H650V150H800V300H0V150H150Z"
      fill="#FFFAF0"
    />
    <path d="M50 400H350V750H50V400Z" fill="#FFFAF0" />
    <path d="M750 400H450V750H750V400Z" fill="#FFFAF0" />
  </svg>
)

export default GiftIcon
