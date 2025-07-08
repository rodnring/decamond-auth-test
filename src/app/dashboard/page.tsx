'use client'

import styles from './Dashboard.module.scss' 
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  name: {
    first: string
    last: string
  }
  picture?: {
    thumbnail: string
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)


  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/auth')
  }


  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      router.push('/auth')
      return
    }

    try {
      const parsed: User = JSON.parse(stored)
      setUser(parsed)
    } catch {
      localStorage.removeItem('user')
      router.push('/auth')
    }
  }, [router])

  if (!user) return null

  return (
    <div className={styles.container}>
      <h1>خوش آمدید 👋</h1>
      <p>
        {user.name.first} {user.name.last}
      </p>
      {user.picture?.thumbnail && (
        <img src={user.picture.thumbnail} alt="Profile" className={styles.avatar} />
      )}

      <button onClick={handleLogout} className={styles.logoutButton}>
        خروج
      </button>
    </div>
  )
}

