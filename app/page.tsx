import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className='w-full bg-black text-white min-h-screen flex items-center justify-center'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
        <div className='flex flex-col lg:flex-row items-center justify-between'>
          <div className='lg:w-1/2 mb-10 lg:mb-0'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4'>
              Launch Your <span className='text-kaia'>Campaign</span> with Impact
            </h1>
            <p className='text-xl text-gray-300 mb-8'>
              Empower your ideas, reach your audience, and make a difference with our cutting-edge campaign platform.
            </p>
            <Link
              href={'/campaigns'}
              className='inline-flex bg-kaia hover:bg-opacity-80 text-black font-bold py-3 px-8  transition duration-300 ease-in-out items-center'
            >
              Get Started
              <ArrowRight className='ml-2 h-5 w-5' />
            </Link>
          </div>
          <div className='hidden lg:flex lg:w-1/2 justify-center'>
            <div className='w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96flex items-center justify-center'>
              <h1 className='text-[9rem] text-kaia'>{'{&}'}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
