import { Campaign } from '@/types/campaign'
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi'
import Campaign_ABI from '@/abis/campaign-abi.json'
import { toast } from '@/hooks/use-toast'

const contractAddress = '0xb634c03f1eb8cb3e1fe6f6b3211e4d55799140c5'

interface CreateCampaignParams {
  title: string
  description: string
  target: number
  startTime: number
  endTime: number
  image: string
}

export function useCampaign() {
  // Set up the contract write function
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const { address } = useAccount()

  const allCampaign = useReadContract({
    address: contractAddress,
    abi: Campaign_ABI,
    functionName: 'getCampaigns'
  })

  async function donateToCampaign({ _id, amount }: { _id: string; amount: number }) {
    const value = BigInt(Math.floor(amount * 10 ** 18))
    try {
      await writeContract({
        address: contractAddress,
        abi: Campaign_ABI,
        functionName: 'donateToCampaign',
        args: [_id],
        value
      })
      toast({
        title: 'Success',
        description: `Donation of ${amount} successfully sent!`
      })
    } catch (error) {
      console.error('Donation Error:', error)
      toast({
        title: 'Error',
        description: 'An error occurred while donating to the campaign.'
      })
    }
  }

  async function createCampaign({
    title,
    description,
    target,
    startTime,
    endTime,
    image
  }: CreateCampaignParams) {
    try {
      const targetInWei = BigInt(Math.floor(target * 10 ** 18))
      
      await writeContract({
        address: contractAddress,
        abi: Campaign_ABI,
        functionName: 'createCampaign',
        args: [
          address,
          title,
          description,
          targetInWei,
          BigInt(startTime),
          BigInt(endTime),
          image
        ]
      })

      toast({
        title: 'Success',
        description: 'Campaign created successfully!'
      })
    } catch (error) {
      console.error('Create Campaign Error:', error)
      toast({
        title: 'Error',
        description: 'An error occurred while creating the campaign.'
      })
    }
  }

  async function withdrawDonation({ _id }: { _id: string }) {
    try {
      await writeContract({
        address: contractAddress,
        abi: Campaign_ABI,
        functionName: 'withdrawDonations',
        args: [_id]
      })

      toast({
        title: 'Success',
        description: 'Successfully withdrawn your donation!'
      })
    } catch (error) {
      console.error('Withdrawal Error:', error)
      toast({
        title: 'Error',
        description: 'An error occurred while withdrawing your donation.'
      })
    }
  }

  // Call useWaitForTransactionReceipt at the top level of the hook

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash
  })

  return { allCampaign, donateToCampaign, createCampaign, withdrawDonation, isPending, error, hash, isConfirming, isConfirmed }
}
