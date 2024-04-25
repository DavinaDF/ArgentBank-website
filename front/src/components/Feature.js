const Feature = ({ title, alt, img, paragraph }) => {
  return (
    <div className="feature-item">
      <img src={img} alt={alt} className="feature-item-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{paragraph}</p>
    </div>
  );
};

export default Feature;
