'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { FolderIcon } from 'lucide-react'

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
    <div className='w-full flex flex-col lg:flex-row gap-8'>
      <Card className='w-full'>
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
                Story
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
            <Button type='submit' className='w-full bg-kaia hover:bg-kaia hover:opacity-85'>
              Create Campaign
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Campaign Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900'>
            <div className='relative'>
              <img
                src={formData.image || 'https://via.placeholder.com/400x200?text=Campaign+Image'}
                alt='Campaign Preview'
                className='w-full h-48 object-cover'
              />
              <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent'>
                <h3 className='text-lg font-medium text-white mb-1 line-clamp-1 group-hover:line-clamp-none transition-all duration-300'>
                  {formData.title || 'Campaign Title'}
                </h3>

                <p className='text-sm text-zinc-400 line-clamp-3 mt-2'>
                  {formData.description || 'Campaign story will appear here.'}
                </p>
              </div>
            </div>
            <div className='p-4 pt-3'>
              <div className='flex items-center justify-between text-sm mb-2'>
                <span className='text-zinc-400'>0 of {formData.target || '0'} KAIA</span>
                <span className='text-zinc-400'>0 Days Left</span>
              </div>
              <Progress value={0} className='h-2 mb-2' />

              <h4 className='text-sm text-zinc-400'>by Creator Name</h4>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
