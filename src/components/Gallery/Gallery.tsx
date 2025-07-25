import Image from 'next/image'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { FC } from 'react'

import Container from '@/components/Container'

import styles from './Gallery.module.scss'

const dir = join(process.cwd(), 'public/gallery')
const images = readdirSync(dir)

const Gallery: FC = () => (
  <Container className={styles.container}>
    {images.map((src) => (
      <Image
        className={styles.image}
        key={src}
        src={`/gallery/${src}`}
        alt=""
        width={520}
        height={750}
      />
    ))}
  </Container>
)

export default Gallery
