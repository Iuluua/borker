import { string, object, ref } from 'yup';

const commonSchema = {
    email: string()
      .email('The email address is not valid')
      .required('Please provide an email address'),
    password: string()
      .required('Please choose a password')
      .min(4, 'The password needs to be at least 4 characters long'),
};

export const loginSchema = object(commonSchema);

export const registerSchema = object({
    ...commonSchema,
    confirmPassword: string()
      .required('Please type your password again.')
      .oneOf([ref('password')], 'The two passwords do not match'),
    firstName: string().required('Please tell us your first name'),
    lastName: string().required('Please tell us your last name'),
  });