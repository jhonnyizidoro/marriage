import localFont from 'next/font/local'

const moneta = localFont({
  variable: '--moneta',
  src: [
    {
      path: './Moneta-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './Moneta-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Moneta-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})

export default moneta
