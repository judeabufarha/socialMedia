import "./styles.css";
import { useEffect, useState } from "react";
import { Post } from "../post";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";

export const Feed = ({ username, postsCounter }) => {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    console.log("Use effect");
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("no user");
        history.push("/login");
      }
    });
  }, []);

  useEffect(() => {
    console.log(postsCounter);

    const getPosts = async () => {
      setIsLoading(true);
      const res = await fetch(
        "https://firestore.googleapis.com/v1/projects/socialmedia-twitter/databases/(default)/documents/posts/"
      );
      const { documents } = await res.json();
      const postsToSet = documents
        .filter(
          (document) =>
            document.fields &&
            ((username &&
              document.fields.username &&
              document.fields.username.stringValue === username) ||
              !username)
        )
        .sort(
          ({ updateTime: updateTimeA }, { updateTime: updateTimeB }) =>
            new Date(updateTimeB).getTime() - new Date(updateTimeA).getTime()
        )
        .map((document) => ({ ...document.fields }));
      setPosts(postsToSet);
    };

    getPosts();
    setIsLoading(false);
  }, [postsCounter]);

  return (
    <div className="allFeed">
      <div className="header">
        <h2>Home</h2>
      </div>
      <div className="post-container">
        {isLoading === false &&
          posts.length > 0 &&
          posts.length &&
          posts.map((post) => (
            <Post
              key={post.id?.stringValue}
              profilepic={post.profilepic?.stringValue}
              name={post.name?.stringValue}
              username={post.username?.stringValue}
              text={post.text?.stringValue}
              image={post.image?.stringValue}
            />
          ))}
      </div>
    </div>
  );
};
