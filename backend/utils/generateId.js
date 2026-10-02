
// for assigning unique id to regisetered students
//for future ticket part ...

import crypto from "crypto";

export const generateUniqueId = () => {
  const randomString = crypto.randomBytes(4).toString("hex"); // Generate a random string
  return `ACC-EVenT-${randomString}`; 
};