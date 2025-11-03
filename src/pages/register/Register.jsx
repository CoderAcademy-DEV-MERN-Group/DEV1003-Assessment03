// React hook form provides form management without useState
import clsx from "clsx";
import styles from "./Register.module.scss";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  // formState allows RHF to track which fields have errors and what they are
  const {
    register, // attaches form content
    handleSubmit, // runs when submitted
    formState: { errors }, // real-time validation error tracking
    watch, // to watch a particular value from a field in the form
  } = useForm();

  // Set up password watch for matching password check
  const watchPassword = watch("password");

  // Tanstack Query mutation for handling registerAccount API call:
  // Gives us loading states, error handling & caching without complex logic
  const {
    mutate: registerAccount, // The function which triggers API call
    isPending, // Loading state
    error: apiError, // Error object if the API fails
  } = useMutation({
    // This is the function that makes the call to the backend
    mutationFn: async (credentials) => {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // This may not be required, backend may be flexible?
        },
        body: JSON.stringify(credentials),
      });

      // Check for success status code:
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);

        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      return response.json();
    },

    onSuccess: (data) => {
      console.log(
        `Account creation successful for ${data.username} with email:`,
        data.email
      );

      //JWT STORAGE to localstorage
      localStorage.setItem("authToken", data.token);
      console.log("Token stored");
    },
  });

  // What runs when the form is submitted and valid (handleSubmit automatically checks validation rules):
  // Just log for setup
  const onSubmit = (data) => {
    console.log("Making Api call for ", data.email);
    registerAccount(data);
  };

  return (
    // Main: the main content of this component
    <main className={styles.registerContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
        <h1> Join the Century Screening Room! </h1>

        {/* fieldset semantic HTML for all form fields */}
        <fieldset className={styles.inputGroup}>
          
          {/* Legend for name of all fields */}
          <legend>Account Details</legend>
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
                styles.registerInput,
                errors.email && styles.inputError // shared error class for styling
              )}
            />
            <br />
            {/* This runs when there are errors! */}
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email.message}</span> // Shows the specific email error
            )}
          </p>

          <p>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 2,
                  message: "Username must be at least 2 characters",
                },
              })}
              className={clsx(styles.registerInput, errors.username && styles.inputError)}
            />
            <br />
            {errors.username && (
              <span className={styles.errorMessage}>{errors.username.message}</span>
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
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message:
                    "Must include at least one: uppercase, lowercase, number and special character.",
                },
              })}
              className={clsx(
                styles.registerInput,
                errors.password && styles.inputError // shared error class for styling
              )}
            />
            <br />
            <small id="passwordInstructions">
              Must include at least one: uppercase, lowercase, number and
              special character.
            </small>
            <br />
            {/* This runs when there are errors */}
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password.message}</span> // Shows the specific password error
            )}
          </p>
          <p>
            <label htmlFor="confirmPassword">Confirm password: </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watchPassword || "Passwords do not match",
              })}
              className={clsx(
                styles.registerInput,
                errors.confirmPassword && styles.inputError
              )}
            />
            <br />
            {errors.confirmPassword && (
              <span className={styles.errorMessage}>
                {errors.confirmPassword.message}
              </span>
            )}
          </p>
        </fieldset>

        {/* API level error displays go here */}
        {apiError && <span className={styles.errorMessage}>Registration failed. {apiError.message}.</span>}

        <br></br>
        <button
          type="submit"
          disabled={isPending}
          className={clsx(styles.registerButton, isPending && styles.loadingButton)}
        >
          {isPending ? "Setting up account" : "Register"}
        </button>
      </form>
    </main>
  );
};

export default Register;
