import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Spa.css";

// Importing images from src/assets
import deepTissueImg from "./assets/deeptissue.jpg";
import aromaImg from "./assets/Aroma.jpeg";
import hotStoneImg from "./assets/hotstone.jpeg";
import spaImg from "./assets/spa.jpg";

import play1 from "./assets/play1.jpg";
import play2 from "./assets/play2.jpg";
import play3 from "./assets/play3.jpg";
import play4 from "./assets/play4.jpg";
import play5 from "./assets/play5.jpg";

export default function SpaPage() {
  const heroSlides = [
    { image: aromaImg, title: "Aromatherapy Massage", description: "Unwind with the soothing power of essential oils." },
    { image: hotStoneImg, title: "Hot Stone Therapy", description: "Melt away stress with warm, healing stones." },
    { image: deepTissueImg, title: "Deep Tissue Massage", description: "Relieve tension with targeted deep pressure." },
    { image: spaImg, title: "Signature Spa Experience", description: "Indulge in a luxurious full-body treatment." },
  ];

  const ambianceSlides = [
    { image: play1, alt: "Spa Ambiance 1" },
    { image: play2, alt: "Spa Ambiance 2" },
    { image: play3, alt: "Spa Ambiance 3" },
    { image: play4, alt: "Spa Ambiance 4" },
    { image: play5, alt: "Spa Ambiance 5" },
  ];

  return (
    <div className="spa-wrapper">
      {/* Hero Section */}
      <section className="spa-hero-section">
        <Carousel showThumbs={false} infiniteLoop autoPlay interval={4000} showStatus={false} showArrows={true}>
          {heroSlides.map((slide, index) => (
            <div key={index} className="hero-slide">
              <img src={slide.image} alt={slide.title} className="hero-slide-image" />
              <div className="hero-slide-content">
                <h1 className="hero-slide-title">{slide.title}</h1>
                <p className="hero-slide-description">{slide.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Treatments Section */}
      <section className="spa-treatments-section">
        <h2 className="section-title">Our Spa Treatments</h2>
        <p className="section-subtitle">Discover the ultimate relaxation experience</p>
        <div className="treatments-container">
          {heroSlides
            .filter(treatment => treatment.title !== "Signature Spa Experience")
            .map((treatment, index) => (
              <div key={index} className="treatment-card treatment-card-large">
                <div className="treatment-image-container">
                  <img src={treatment.image} alt={treatment.title} className="treatment-image" />
                </div>
                <div className="treatment-details">
                  <h3 className="treatment-title">{treatment.title}</h3>
                  <p className="treatment-description">{treatment.description}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Ambiance Section */}
      <section className="spa-ambiance-section">
        <h2 className="section-title">Explore Our Ambiance</h2>
        <p className="section-subtitle">Step into a world of serenity and luxury</p>
        <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000} showStatus={false} showArrows={true} className="ambiance-carousel">
          {ambianceSlides.map((slide, index) => (
            <div key={index} className="ambiance-slide">
              <img src={slide.image} alt={slide.alt} className="ambiance-slide-image" />
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
}
