import env from '@/env'
import getDate from '@/utils/getDate'
import getTime from '@/utils/getTIme'
import Link from 'next/link'
import type { FC } from 'react'

import Container from '@/components/Container'
import TableHeader from '@/components/TableHeader'
import TableRow from '@/components/TableRow'

import GoogleMapsIcon from '@/assets/icons/GoogleMapsIcon'
import WazeIcon from '@/assets/icons/WazeIcon'

import styles from './LocationAndDate.module.scss'

type Props = {
  showIframe?: boolean
}

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(env.address)}`

const wazeLink = `https://waze.com/ul?q=${encodeURIComponent(env.address)}`

const agenda = [
  {
    title: 'Início do evento',
    duration: 60,
  },
  {
    title: 'Cerimônia',
    duration: 60,
  },
  {
    title: 'Fotos',
    duration: 60,
  },
  {
    title: 'Jantar',
    duration: 90,
  },
  {
    title: 'Abertura da pista',
    duration: 30,
  },
  {
    title: 'Banda',
    duration: 90,
  },
  {
    title: 'DJ',
    duration: 120,
  },
].map((item, index, agg) => {
  const aggDurations = agg
    .slice(0, index)
    .reduce((agg, i) => agg + i.duration, 0)
  const startsAt = new Date(env.marriageDate)
  startsAt.setMinutes(startsAt.getMinutes() + aggDurations)

  return {
    title: item.title,
    startsAt: getTime(startsAt.toISOString()),
  }
})

const LocationAndDate: FC<Props> = ({ showIframe }) => (
  <div className={styles.wrapper}>
    <Container size="medium">
      <h2 className={styles.title}>Local e horário</h2>
      <p className={styles.text}>
        Nosso casamento acontecerá no dia{' '}
        <strong>{getDate(env.marriageDate)}</strong>, com início previsto para
        às <strong>{getTime(env.marriageDate)}</strong>. A cerimônia será
        realizada no espaço <strong>{env.address}</strong>. Pedimos com muito
        carinho que todos os convidados cheguem com pelo menos 15 minutos de
        antecedência, para que possamos iniciar o evento no horário previsto e
        garantir que todos aproveitem cada momento da cerimônia. O local conta
        com estacionamento gratuito e seguro, localizado logo na entrada
        principal, com sinalização e equipe disponível para orientar os
        veículos.
      </p>
      <div className={styles.links}>
        <Link className={styles.link} target="_blank" href={mapsLink}>
          <GoogleMapsIcon width={24} />
          Abrir no Google maps
        </Link>
        <Link className={styles.link} target="_blank" href={wazeLink}>
          <WazeIcon width={24} />
          Abrir no Waze
        </Link>
      </div>
      {showIframe && (
        <div className={styles.iframeWrapper}>
          <iframe
            className={styles.iframe}
            loading="lazy"
            src={`https://www.google.com/maps?q=${env.address}&output=embed`}
          />
        </div>
      )}
    </Container>
    <Container size="small">
      <TableHeader>Agenda</TableHeader>
      {agenda.map((item, i) => (
        <TableRow key={i} className={styles.agendaItem}>
          <span>{item.title}</span>
          <strong>{item.startsAt}</strong>
        </TableRow>
      ))}
    </Container>
  </div>
)

export default LocationAndDate
