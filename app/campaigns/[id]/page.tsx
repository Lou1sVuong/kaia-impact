'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Campaign } from '@/types/campaign'
import { Progress } from '@/components/ui/progress'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCampaign } from '@/hooks/use-campaign'
import AddressCardHover from '@/components/address-card-hover'
import { toast } from '@/hooks/use-toast'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

export default function CampaignPage() {
  const params = useParams()
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const { allCampaign, donateToCampaign, withdrawDonation, isPending } = useCampaign()
  const [donateAmount, setDonateAmount] = useState<string>('')

  useEffect(() => {
    if (allCampaign.data) {
      const campaignId = typeof params.id === 'string' ? parseInt(params.id, 10) : -1
      const fetchedCampaign = (allCampaign.data as Campaign[])[campaignId]
      setCampaign(fetchedCampaign || null)
    }
  }, [params.id, allCampaign.data])

  if (allCampaign.isLoading) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <p className='text-white text-2xl'>Loading campaign...</p>
      </div>
    )
  }

  if (allCampaign.error) {
    return (
      <div className='min-h-screen bg-black flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold mb-8 text-center text-white'>Error loading campaign</h1>
        <p className='text-red-500 mb-4'>{allCampaign.error.message}</p>
        <Link href='/'>
          <Button className='bg-purple-600 hover:bg-purple-700'>Back to Home</Button>
        </Link>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className='min-h-screen bg-black flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold mb-8 text-center text-white'>Campaign Not Found</h1>
        <Link href='/'>
          <Button className='bg-purple-600 hover:bg-purple-700'>Back to Home</Button>
        </Link>
      </div>
    )
  }

  const handleDonate = async (amount: number) => {
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid donation amount.'
      })
      return
    }
    try {
      await donateToCampaign({ _id: params.id as string, amount })
      toast({
        title: 'Success',
        description: 'Donation successful!'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to donate to campaign.'
      })
    }
  }

  const daysLeft = Math.ceil((Number(campaign.endTime) * 1000 - Date.now()) / (1000 * 60 * 60 * 24))
  const progress = Number((campaign.totalFunds * 100n) / campaign.target)
  const raisedAmount = formatKAIA(campaign.totalFunds)
  const targetAmount = formatKAIA(campaign.target)

  const getTimeStatus = () => {
    if (daysLeft <= 0) {
      return 'Ended'
    }
    return `${daysLeft}`
  }

  // Aggregate donations by donor
  const aggregateDonations = () => {
    const donationMap = new Map<string, bigint>()
    campaign.donators.forEach((donator, index) => {
      const currentAmount = donationMap.get(donator) || BigInt(0)
      donationMap.set(donator, currentAmount + campaign.donations[index])
    })
    return Array.from(donationMap.entries()).sort((a, b) => (b[1] > a[1] ? 1 : -1))
  }

  const aggregatedDonations = aggregateDonations()

  return (
    <div className='min-h-screen bg-black p-8'>
      <div className='relative'>
        <img src={campaign.image} alt='Campaign Cover' className='w-full h-[60vh] object-cover' />
        <div className='absolute bottom-0 left-0 w-full h-1'>
          <Progress value={progress} className='mt-2' />
        </div>
      </div>

      <div className='container mx-auto py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Creator Section */}
            <section>
              <h2 className='text-xl font-semibold mb-4 text-zinc-200'>CREATOR</h2>
              <div className='flex items-center space-x-4'>
                <img
                  src={`https://s2.coinmarketcap.com/static/img/coins/200x200/32880.png`}
                  className='w-12 h-12 flex items-center justify-center text-white'
                  alt="Creator's avatar"
                />
                <div>
                  <AddressCardHover address={campaign.owner} />
                  {/* <p className='text-sm text-zinc-500'>10 campaigns</p> */}
                </div>
              </div>
            </section>

            {/* Story Section */}
            <section>
              <h2 className='text-xl font-semibold mb-4 text-zinc-200'>STORY</h2>
              <p className='text-zinc-400 leading-relaxed'>{campaign.description}</p>
            </section>

            {/* Donators Section */}
            <section>
              <h2 className='text-xl font-semibold mb-4 text-zinc-200'>DONATORS</h2>
              <div className='space-y-4'>
                {aggregatedDonations.map(([donator, amount], index) => (
                  <div key={donator} className='flex items-center justify-between text-zinc-400'>
                    <span className='flex gap-2'>
                      {index + 1}. <AddressCardHover address={donator} />
                    </span>
                    <span>{formatKAIA(amount)} KAIA</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <div className='sticky top-4 space-y-6 bg-zinc-900 p-6'>
              {/* Stats */}
              <div className='grid grid-cols-3 gap-4 mb-6'>
                <div className='flex flex-col justify-center items-center text-center border border-border p-4'>
                  <p className='text-2xl font-bold text-white'>{getTimeStatus()}</p>
                  {daysLeft < 0 ? '' : <p className='text-sm text-zinc-500'>Days Left</p>}
                </div>
                <div className='text-center  border border-border p-4'>
                  <p className='text-2xl font-bold text-white line-clamp-1'>{raisedAmount}</p>
                  <p className='text-sm text-zinc-500 '>Raised of {targetAmount}</p>
                </div>
                <div className='text-center  border border-border p-4'>
                  <p className='text-2xl font-bold text-white'>{aggregatedDonations.length}</p>
                  <p className='text-sm text-zinc-500'>Total Backers</p>
                </div>
              </div>

              {/* Fund Form */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-zinc-200'>Fund the campaign</h3>
                <Input
                  type='number'
                  step='0.01'
                  min='0.01'
                  placeholder='KAIA 0.1'
                  className='bg-zinc-800 border-zinc-700'
                  onChange={(e) => setDonateAmount(e.target.value)}
                />
                <p className='text-sm text-zinc-400'>Back it because you believe in it.</p>
                <p className='text-xs text-zinc-500'>
                  Support the project for no reward, just because it speaks to you.
                </p>
                <Button
                  onClick={() => handleDonate(parseFloat(donateAmount))}
                  disabled={!donateAmount || parseFloat(donateAmount) <= 0}
                  className='w-full bg-kaia hover:bg-kaia hover:opacity-85'
                >
                  Fund Campaign
                </Button>
                {campaign.owner === address ? (
                  <Button className='w-full bg-kaia hover:bg-kaia hover:opacity-85'>Withdraw Funds</Button>
                ) : null}
                {campaign.donators.includes(address as string) && (
                  <Button
                    onClick={() => withdrawDonation({ _id: params.id as string })}
                    className='w-full bg-kaia hover:bg-kaia hover:opacity-85'
                  >
                    Withdraw Donation
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatKAIA(amount: bigint, decimals = 2): string {
  const intPart = amount / BigInt(10 ** 18) // Get the integer part
  const decimalPart = amount % BigInt(10 ** 18) // Get the remainder (decimal part)
  const decimalStr = (Number(decimalPart) / 10 ** 18).toFixed(decimals).split('.')[1] // Round
  return `${intPart}.${decimalStr}`
}
