import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Feed } from "../../feed";

export const ProfilePage = () => {
  const [text, setText] = useState();
  const [image, setImage] = useState();
  const [userDetails, setUserDetails] = useState({
    displayName: "",
    photoURL: "",
    email: "",
  });
  const [postsCounter, setPostsCounter] = useState(0);
  const history = useHistory();

  useEffect(() => {
    console.log("Use effect")
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
      const { displayName, photoURL, email } = user;
      setUserDetails({
        displayName,
        photoURL,
        email,
      });
      console.log(user);
     } else {
        console.log("no user")
        history.push('/login');
      }
    });

  }, []);

  const createTweet = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://firestore.googleapis.com/v1/projects/socialmedia-twitter/databases/(default)/documents/posts/",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            fields: {
              text: {
                stringValue: text,
              },
              image: {
                stringValue: image,
              },
              name: {
                stringValue: userDetails.displayName,
              },
              username: {
                stringValue: userDetails.email,
              },
              profilepic: {
                stringValue: userDetails.photoURL,
              },
            },
          }),
        }
      );
      setText("");
      setImage("");
      setPostsCounter(postsCounter + 1);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="posts-page">
      <div className="user-info">
        <img
          width="50"
          height="50"
          src={userDetails.photoURL}
          alt={userDetails.displayName}
        />
        <h3>{userDetails.displayName}</h3>
      </div>

      <form className="tweet-layout" onSubmit={createTweet}>
        <div className="tweet-input">
          <input
            placeholder="What's happening?"
            name="text"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <br />
        </div>
        <div className="tweet-media">
          <input
            placeholder="Enter Image URL"
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <br />
        </div>
        <div className="submit-container">
          <input className="submit-button" type="submit" value="Tweet" />
        </div>
      </form>

      {userDetails.email && (<Feed username={userDetails.email} postsCounter={postsCounter} />)}
    </div>
  );
};
