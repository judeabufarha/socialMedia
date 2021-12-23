import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const LoginPage = () => {
  const [mode, setMode] = useState("login");

  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const loginUser = async (formVals) => {
    try {
      console.log("Login Submitted", formVals);
      const auth = getAuth();
      console.log(auth);
      const loginUser = await signInWithEmailAndPassword(
        auth,
        formVals.user,
        formVals.password
      );
      history.push("/");
      console.log("after login", auth);
    } catch (error) {
      console.log("Error connecting to Firebase", error);
    }
  };

  const signUpUser = async (formVals) => {
    console.log("Sign Up", formVals);
    const auth = getAuth();
    try {
      const signUpUser = await createUserWithEmailAndPassword(
        auth,
        formVals.user,
        formVals.password
      );
      await updateProfile(auth.currentUser, {
        displayName: formVals.name,
        photoURL: formVals.profilepic,
      });
      history.push("/");
      console.log("New user was created", signUpUser);
    } catch (error) {
      console.log("Error from Firebase", error);
    }
  };

  return (
    <div className="posts-page">
      {mode === "login" && (
        <form className="form-layout" onSubmit={handleSubmit(loginUser)}>
          <h2>Welcome back, please log in!</h2>
          <br />
          <label htmlFor="user">Email</label>
          <input type="email" required name="user" {...register("user")} />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            name="password"
            {...register("password")}
          />

          <input type="submit" value="Login" />
          <br />
          <p>Don't have an account? Create a new account now!</p>
          <button onClick={() => setMode("signup")}>Sign Up</button>
        </form>
      )}

      {mode === "signup" && (
        <form className="form-layout" onSubmit={handleSubmit(signUpUser)}>
          <h2>Welcome! Please create an account to continue.</h2>
          <br />

          <label htmlFor="name">Name</label>
          <input type="text" required name="name" {...register("name")} />
          <br />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            required
            name="username"
            {...register("username")}
          />
          <br />

          <label htmlFor="profilepic">Profile Pic</label>
          <input
            type="text"
            required
            name="profilepic"
            {...register("profilepic")}
          />
          <br />

          <label htmlFor="user">Email</label>
          <input type="email" required name="user" {...register("user")} />
          <br />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            name="password"
            {...register("password")}
          />
          <br />

          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            required
            name="passwordConfirm"
            {...register("passwordConfirm")}
          />
          <br />

          <input type="submit" value="Sign Up" />
          <br />
          <p>Already have an account?</p>
          <button onClick={() => setMode("login")}>Login</button>
        </form>
      )}
    </div>
  );
};
