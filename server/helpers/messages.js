const signupMessage = (firstName, token) => {
  const message = {
    text: 'Hello Books',
    html: `  <div style="background-color:#7AA9EF; color:#fff; padding:20px"> <span style="text-align: left; margin-right: 10px">HB</span>
             <span style= "text-align:center">Welcome to hello books ${firstName.toUpperCase()}</span></div>
             <div style="margin-top:30px" >  We are so happy to have you with us , you are receiving this mail as a confirmation that
             your signUp is successful </div>
             <div>Click on this link to confirm your registration <a href=https://hello-books-staging.herokuapp.com/api/v1/auth/verify?token=${token}> LINK </a></div>
     `,
  };
  return message;
};

const createUserMessage = (user, role, token) => {
  const message = {
    text: 'Hello Books',
    html: `  <div style="background-color:#7AA9EF; color:#fff; padding:20px"> <span style="text-align: left; margin-right: 10px">HB</span>
             <span style= "text-align:center">Welcome to hello books ${user.firstName.toUpperCase()}</span></div>
             <div style="margin-top:30px" >  You have been added as ${role === 'admin' ? 'an' : 'a'} ${role}. Your login details are email: ${user.email}
             password: ${process.env.PASSWORD || 'setPassword'}.</div>
             <div> Click on this link to confirm your email <a href=https://hello-books-staging.herokuapp.com/api/v1/auth/verify?token=${token}> LINK </a></div >
             <div>
                 <p>Login to change your password immediately
             </div>
     `,
  };
  return message;
};

export {
  signupMessage,
  createUserMessage,
};
