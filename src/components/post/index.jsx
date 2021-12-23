import "./styles.css";

export const Post = (props) => {
  const { profilepic, name, username, text, image, id } = props;

  return (
    <div className="post">
      <div className="post-header">
        <img className="profile-pic" src={profilepic} alt={name + "photo"} />
        <h3 className="name"> {name}</h3>
        <p className="username"> {username}</p>
      </div>

      <p className="text"> {text}</p>
      <img className="post-img" src={image} alt={name + "photo"} />
    </div>
  );
};
