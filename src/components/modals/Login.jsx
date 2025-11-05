/* eslint-disable react/jsx-props-no-spreading */
// React hook form provides form management without useState
import clsx from "clsx";
import Modal from "react-modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../utilities/services/apiServices";
import styles from "./Modals.module.scss";

// Set up our form with RHF
function Login({ isOpen, onClose }) {
  // set login states
  const [loginSuccess, setLoginSuccess] = useState(false);

  // formState allows RHF to track which fields have errors and what they are
  const {
    register, // attaches form content
    handleSubmit, // runs when submitted
    formState: { errors }, // real-time validation error tracking
  } = useForm();

  // Tanstack Query mutation for handling login API call:
  // Gives us loading states, error handling & caching without complex logic
  const {
    mutate: login, // The function which triggers API call
    isPending, // Loading state
    error: apiError, // Error object if the API fails
  } = useMutation({
    // This is the function that makes the call to the backend
    mutationFn: loginUser,

    onSuccess: (data) => {
      // JWT STORAGE to localstorage
      localStorage.setItem("authToken", data.token);
      setLoginSuccess(true);
      setTimeout(() => {
        onClose();
        setLoginSuccess(false);
      }, 2000);
    },
  });

  // What runs when the form is submitted and valid (handleSubmit automatically checks validation rules):
  // Just log for setup
  const onSubmit = (data) => {
    login(data);
  };

  return (
    // Modal instead of Main
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      {/* Close button :D */}
      <button
        type="button"
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Close login pop-up"
      >
        {" "}
        x{" "}
      </button>

      {loginSuccess && <span className={styles.successMessage}>Login successful! 🎉</span>}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
        <h1> Welcome Back! </h1>

        {/* fieldset for all form fields */}
        <fieldset className={styles.inputGroup}>
          {/* Legend for name of all fields */}
          <legend>Login Credentials</legend>
          <p>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                // Input validation rules go here!
                required: "Email is required", // Custom message for validation rule
                pattern: {
                  value: /^\S+@\S+$/i, // Check it is valid email format
                  message: "Please enter a valid email address",
                },
              })}
              // Conditional classes for styling appropriately
              className={clsx(
                styles.modalInput,
                errors.email && styles.inputError // shared error class for styling
              )}
            />

            {/* This runs when there are errors! */}
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email.message}</span> // Shows the specific email error
            )}
          </p>
          <p>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8, // Same as backend requirements
                  message: "Password must be at least 8 characters",
                },
              })}
              className={clsx(
                styles.modalInput,
                errors.password && styles.inputError // shared error class for styling
              )}
            />
            {/* This runs when there are errors */}
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password.message}</span> // Shows the specific password error
            )}
          </p>
        </fieldset>

        {/* API level error displays go here */}
        {apiError && (
          <span className={styles.apiError}>
            Login failed. Please check your credentials and try again.
          </span>
        )}

        <button
          type="submit"
          disabled={isPending}
          className={clsx(styles.modalButton, isPending && styles.buttonLoading)}
        >
          {isPending ? "Signing in" : "Sign in"}
        </button>
      </form>
    </Modal>
  );
}

export default Login;
