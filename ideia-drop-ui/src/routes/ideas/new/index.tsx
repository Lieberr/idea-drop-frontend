import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { createIdea } from '#/api/ideas'
import { useMutation } from '@tanstack/react-query'

export const Route = createFileRoute('/ideas/new/')({
  component: NewIdeaPage,
})

function NewIdeaPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');


    const {mutateAsync, isPending} = useMutation({
        mutationFn: createIdea,
        onSuccess: () => {
            navigate({to: '/ideas'})
        }
    }) 


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !summary.trim()) {
            alert('Please fill in all fields');
            return;
        }

        try {
            await mutateAsync({
                title,
                summary,
                description,
                tags: tags.split(',').map((tag) => tag.trim()).filter((tag) => tag !== '')
            })
        } catch (error) {
            console.error(error)
            alert('something went wrong')
        }


    }


  return (
    <div className='space-y-6'>
        <h1 className='text-3xl font-bold mb-6'>
            Create New Idea
        </h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
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

            <div className='mt-5'>
                <button
                type='submit'
                disabled={isPending}
                className='block w-full bg-blue-500 hover:bg-blue-700
                text-white font-semibold px-6 py-2 rounded-md transition
                disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {isPending ? 'Creating...' : 'Create Idea'}
                </button>
            </div>
        </form>
    </div>
  )
}
