import { createContext, useReducer, useContext } from 'react';

// Define your notification reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { message: action.message };
    case 'HIDE_NOTIFICATION':
      return { message: null };
    default:
      return state;
  }
};

// Create the NotificationContext
const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, { message: null });

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationContextProvider');
  }
  return context;
};

export default NotificationContext;
