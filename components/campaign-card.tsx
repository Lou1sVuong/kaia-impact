import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Campaign } from '@/types/campaign'
import { FolderIcon } from 'lucide-react'

interface CampaignCardProps {
  id: number
  campaign: Campaign
}

export function CampaignCard({ id, campaign }: CampaignCardProps) {
  const progress = Number((campaign.totalFunds * 100n) / campaign.target)
  const daysLeft = Math.ceil((Number(campaign.endTime) * 1000 - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <Link href={`/campaigns/${id}`}>
      <Card className='overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-zinc-900 border-zinc-800'>
        <CardContent className='p-0'>
          <div className='relative'>
            <img src={campaign.image} alt={campaign.title} className='w-full h-48 object-cover' />
            <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent'>
              <h3 className='text-lg font-medium text-white mb-1'>{campaign.title}</h3>
              <h4 className='text-sm text-zinc-400'>{campaign.title}</h4>
            </div>
          </div>
          <div className='p-4 pt-3'>
            <div className='flex items-center justify-between text-sm mb-2'>
              <span className='text-zinc-400'>
                {formatKAIA(campaign.totalFunds)} of {formatKAIA(campaign.target)} KAIA
              </span>
              <span className='text-zinc-400'>{daysLeft} Days Left</span>
            </div>
            <Progress value={progress} className='h-1 mb-3' />
            <div className='flex items-center gap-2 text-xs text-zinc-500'>
              <span>by</span>
              <code className='font-mono'>{truncateAddress(campaign.owner)}</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function formatKAIA(amount: bigint): string {
  return (Number(amount) / 1e9).toFixed(2)
}

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
