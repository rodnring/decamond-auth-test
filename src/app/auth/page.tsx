
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Auth.module.scss'

export default function AuthPage() {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const isValidPhone = (num: string) => /^09\d{9}$/.test(num)

  const handleLogin = async () => {
    if (!isValidPhone(phone)) {
      setError('شماره موبایل معتبر نیست')
      return
    }

    setError('')
    try {
      const res = await fetch('https://randomuser.me/api/?results=1&nat=us')
      const data = await res.json()

      localStorage.setItem('user', JSON.stringify(data.results[0]))
      router.push('/dashboard')
    } catch (err) {
      setError('خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.')
    }
  }

  return (
    <div className={styles.container}>
      <h1>ورود</h1>
      <div className={styles.form}>
        <input
          type="tel"
          placeholder="09123456789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={handleLogin} className={styles.button}>
          ورود
        </button>
      </div>
    </div>
  )
}
