import { Link } from "react-router-dom";
import "./styles.css";

export const SidebarCustom = (props) => {
  const { text, Icon, navigateTo } = props;

  return (
    <Link to={navigateTo}>
      <div className="sidebarCustom">
        <Icon style={{ padding: 20 }} size={20} />
        <h2>{text}</h2>
      </div>
    </Link>
  );
};
