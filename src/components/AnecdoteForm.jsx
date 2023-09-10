import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests/requests';
import { useNotification } from '../NotificationContext';

const AnecdoteForm = ({ onErrorCallback }) => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotification(); 

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));

      dispatch({ type: 'SHOW_NOTIFICATION', message: 'New anecdote created!' });
    },
    onError: (error) => {
      console.error('An error occurred while creating the anecdote:', error);

      // Call the provided onErrorCallback with the error
      onErrorCallback('Failed to create an anecdote. Please try again later.');

      // Display an error notification to the user
      dispatch({ type: 'SHOW_NOTIFICATION', message: 'Failed to create an anecdote. Please try again later.' });
    },
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.trim().length <= 5) {
      // Call the provided onErrorCallback with the error message
      onErrorCallback('Anecdote content must be at least 5 characters long.');
      return;
    }
    event.target.anecdote.value = '';
    try {
      await newAnecdoteMutation.mutateAsync({ content, votes: 0 });
      // If needed, call the provided onErrorCallback with no error
      onErrorCallback(null);
    } catch (error) {
      console.error('An error occurred while creating the anecdote:', error);

      // Call the provided onErrorCallback with the error
      onErrorCallback('Failed to create an anecdote. Please try again later.');

      // Display an error notification to the user
      dispatch({ type: 'SHOW_NOTIFICATION', message: 'Failed to create an anecdote. Please try again later.' });
    }
    // newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
