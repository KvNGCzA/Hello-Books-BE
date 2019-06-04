import sendgridMail from '@sendgrid/mail';

/* FORMAT FOR MESSAGE
const message = {
       text: '',
    html: '<strong>html version</strong>'
    }
*/

const sendMail = (senderMail, recieverMail, message) => {
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: recieverMail,
    from: senderMail,
    subject: 'Hello-Books',
    ...message,
  };
  sendgridMail.send(msg);
};

export default sendMail;