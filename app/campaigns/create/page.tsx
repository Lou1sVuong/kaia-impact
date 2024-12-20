'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { CreateCampaignForm } from './create-campaign-form'
import ConnectWalletBtn from '@/components/connect-wallet-btn'

export default function CreateCampaignPage() {
  const router = useRouter()

  return (
    <div className='min-h-screen bg-background p-8'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold'>Create New Campaign</h1>
          <div className='flex gap-4'>
            <ConnectWalletBtn />
            <Button variant='outline' onClick={() => router.push('/campaigns')}>
              Back to Campaigns
            </Button>
          </div>
        </div>
        <CreateCampaignForm />
      </div>
    </div>
  )
}
