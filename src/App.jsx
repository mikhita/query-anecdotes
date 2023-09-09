import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote, getAnecdotes, updateAnecdote } from './requests/requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'


const App = () => {

  // const queryClient = useQueryClient()

  // const newAnecdoteMutation = useMutation(createAnecdote, {
  //   onSuccess: (mewAnecdote) => {
  //     const anecdotes = queryClient.getQueryData('anecdotes')
  //     queryClient.setQueryData('anecdotes', anecdotes.concat(mewAnecdote))
  //   },
  // })

  // const addAnecdote = async (event) => {
  //   event.preventDefault()
  //   const content = event.target.anecdote.value
  //   event.target.anecdote.value = ''
  //   newAnecdoteMutation.mutate({ content, votes: 0 })
  // }
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  // const updateAnecdote = (anecdote) => {
  //   updateAnecdoteMutation.mutate({...anecdote, votes: votes + 1 })
  // }

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => updateAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
