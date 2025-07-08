
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      router.replace('/dashboard')
    } else {
      router.replace('/auth')
    }
  }, [router])


  return <p style={{ textAlign: 'center', marginTop: '3rem' }}>در حال انتقال...</p>
}
