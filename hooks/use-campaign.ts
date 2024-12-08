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

  // Call useWaitForTransactionReceipt at the top level of the hook

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash
  })

  return { allCampaign, isPending, error, hash, isConfirming, isConfirmed }
}
