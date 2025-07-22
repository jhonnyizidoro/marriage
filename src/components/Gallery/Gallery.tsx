import splitArrayIntoGroups from '@/utils/splitArrayIntoGroups'
import Image from 'next/image'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { FC } from 'react'

import Container from '@/components/Container'

import styles from './Gallery.module.scss'

const dir = join(process.cwd(), 'public/gallery')
const images = readdirSync(dir)
const groups = splitArrayIntoGroups(images, 3)

const Gallery: FC = () => (
  <Container className={styles.container}>
    {groups.map((col, i) => (
      <div key={i} className={styles.column}>
        {col.map((src) => (
          <Image
            className={styles.image}
            key={src}
            src={`/gallery/${src}`}
            alt=""
            width={1000}
            height={1000}
          />
        ))}
      </div>
    ))}
  </Container>
)

export default Gallery
