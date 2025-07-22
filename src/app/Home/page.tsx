import type { FC } from 'react'

import Countdown from '@/components/Countdown'
import Hero from '@/components/Hero'
import LocationAndDate from '@/components/LocationAndDate'
import StoreCTA from '@/components/StoreCTA'

const HomePage: FC = () => (
  <>
    <Hero />
    <Countdown />
    <StoreCTA />
    <LocationAndDate />
  </>
)

export default HomePage
