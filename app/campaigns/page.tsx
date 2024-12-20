'use client'

import { useState, useEffect } from 'react'
import { CampaignCard } from '@/components/campaign-card'
import { Button } from '@/components/ui/button'
import { Campaign } from '@/types/campaign'
import { useCampaign } from '@/hooks/use-campaign'
import { CreateCampaignForm } from './create/create-campaign-form'

export default function Home() {
  const { allCampaign } = useCampaign()
  const [campaigns, setCampaigns] = useState<Campaign[]>(allCampaign.data as Campaign[])
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    if (allCampaign.data) {
      setCampaigns(allCampaign.data as Campaign[])
    }
  }, [allCampaign.data])

  return (
    <div className='min-h-screen bg-background p-8'>
      {showCreateForm ? (
        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-4xl font-bold mb-8 text-center'>Create New Campaign</h1>
          <CreateCampaignForm />
          <Button onClick={() => setShowCreateForm(false)} className='mt-4'>
            Back to Campaigns
          </Button>
        </div>
      ) : (
        <>
          <div className='container mx-auto px-4 pb-12 bg-background'>
            <h2 className='text-3xl font-bold mb-8'>All Campaigns</h2>
            {campaigns ? (
              campaigns.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {campaigns.map((campaign, index) => (
                    <CampaignCard key={index} id={index} campaign={campaign} />
                  ))}
                </div>
              ) : (
                <p>No campaigns available.</p>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
