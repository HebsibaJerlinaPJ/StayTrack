import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const EnquiryForm = ({ show, onHide, venueName }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        date: "",
        eventType: "",
        guests: "",
        requireRooms: false,
        rooms: "",
        requirements: "",
        corporate: false,
        company: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Thank you for your enquiry! We'll contact you soon.");
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered className="enquiry-modal">
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-bold text-gold">VENUE ENQUIRY</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0">
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label className="small text-muted">Name*</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                    className="rounded-0 border-top-0 border-start-0 border-end-0 border-bottom"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label className="small text-muted">Email*</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                    className="rounded-0 border-top-0 border-start-0 border-end-0 border-bottom"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Form.Group controlId="formMobile" className="mb-3">
                        <Form.Label className="small text-muted">Mobile Number*</Form.Label>
                        <div className="input-group">
                            <span className="input-group-text bg-transparent rounded-0 border-top-0 border-start-0 border-end-0 border-bottom">+91</span>
                            <Form.Control 
                                type="tel" 
                                name="mobile" 
                                value={formData.mobile}
                                onChange={handleChange}
                                required 
                                className="rounded-0 border-top-0 border-start-0 border-end-0 border-bottom"
                            />
                        </div>
                    </Form.Group>
                    
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formDate" className="mb-3">
                                <Form.Label className="small text-muted">Tentative Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="date" 
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="rounded-0 border-top-0 border-start-0 border-end-0 border-bottom"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formEventType" className="mb-3">
                                <Form.Label className="small text-muted">Event Type*</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="eventType" 
                                    value={formData.eventType}
                                    onChange={handleChange}
                                    required
                                    className="rounded-0 border-top-0 border-start-0 border-end-0 border-bottom"
                                >
                                    <option value="">Select Event Type</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Social">Social</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Form.Group controlId="formGuests" className="mb-3">
                        <Form.Label className="small text-muted">Number of Guests*</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="guests" 
                            value={formData.guests}
                            onChange={handleChange}
                            required 
                            className="rounded-0 border-top-0 border-start-0 border-end-0 border-bottom"
                        />
                    </Form.Group>
                    
                    <Row className="mb-3 align-items-center">
                        <Col md={6}>
                            <Form.Group controlId="formRequireRooms">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Do you require rooms?" 
                                    name="requireRooms" 
                                    checked={formData.requireRooms}
                                    onChange={handleChange}
                                    className="gold-checkbox"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            {formData.requireRooms && (
                                <Form.Group controlId="formRooms">
                                    <Form.Label className="small text-muted">Estimated Number of Rooms</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        name="rooms" 
                                        value={formData.rooms}
                                        onChange={handleChange}
                                        className="rounded-0 border-top-0 border-start-0 border-end-0 border-bottom"
                                    />
                                </Form.Group>
                            )}
                        </Col>
                    </Row>
                    
                    <Form.Group controlId="formRequirements" className="mb-3">
                        <Form.Label className="small text-muted">Briefly Describe Your Event Requirements</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={2} 
                            name="requirements" 
                            value={formData.requirements}
                            onChange={handleChange}
                            className="rounded-0"
                        />
                    </Form.Group>
                    
                    <Row className="mb-3 align-items-center">
                        <Col md={6}>
                            <Form.Group controlId="formCorporate">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Is this a corporate query?" 
                                    name="corporate" 
                                    checked={formData.corporate}
                                    onChange={handleChange}
                                    className="gold-checkbox"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            {formData.corporate && (
                                <Form.Group controlId="formCompany">
                                    <Form.Label className="small text-muted">Company Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="company" 
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="rounded-0 border-top-0 border-start-0 border-end-0 border-bottom"
                                    />
                                </Form.Group>
                            )}
                        </Col>
                    </Row>
                    
                    <div className="mb-4">
                        <div className="d-flex align-items-center">
                            <Form.Check 
                                type="checkbox" 
                                id="formRobot" 
                                className="me-2 gold-checkbox"
                                required
                            />
                            <Form.Label htmlFor="formRobot" className="mb-0 small">I'm not a robot</Form.Label>
                        </div>
                        <div className="mt-1 text-gold">
                            <small>HOURTEAM</small>
                        </div>
                    </div>
                    
                    <div className="text-center mb-3">
                        <small className="text-gold d-block">FOCUS FOR A POWER TO BE</small>
                        <Button 
                            variant="gold" 
                            type="submit" 
                            className="mt-2 px-4 py-2 golden-button"
                        >
                            SUBMIT
                        </Button>
                    </div>
                    
                    <div className="text-center small text-muted">
                        <small>
                            You may also contact us by phone on +91 44600 04200 or email coronandel.chennai@tajhotels.com
                        </small>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EnquiryForm;