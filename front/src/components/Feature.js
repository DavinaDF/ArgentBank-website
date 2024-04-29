import { PropTypes } from "prop-types";
import iconImage0 from "../assets/img/icon-0.png";
import iconImage1 from "../assets/img/icon-1.png";
import iconImage2 from "../assets/img/icon-2.png";

const Feature = ({ title, alt, image, paragraph }) => {
  return (
    <div className="feature-item">
      <img src={image} alt={alt} className="feature-item-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{paragraph}</p>
    </div>
  );
};

Feature.propTypes = {
  paragraph: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Feature;
