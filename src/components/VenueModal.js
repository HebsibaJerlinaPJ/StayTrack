import React from "react";
import { Modal, Button, ListGroup, Row, Col } from "react-bootstrap";

const VenueModal = ({ show, onHide, venue, onEnquire }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">{venue.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <img 
                            src={venue.img} 
                            alt={venue.name}
                            className="img-fluid rounded mb-3"
                        />
                    </Col>
                    <Col md={6}>
                        <h5 className="fw-bold">Description</h5>
                        <p>{venue.fullDescription}</p>
                        
                        <h5 className="fw-bold mt-4">Capacity</h5>
                        <p>{venue.capacity}</p>
                        
                        <h5 className="fw-bold mt-4">Key Features</h5>
                        <ListGroup variant="flush">
                            {venue.features.map((feature, index) => (
                                <ListGroup.Item key={index}>{feature}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>
                    Close
                </Button>
                <Button 
                    variant="dark" 
                    onClick={() => {
                        onEnquire(venue.name);
                        onHide();
                    }}
                >
                    ENQUIRE NOW
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VenueModal;