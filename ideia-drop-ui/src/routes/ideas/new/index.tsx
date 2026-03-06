import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { use, useState } from 'react'
import type { Idea } from '#/types'

export const Route = createFileRoute('/ideas/new/')({
  component: NewIdeaPage,
})

function NewIdeaPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');


  return (
    <div className='space-y-6'>
        <h1 className='text-3xl font-bold mb-6'>
            Create New Idea
        </h1>

        <form className='space-y-4'>
            <div>
                <label 
                htmlFor="title" 
                className='block text-gray-700 font-medium mb-1'>
                    Title
                </label>

                <input 
                type="text" 
                id='title' 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className='w-full border border-gray-300
                rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                placeholder='Enter idea Title' />
            </div>

            <div>
                <label 
                className='block text-gray-700 font-medium mb-1'
                htmlFor="summary">
                    Summary
                </label>

                <input 
                type="text"
                id='summary'
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className='w-full border border-gray-300
                rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter idea Summary' />
            </div>

            <div>
                <label 
                className='block text-gray-700 font-medium mb-1'
                htmlFor="body">
                    Description
                </label>

                <textarea
                id='body'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className='w-full border border-gray-300
                rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Write out the description for your idea' />
            </div>

            <div>
                <label 
                className='block text-gray-700 font-medium mb-1'
                htmlFor="tags">
                    Tags
                </label>

                <input 
                id='tags'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className='w-full border border-gray-300
                rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Optional tags, comma separated'
                type="text"
                 />
            </div>
        </form>
    </div>
  )
}
