import Banner from "../components/Banner";
import Feature from "../components/Feature";
import featuresData from "../data/features.json";

const Home = () => {
  const featuresArray = featuresData.features;
  console.log(featuresArray[0].image);

  return (
    <div className="main">
      <Banner />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {featuresArray.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            alt={feature.alt}
            image={feature.image}
            paragraph={feature.paragraph}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
