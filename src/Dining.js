import React, { useState } from "react";
import { Container, Row, Col, Card, Carousel, Button } from "react-bootstrap";
import VenueModal from "./components/VenueModal";
import EnquiryForm from "./components/EnquiryForm";
import "./App.css";
import axios from 'axios';
// Import images from src/assets
import dining1 from "./assets/dining1.jpg";
import dining2 from "./assets/dining2.jpg";
import dining3 from "./assets/dining3.jpg";
import dining4 from "./assets/dining4.jpg";
import menu1 from "./assets/menu1.jpg";
import menu2 from "./assets/menu2.jpg";
import menu3 from "./assets/menu3.jpg";
import menu4 from "./assets/menu4.jpg";

const Dining = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [enquiryVenue, setEnquiryVenue] = useState("");

    const backgrounds = [
        dining1,
        dining2,
        dining3,
        dining4,
    ];

    const venues = [
        { 
            id: 1, 
            name: "Seasonal Tasting Menu", 
            img: menu1, 
            description: "A curated selection of locally sourced ingredients.",
            fullDescription: "Experience the finest seasonal ingredients sourced locally, crafted into a multi-course tasting menu that highlights the flavors of the region. Perfect for food enthusiasts looking for a unique dining experience.",
            capacity: "Available for parties of 2-10",
            features: ["Locally sourced ingredients", "Multi-course menu", "Customizable options"]
        },
        { 
            id: 2, 
            name: "Wine Pairing", 
            img: menu2, 
            description: "Expertly selected wines to complement each course.",
            fullDescription: "Enhance your dining experience with our expertly curated wine pairings, designed to complement each course of your meal. Our sommelier selects from a diverse collection of international and local wines.",
            capacity: "Available with any dining package",
            features: ["International wine selection", "Sommelier guidance", "Custom pairings"]
        },
        { 
            id: 3, 
            name: "Chef's Special", 
            img: menu3, 
            description: "Innovative creations from our award-winning chef.",
            fullDescription: "Indulge in the creativity of our award-winning chef with a daily special that showcases innovative techniques and bold flavors. A perfect choice for adventurous diners seeking something extraordinary.",
            capacity: "Available for all guests",
            features: ["Daily changing menu", "Innovative dishes", "Chef's signature style"]
        },
        { 
            id: 4, 
            name: "Gourmet Dessert Platter", 
            img: menu4, 
            description: "A delightful assortment of signature desserts.",
            fullDescription: "Treat yourself to a luxurious dessert platter featuring a selection of our chef's signature creations, crafted to delight your senses with every bite. Perfect for sharing or indulging solo.",
            capacity: "Available for all guests",
            features: ["Signature desserts", "Artisanal presentation", "Perfect for sharing"]
        },
    ];

    const handleEnquire = (venueName) => {
        setEnquiryVenue(venueName);
        setShowEnquiryForm(true);
    };

    const handleFormSubmit = async (formData) => {
  try {
    await axios.post('https://staytrack.onrender.com/api/enquiries', formData);
    alert('Enquiry submitted!');
  } catch (error) {
    console.error('Enquiry submission failed:', error);
    alert('Failed to submit enquiry.');
  }
};

    return (
        <div className="meet-celebrate-section">
            <Carousel fade interval={3000} controls={true} indicators={true}>
                {backgrounds.map((bg, index) => (
                    <Carousel.Item key={index}>
                        <div className="background-slide" style={{ backgroundImage: `url(${bg})` }}>
                            <Container className="text-center text-white">
                                <h2 className="fw-bold display-4">Luminaire Restaurant</h2>
                                <p className="lead">Savor Extraordinary Dining at Grand Horizon Hotel</p>
                            </Container>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            <br></br>

           <Container className="culinary-section my-5 py-5">
    <h2 className="text-center culinary-heading mb-4">Our Culinary Experience</h2>
    <Row className="g-4 culinary-row">
        {venues.map((venue) => (
            <Col lg={3} md={6} key={venue.id}>
                <Card className="shadow-sm h-100 venue-card">
                    <Card.Img 
                        variant="top" 
                        src={venue.img} 
                        alt={venue.name} 
                        className="venue-img"
                    />
                    <Card.Body className="d-flex flex-column">
                        <Card.Title className="fw-bold mb-3">{venue.name}</Card.Title>
                        <Card.Text className="flex-grow-1">{venue.description}</Card.Text>
                        <div className="mt-auto d-flex justify-content-between">
                            <Button 
                                variant="outline-dark" 
                                className="enquire-btn"
                                onClick={() => handleEnquire(venue.name)}
                            >
                                ENQUIRE NOW
                            </Button>
                            <Button 
                                variant="link" 
                                className="more-btn p-0"
                                onClick={() => {
                                    setSelectedVenue(venue);
                                    setShowModal(true);
                                }}
                            >
                                MORE
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </Row>
</Container>


            {selectedVenue && (
                <VenueModal 
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    venue={selectedVenue}
                    onEnquire={handleEnquire}
                />
            )}

            <EnquiryForm 
                show={showEnquiryForm}
                onHide={() => setShowEnquiryForm(false)}
                venueName={enquiryVenue}
            />
        </div>
    );
};

export default Dining;