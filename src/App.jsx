import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from './requests/requests';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useNotification } from './NotificationContext'; 

const App = () => {
  const { dispatch } = useNotification();
  
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  const handleUpdateAnecdote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: 'SHOW_NOTIFICATION', message:anecdote.content + '  voted on!' });
  };
  const handleAnecdoteFormError = (errorMessage) => {
    // Handle the error message here, e.g., display it in the UI
    if (errorMessage) {
      alert(errorMessage); // Display an alert for the error
    }
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm onErrorCallback={handleAnecdoteFormError} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleUpdateAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
