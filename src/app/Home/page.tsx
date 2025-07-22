import type { FC } from 'react'

import Countdown from '@/components/Countdown'
import Hero from '@/components/Hero'

const HomePage: FC = () => (
  <>
    <Hero />
    <Countdown />
  </>
)

export default HomePage
