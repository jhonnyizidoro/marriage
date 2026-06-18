import Image from 'next/image'
import Link from 'next/link'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { FC } from 'react'

import Container from '@/components/Container'

import DownloadIcon from '@/assets/icons/DownloadIcon'

import styles from './Gallery.module.scss'

const dir = join(process.cwd(), 'public/gallery/thumbnail')
const images = readdirSync(dir)
  .filter((file) => file.endsWith('.jpg'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

type Props = {
  type: 'full' | 'preview'
}

const getRandomImages = (items: string[], count: number) => {
  const shuffled = [...items].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

const Gallery: FC<Props> = ({ type }) => {
  const displayedImages =
    type === 'preview' ? getRandomImages(images, 20) : images

  return (
    <Container className={styles.container}>
      {displayedImages.map((src) => (
        <div className={styles.imageWrapper} key={src}>
          <Link
            href={`/gallery/fhd/${src}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver imagem em tamanho completo"
          >
            <Image
              className={styles.image}
              src={`/gallery/thumbnail/${src}`}
              alt=""
              width={520}
              height={750}
              quality={90}
              data-grayscale={type === 'preview'}
            />
          </Link>
          <Link
            className={styles.downloadButton}
            href={`/gallery/fhd/${src}`}
            download
            aria-label="Baixar imagem"
          >
            <DownloadIcon width={18} />
          </Link>
        </div>
      ))}
    </Container>
  )
}

export default Gallery
