import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function CreateCampaignForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    startTime: '',
    endTime: '',
    image: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement campaign creation logic here
    console.log('Creating campaign with data:', formData)
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Create New Campaign</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className='space-y-4'>
          <div>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
              Title
            </label>
            <Input id='title' name='title' value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            <Textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='target' className='block text-sm font-medium text-gray-700'>
              Target Amount (KAIA)
            </label>
            <Input type='number' id='target' name='target' value={formData.target} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor='startTime' className='block text-sm font-medium text-gray-700'>
              Start Time
            </label>
            <Input
              type='datetime-local'
              id='startTime'
              name='startTime'
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='endTime' className='block text-sm font-medium text-gray-700'>
              End Time
            </label>
            <Input
              type='datetime-local'
              id='endTime'
              name='endTime'
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='image' className='block text-sm font-medium text-gray-700'>
              Image URL
            </label>
            <Input id='image' name='image' value={formData.image} onChange={handleChange} required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit' className='w-full'>
            Create Campaign
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
