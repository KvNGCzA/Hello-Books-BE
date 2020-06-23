/* istanbul ignore file */
import jwt from 'jsonwebtoken';

const noOfMillisecondsPerSecond = 1000;

export default token => jwt.verify(token, process.env.JWT_KEY, async (error, decoded) => {
  if (error) return null;
  const createdDate = new Date(decoded.iat * noOfMillisecondsPerSecond);
  let expiryDate;
  if (decoded.exp) {
    expiryDate = new Date(decoded.exp * noOfMillisecondsPerSecond);
  } else {
    expiryDate = new Date();
    expiryDate.setMonth(createdDate.getMonth() + 1);
  }
  return expiryDate;
});
