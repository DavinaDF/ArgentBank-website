import React from "react";
import Banner from "../components/Banner";
import Feature from "../components/Feature";
import featuresData from "../data/features.json";

const Home = () => {
  const features = featuresData.features;

  return (
    <div className="main">
      <Banner />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            alt={feature.alt}
            img={feature.image}
            paragraph={feature.paragraph}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
