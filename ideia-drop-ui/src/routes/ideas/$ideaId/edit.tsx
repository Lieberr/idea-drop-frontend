import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import { fetchIdea, updateIdea } from '#/api/ideas'

 
const ideaQueryOptions = (id: string) => queryOptions({
  queryKey: ['idea', id],
  queryFn: () => fetchIdea(id)
});



export const Route = createFileRoute('/ideas/$ideaId/edit')({
  component: IdeaEditPage,
  loader: async ({params, context: {queryClient}}) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  }
})

function IdeaEditPage() {
  const {ideaId} = Route.useParams();
  const navigate = useNavigate();
  const {data: idea} = useSuspenseQuery(ideaQueryOptions(ideaId))

  const [title, setTitle] = useState(idea.title);
  const [summary, setSummary] = useState(idea.summary);
  const [description, setDescription] = useState(idea.description);
  const [tagsInput, setTagsInput] = useState(idea.tags.join(', '))

  const {mutateAsync, isPending} = useMutation({
    mutationFn: () => updateIdea(ideaId, {
      title,
      summary,
      description,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
    }),
    onSuccess: () => {
      navigate({to: '/ideas/$ideaId', params: {ideaId}});
    }
  })


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync();
  }


  return (
        <div className='space-y-6'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl font-bold'>
              Edit Idea
            </h1>
            <Link to='/ideas/$ideaId' params={{ideaId}}
            className='text-sm text-blue-600 hover:underline'>
              {'<-'} Back to Idea
            </Link>
          </div>
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
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
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
                  {isPending ? 'Updating...' : 'Update Idea'}
                </button>
            </div>
        </form>
    </div>
  )
}
