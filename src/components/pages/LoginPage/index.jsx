import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import "./styles.css";


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
    <div className="container">
    <div className="logo-container">
     
      <div className="form-container">
 <FaTwitter className="logo" style={{ margin: 0 }} size={30} color="#50b7f5" />
  
      {mode === "login" && (
        <form className="form-layout" onSubmit={handleSubmit(loginUser)}>
          
          <h2>Sign In</h2>
          <br />
          <div className="fill-content">
            <input type="email" id="email" placeholder="Email" required name="user" {...register("user")} />
            <input type="password" id="password" placeholder="Password" required name="password" {...register("password")}/>
          </div><br/>
         

          <button type="submit" id="login">Login</button>
          <br />
          <div id="sign">
          <p>Don't have an account?</p>
          <button id="modeButton" onClick={() => setMode("signup")}>Sign Up</button>
          </div>
        </form>
      )}

      {mode === "signup" && (
    
        <form className="form-layout" onSubmit={handleSubmit(signUpUser)}>
          <h2>Create your account</h2>
          <br />

          
          <input type="text" placeholder="Name" required name="name" {...register("name")} />
          <br />

         
          <input
            type="text"
            placeholder="Username" 
            required
            name="username"
            {...register("username")}
          />
          <br />

         
          <input
            type="text"
            placeholder="Profile Picture URL" 
            required
            name="profilepic"
            {...register("profilepic")}
          />
          <br />

         
          <input type="email" placeholder="Email"  required name="user" {...register("user")} />
          <br />

          
          <input
            type="password"
            placeholder="Password" 
            required
            name="password"
            {...register("password")}
          />
          <br />

        
          <input
            type="password"
            placeholder="Confirm Password" 
            required
            name="passwordConfirm"
            {...register("passwordConfirm")}
          />
          <br />

          <button type="submit" id="signupButton">Sign Up</button>
          <br />
          <div id="sign">
          <p>Already have an account?</p>
          <button onClick={() => setMode("login")} id="loginButton">Login</button>
          </div>
        </form>
    
      )}
          </div>
    </div>
    </div>
  );
};
