import { Vote } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ThemeToggle  from '@/components/ui/ThemeToggle'

function Header() {


  return (
    <nav className="sticky p-2 top-0 z-50 border-b border-gray-300 dark:border-gray-950 backdrop-blur-xl bg-zinc-50/60 dark:bg-zinc-900/60">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Vote className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Choice Hub
            </span>
          </Link>

         
          {/* Right Section with Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header