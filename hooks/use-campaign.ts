import { Campaign } from '@/types/campaign'
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import Campaign_ABI from '@/abis/campaign-abi.json'
import { toast } from '@/hooks/use-toast'

const contractAddress = '0xb634c03f1eb8cb3e1fe6f6b3211e4d55799140c5'

export function useCampaign() {
  // Set up the contract write function
  const { data: hash, error, isPending, writeContract } = useWriteContract()

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

  // Call useWaitForTransactionReceipt at the top level of the hook

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash
  })

  return { allCampaign, donateToCampaign, isPending, error, hash, isConfirming, isConfirmed }
}
