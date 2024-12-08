'use client'

import Link from 'next/link'
import { Home, PlusCircle, LayoutDashboard, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import ConnectWalletBtn from '@/components/connect-wallet-btn'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useAccount } from 'wagmi'
import { ModeToggle } from '@/components/mode-toggle'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/campaigns', icon: LayoutDashboard, label: 'Campaigns' },
  { href: '/create', icon: PlusCircle, label: 'Create Campaign' }
]

export function Sidebar() {
  const { isConnected } = useAccount()
  return (
    <TooltipProvider>
      <div className='hidden lg:flex flex-col h-full w-20 bg-background border-r border-border'>
        <div className='flex-1 flex flex-col items-center justify-center space-y-6'>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link href={item.href}>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='w-14 h-14 rounded-full transition-all duration-300 ease-in-out hover:bg-secondary'
                  >
                    <item.icon className='h-6 w-6' />
                    <span className='sr-only'>{item.label}</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className='p-4'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Sheet>
                <SheetTrigger className='flex justify-center items-center w-14 h-14 rounded-full transition-all duration-300 ease-in-out hover:bg-secondary'>
                  <Wallet className='h-6 w-6' />
                  <span className='sr-only'>Connect Wallet</span>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Your Wallet</SheetTitle>
                    <SheetDescription>{isConnected ? '' : 'Connect your wallet to see detail'}</SheetDescription>
                    <ConnectWalletBtn />
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </TooltipTrigger>
            <TooltipContent side='right'>
              <p>Connect Wallet</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
