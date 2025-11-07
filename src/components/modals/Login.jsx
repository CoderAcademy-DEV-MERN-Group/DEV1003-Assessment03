/* eslint-disable react/jsx-props-no-spreading */
// React hook form provides form management without useState
import clsx from "clsx";
import Modal from "react-modal";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Modals.module.scss";
import { useLoginUser } from "../../utilities/customHooks/useAuth";
import { useAuthContext } from "../../contexts/useAuthContext";
import toast from "react-hot-toast";
// import { useEffect } from "react";
import ErrorMessage from "../common/ErrorMessage";

function Login({ isOpen, onClose }) {
  const { login: setGlobalAuth, isLoading } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: apiLogin, isPending } = useLoginUser();

  const onSubmit = (data) => {
    apiLogin(data, {
      onSuccess: (res) => {
        setGlobalAuth(res.user, res.token);
        toast.success("Login successful!");
        setTimeout(() => {
          onClose();
        }, 800);
      },
      onError: (err) => {
        const msg = err?.response?.data?.message || "Login failed. Please try again.";
        toast.error(msg);
      },
    });
  };

  if (isLoading) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
        closeTimeoutMS={300}
        shouldFocusAfterRender={false}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
      >
        <div className={styles.loadingMessage}>Checking authentication...</div>
      </Modal>
    );
  }

  return (
    // Modal instead of Main
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      closeTimeoutMS={500}
      shouldFocusAfterRender={false}
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

            {/* This runs when there are React Hook Form email errors! (Old code below) */}
            <ErrorMessage error={errors.email?.message} />
            {/* {errors.email && (
              <span className={styles.errorMessage}>{errors.email.message}</span> // Shows the specific email error
            )} */}
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
            {/* This runs when there are React Hook Form password errors (old code below) */}
            <ErrorMessage error={errors.password?.message} />
            {/* {errors.password && (
              <span className={styles.errorMessage}>{errors.password.message}</span> // Shows the specific password error
            )} */}
          </p>
        </fieldset>
        {/* Login success message span */}

        {loginSuccess && <span className={styles.successMessage}>Login successful! 🎉</span>}
        {/* This runs when there are API errors! (Old code below) */}
        <ErrorMessage error={apiError} />
        {/* {apiError && (
          <span className={styles.apiError}>
            {apiError?.response?.data?.message || "Login failed. Please try again."}
          </span>
        )} */}

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
