/**
 * Validate college email
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== "string") {
    return { isValid: false, message: "Email is required!" };
  }

  const email2 = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email2)) {
    return { isValid: false, message: "Invalid email format!" };
  }

  const allowedDomain = process.env.COLLEGE_EMAIL_DOMAIN;
  if (allowedDomain && allowedDomain.trim() !== "") {
    if (!email2.endsWith(`@${allowedDomain}`)) {
      return {
        isValid: false,
        message: `Only college email (@${allowedDomain}) is allowed!`,
      };
    }
  }

  return { isValid: true, email: email2 };
};


export const validateStudentNumber = (input) => {
  if (!input) {
    return { isValid: false, message: "Student number is required!" };
  }

  const studentNo = String(input).trim();
  const onlyNumbersRegex = /^\d+$/;

  if (!onlyNumbersRegex.test(studentNo)) {
    return {
      isValid: false,
      message: "Student number must contain only numbers!",
    };
  }

  if (studentNo.length < 5 || studentNo.length > 10) {
    return {
      isValid: false,
      message: "Please enter a valid student number !",
    };
  }

  return { isValid: true, studentNumber: studentNo };
};
