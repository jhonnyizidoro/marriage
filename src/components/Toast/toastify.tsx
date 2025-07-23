import { renderToString } from 'react-dom/server'

import Toast, { Props } from '@/components/Toast'

const toastify = ({ message }: Omit<Props, 'bottom'>) => {
  const activeToasts = document.querySelectorAll('.__TOAST__')
  const bottom = (activeToasts.length + 1) * 10
  const html = renderToString(<Toast message={message} bottom={bottom} />)
  const wrapper = document.createElement('div')
  wrapper.innerHTML = html
  wrapper.style.transition = '1s'
  document.body.append(wrapper)
  const closeBtn = wrapper.querySelector('button')
  closeBtn?.addEventListener('click', () => wrapper.remove())
  setTimeout(() => wrapper.remove(), 5000)
}

export default toastify
