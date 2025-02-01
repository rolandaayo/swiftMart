import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Container from './components/Container'
import Footer from './components/Footer'

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar/>
      <Hero/>
      <Container/>
      <Footer/>
    </main>
  )
}
