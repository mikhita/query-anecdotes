import React, { useEffect } from 'react';
import { useNotification } from '../NotificationContext';

const Notification = () => {
  const { notification, dispatch } = useNotification();

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  if (!notification.message) return null;

  return (
    <div className="notification">
      {notification.message}
    </div>
  );
};

export default Notification;
