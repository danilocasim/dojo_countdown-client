// ===========================================
// SignupForm Component
// ===========================================
// Signup form using fetch hooks - no onSubmit.

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useSignup from "../../hooks/useSignup";
import useFormState from "../../hooks/useFormState";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
} from "../../utils/validators";
import { ROUTES } from "../../utils/constants";

export function SignupForm() {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();
  const { signup, isLoading, error, clearError } = useSignup();

  const { values, errors, touched, handleChange, handleBlur, setFieldError } =
    useFormState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    });

  // Validate all fields
  const validateForm = () => {
    let isValid = true;

    const nameError = validateName(values.name);
    if (nameError) {
      setFieldError("name", nameError);
      isValid = false;
    }

    const emailError = validateEmail(values.email);
    if (emailError) {
      setFieldError("email", emailError);
      isValid = false;
    }

    const passwordError = validatePassword(values.password);
    if (passwordError) {
      setFieldError("password", passwordError);
      isValid = false;
    }

    const confirmError = validateConfirmPassword(
      values.password,
      values.confirmPassword
    );
    if (confirmError) {
      setFieldError("confirmPassword", confirmError);
      isValid = false;
    }

    if (!values.agreeTerms) {
      setFieldError("agreeTerms", "You must agree to the terms");
      isValid = false;
    }

    return isValid;
  };

  // Handle signup button click
  const handleSignupClick = async () => {
    clearError();

    if (!validateForm()) {
      return;
    }

    const result = await signup(values.name, values.email, values.password);

    if (result.success) {
      setAuthUser(result.user);
      navigate(ROUTES.DASHBOARD);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignupClick();
    }
  };

  // Password strength indicators
  const passwordChecks = {
    length: values.password.length >= 8,
    uppercase: /[A-Z]/.test(values.password),
    lowercase: /[a-z]/.test(values.password),
    number: /[0-9]/.test(values.password),
  };

  return (
    <div className='space-y-5'>
      {error && (
        <Alert variant='error' dismissible onDismiss={clearError}>
          {error}
        </Alert>
      )}

      <Input
        label='Full Name'
        name='name'
        type='text'
        placeholder='John Doe'
        value={values.name}
        error={errors.name}
        touched={touched.name}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        required
        autoComplete='name'
      />

      <Input
        label='Email Address'
        name='email'
        type='email'
        placeholder='you@example.com'
        value={values.email}
        error={errors.email}
        touched={touched.email}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        required
        autoComplete='email'
      />

      <Input
        label='Password'
        name='password'
        type='password'
        placeholder='Create a strong password'
        value={values.password}
        error={errors.password}
        touched={touched.password}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        required
        autoComplete='new-password'
      />

      <Input
        label='Confirm Password'
        name='confirmPassword'
        type='password'
        placeholder='Confirm your password'
        value={values.confirmPassword}
        error={errors.confirmPassword}
        touched={touched.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        required
        autoComplete='new-password'
      />

      {/* Password Requirements */}
      <div className='text-sm text-gray-500'>
        Password must contain:
        <ul className='mt-1 ml-4 list-disc'>
          <li className={passwordChecks.length ? "text-green-600" : ""}>
            At least 8 characters
          </li>
          <li className={passwordChecks.uppercase ? "text-green-600" : ""}>
            One uppercase letter
          </li>
          <li className={passwordChecks.lowercase ? "text-green-600" : ""}>
            One lowercase letter
          </li>
          <li className={passwordChecks.number ? "text-green-600" : ""}>
            One number
          </li>
        </ul>
      </div>

      {/* Terms Checkbox */}
      <div>
        <label className='flex items-start'>
          <input
            type='checkbox'
            name='agreeTerms'
            checked={values.agreeTerms}
            onChange={handleChange}
            className='w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5'
          />
          <span className='ml-2 text-sm text-gray-600'>
            I agree to the{" "}
            <button type='button' className='text-primary-600 hover:underline'>
              Terms of Service
            </button>{" "}
            and{" "}
            <button type='button' className='text-primary-600 hover:underline'>
              Privacy Policy
            </button>
          </span>
        </label>
        {errors.agreeTerms && touched.agreeTerms && (
          <p className='text-sm text-red-600 mt-1'>{errors.agreeTerms}</p>
        )}
      </div>

      <Button
        variant='primary'
        size='lg'
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        onClick={handleSignupClick}
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>

      <p className='text-center text-sm text-gray-600'>
        Already have an account?{" "}
        <Link
          to={ROUTES.LOGIN}
          className='text-primary-600 hover:text-primary-700 font-medium'
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default SignupForm;
