/* eslint-disable react/jsx-props-no-spreading */
// React hook form provides form management without useState
import clsx from "clsx";
import Modal from "react-modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Modal.module.scss";
import { useLoginUser } from "../../utilities/customHooks/useAuth";

// Set up our form with RHF
function Login({ isOpen, onClose }) {
  // set login states
  const [loginSuccess, setLoginSuccess] = useState(false);

  // formState allows RHF to track which fields have errors and what they are
  // register - attaches form content
  // handleSubmit - runs when submitted
  // formState: real-time validation error tracking
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Tanstack Query mutation for handling login API call:
  // Gives us loading states, error handling & caching without complex logic
  //  mutate: The function which triggers API call
  // isPending: Data is being sent/changed state
  // Error object if the API fails
  const { mutate: login, isPending, error: apiError } = useLoginUser();

  const onSubmit = (data) => {
    login(data, {
      onSuccess: (res) => {
        localStorage.setItem("authToken", res.token);
        setLoginSuccess(true);
        setTimeout(() => {
          onClose();
          setLoginSuccess(false);
        }, 2000);
      },
    });
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
        {/* Login success message span */}

        {loginSuccess && <span className={styles.successMessage}>Login successful! 🎉</span>}
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
