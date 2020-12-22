/* istanbul ignore file */
import notifications from './notifications';

export default (io) => {
  io.on('connection', (socket) => {
    socket.on('showNotifications', async (data) => {
      io.emit('showNotifications', await notifications.showNotification(data.id));
    });
    socket.on('updateNotifications', async (data) => {
      io.emit('updateNotifications', await notifications.updateNotification(data.id));
    });
  });
};
