const messageHeader = "<div style='width:600px;font-family: Arial,Helvetica,sans-serif; text-decoration: none; margin:auto; font-size: 14px;'><div style='background-color:rgba(23, 117, 147); color:#fff; padding:20px;text-align: center;font-size: 18px;'><span style='margin-right: 10px'>Hello Books</span></div><div style='padding:15px'>";
const messageFooter = "<p style='margin-top:20px; margin-bottom:0px; color: rgb(106, 108, 111); line-height: 1.35em;'>Thank you,</p><p style='margin-top:0px; margin-bottom:5px; color: rgb(106, 108, 111); line-height: 1.35em;'>The Hello Books Team</p></div><div style='background-color:rgba(23, 117, 147); color:#fff; padding:7px'></div></div>";

const signupMessage = (firstName, token) => {
  const message = {
    html: `${messageHeader}            
            <p>Dear <span style='text-transform: capitalize;'>${firstName}</span>,</p>
            <p>We are happy to have you with us, you are receiving this mail as a confirmation that your signUp is successful.
            Verify your account by clicking the button below</p>
            <p style='margin-top:20px;text-align:center'><a style='text-decoration:none;padding:10px;background:#33922f;color:#ffffff;border-radius:5px;' href='${process.env.SERVER_URL}/auth/verify?token=${token}'>Verify Account</a></p>
            ${messageFooter}`,
  };
  return message;
};

const createUserMessage = (user, role, token) => {
  const message = {
    html: `${messageHeader}
            <p>Dear <span style='text-transform: capitalize;'>${user.firstName}</span>,</p>
            <p>You have been added as ${role === 'admin' ? 'an' : 'a'} ${role}. Your login details are:
              <ul>
                <li>Email: ${user.email}</li>
                <li>Password: ${process.env.PASSWORD || 'setPassword'}</li>
              </ul>
                Verify your account by clicking the button below. Kindly ensure you reset your password after the verification.</p>
            <p style='margin-top:20px;text-align:center'><a style='text-decoration:none;padding:10px;background:#33922f;color:#ffffff;border-radius:5px;' href='${process.env.SERVER_URL}/auth/verify?token=${token}'>Verify Account</a></p>
            ${messageFooter}`,
  };
  return message;
};

const resetpasswordMessage = (firstName, token) => {
  const message = {
    subject: 'Reset Hello Books Password',
    html: `${messageHeader}
            <p>Dear <span style='text-transform: capitalize;'>${firstName}</span>,</p>
            <p>You requested for a password reset. Click on the button below to confirm this action.</p>
            <p style='margin-top:20px;text-align:center'><a style='text-decoration:none;padding:10px;background:#33922f;color:#ffffff;border-radius:5px;' href='${process.env.SERVER_URL}/auth/passwordresetverify?token=${token}'>Reset Password</a></p>
            ${messageFooter}`,
  };
  return message;
};

export {
  signupMessage,
  createUserMessage,
  resetpasswordMessage,
};
