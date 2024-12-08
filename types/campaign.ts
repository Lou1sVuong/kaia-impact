export interface Campaign {
  amountStreamed: bigint
  description: string
  donations: bigint[]
  donators: string[]
  endTime: bigint
  image: string
  lastStreamedTimestamp: bigint
  owner: string
  startTime: bigint
  target: bigint
  title: string
  totalFunds: bigint
}
