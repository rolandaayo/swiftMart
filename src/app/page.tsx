'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from './utils/auth'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Container from './components/Container'
import Footer from './components/Footer'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  return (
    <main className="min-h-screen">
      <Navbar/>
      <Hero/>
      <Container/>
      <Footer/>
    </main>
  );
}
