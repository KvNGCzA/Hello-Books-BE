/* istanbul ignore file */
import models from '../database/models';
import sendMail from './sendMail';
import * as messages from './messages';
import checkToken from './checkToken';
import getNumberOfDays from './getNumberOfDays';

const { newBookNotificationMessage, overdueBookNotificationMessage } = messages;
const {
  Notification, UserNotification, FavouriteAuthor, User, LendingHistory,
  BookAuthor, Author, Book
} = models;
const notificationDays = [7, 3, 1];

/**
 * @class Notifications
 */
class Notifications {
  /**
   * @description add new notification
   * @param {integer} authorId author id
   * @param {string} authorName author name
   * @param {string} bookTitle book title
   * @returns {undefined} undefined
   * @memberof Notifications
   */
  static async addBookNotification(authorId, authorName, bookTitle) {
    const allFavourites = await FavouriteAuthor.findAll({ where: { authorId }, include: [User] });
    if (allFavourites.length < 1) return null;
    const userDetails = allFavourites.reduce((acc, next) => {
      const { id, email, notifyByEmail } = next.User;
      acc[acc.length] = { id, email, notifyByEmail };
      return acc;
    }, []);
    const message = `NEW BOOK!!! '${bookTitle}' by ${authorName}`;
    const newNotification = await Notification.create({ message, type: 'new book' });
    const mail = newBookNotificationMessage(authorName, bookTitle);
    userDetails.forEach(async (element) => {
      await UserNotification.create({ userId: element.id, notificationId: newNotification.id });
      if (element.notifyByEmail) await sendMail(process.env.ADMIN_MAIL, element.email, mail);
    });
  }

  /**
   * @description notify on overdue book
   * @param {integer} userId user id
   * @returns {null} null
   * @memberof Notifications
   */
  static async overdueBook() {
    const latestNotification = await Notification.findAll({ limit: 1, where: { type: 'overdue book' }, order: [['updatedAt', 'DESC']] });
    let lastNotification;
    if (latestNotification.length > 0) lastNotification = getNumberOfDays(latestNotification[0].updatedAt, 'switch');
    if (!lastNotification && latestNotification.length > 0) return null;
    const borrowedBooks = await LendingHistory.findAll({
      where: { type: 'borrowed' },
      include: [User, Book]
    });
    const booksOverdue = await Notifications.getOverdueBooks(borrowedBooks);
    if (booksOverdue.length > 0) await Notifications.sendNotification(booksOverdue);
    return null;
  }

  /**
   * @description  list of books that are overdue
   * @param {array} borrowedBooks list of books borrowed
   * @returns {array} array of overdue books
   * @memberof Notifications
   */
  static async getOverdueBooks(borrowedBooks) {
    const arr = [];
    return borrowedBooks.reduce(async (acc, next) => {
      const expiryDate = await checkToken(next.durationToken);
      if (expiryDate === null) return acc;
      const noOfDays = await getNumberOfDays(expiryDate);
      const formattedDay = await Notifications.checkAndFormatNotificationDays(noOfDays, expiryDate);
      if (formattedDay !== null && noOfDays !== null) {
        const { bookId } = next;
        const { title, yearPublished } = next.Book;
        const { email, id, notifyByEmail } = next.User;
        const authorDetails = await BookAuthor.findOne({ where: { bookId }, include: [Author] });
        const { fullname } = authorDetails.Author;
        const userData = {
          title, yearPublished, notifyByEmail, email, formattedDay, fullname, id
        };
        arr[arr.length] = userData;
        acc = await arr;
      }
      return acc;
    }, {});
  }

  /**
   * @description send overdue book notification
   * @param {array} listOfBooks list of books that are overdue
   * @returns {undefined} undefined
   * @memberof Notifications
   */
  static sendNotification(listOfBooks) {
    listOfBooks.forEach(async (element) => {
      const {
        id, email, notifyByEmail, formattedDay, ...bookDetails
      } = element;
      const message = `${bookDetails.title} will be inaccessible ${formattedDay}`;
      const mail = overdueBookNotificationMessage(bookDetails, formattedDay);
      const newNotification = await Notification.findOrCreate({ where: { message, type: 'due book' } });
      await UserNotification.findOrCreate({
        where: {
          userId: id, notificationId: newNotification[0].id
        }
      });
      if (notifyByEmail && newNotification[1]) await sendMail(process.env.ADMIN_MAIL, email, mail);
    });
  }

  /**
   * @description check notification days
   * @param {integer} daysRemaining number of days remaining
   * @param {date} expiryDate expiry date
   * @returns {string} day text formatted
   * @memberof Notifications
   */
  static checkAndFormatNotificationDays(daysRemaining, expiryDate) {
    let day = daysRemaining === 1 ? 'tomorrow ' : `in ${daysRemaining}days`;
    day += `which is on ${expiryDate}`;
    return notificationDays.indexOf(daysRemaining) !== -1 ? day : null;
  }

  /**
   * @description show all notification
   * @param {integer} userId user id
   * @returns {object} object
   * @memberof Notifications
   */
  static async showNotification(userId) {
    const notifications = await UserNotification.findAndCountAll({
      where: { userId },
      include: [{ model: Notification, where: { isRead: false } }],
      limit: 10,
      order: [['updatedAt', 'DESC']]
    });
    return {
      count: notifications.count,
      rows: notifications.rows,
      data: notifications.dataValues
    };
  }

  /**
   * @description update notification
   * @param {integer} notificationId user id
   * @returns {undefined} undefined
   * @memberof Notifications
   */
  static async updateNotification(notificationId) {
    await Notification.update({
      isRead: true
    }, {
      where: { id: notificationId },
    });
    return {
      status: 'success',
      message: 'notification read!'
    };
  }
}

export default Notifications;
