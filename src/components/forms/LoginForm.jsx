// ===========================================
// LoginForm Component
// ===========================================
// Login form using fetch hooks - no onSubmit.

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useLogin from "../../hooks/useLogin";
import useFormState from "../../hooks/useFormState";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import { validateEmail } from "../../utils/validators";
import { ROUTES } from "../../utils/constants";

export function LoginForm() {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();
  const { login, isLoading, error, clearError } = useLogin();

  const { values, errors, touched, handleChange, handleBlur, setFieldError } =
    useFormState({
      email: "",
      password: "",
    });

  // Validate all fields
  const validateForm = () => {
    let isValid = true;

    const emailError = validateEmail(values.email);
    if (emailError) {
      setFieldError("email", emailError);
      isValid = false;
    }

    if (!values.password) {
      setFieldError("password", "Password is required");
      isValid = false;
    }

    return isValid;
  };

  // Handle login button click
  const handleLoginClick = async () => {
    clearError();

    if (!validateForm()) {
      return;
    }

    const result = await login(values.email, values.password);

    if (result.success) {
      setAuthUser(result.user);
      navigate(ROUTES.DASHBOARD);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLoginClick();
    }
  };

  return (
    <div className='space-y-6'>
      {error && (
        <Alert variant='error' dismissible onDismiss={clearError}>
          {error}
        </Alert>
      )}

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
        placeholder='Enter your password'
        value={values.password}
        error={errors.password}
        touched={touched.password}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        required
        autoComplete='current-password'
      />

      <div className='flex items-center justify-between'>
        <label className='flex items-center'>
          <input
            type='checkbox'
            className='w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500'
          />
          <span className='ml-2 text-sm text-gray-600'>Remember me</span>
        </label>
        <button type='button' className='text-sm text-primary-600 hover:text-primary-700'>
          Forgot password?
        </button>
      </div>

      <Button
        variant='primary'
        size='lg'
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        onClick={handleLoginClick}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <p className='text-center text-sm text-gray-600'>
        Don't have an account?{" "}
        <Link
          to={ROUTES.SIGNUP}
          className='text-primary-600 hover:text-primary-700 font-medium'
        >
          Sign up free
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
