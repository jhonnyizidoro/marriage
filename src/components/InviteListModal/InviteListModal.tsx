import { type FC } from 'react'

import Modal from '@/components/Modal'

type Props = {
  invites: string[]
  params: string[]
  title: string
}

const InviteListModal: FC<Props> = ({ invites, params, title }) => (
  <Modal params={params} title={title} cancelLabel="Fechar">
    {invites.map((name, i) => (
      <div key={i}>{name}</div>
    ))}
  </Modal>
)

export default InviteListModal
