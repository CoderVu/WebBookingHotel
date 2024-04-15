import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Header from './Header';
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from 'react-icons/fa';

const HotelService = () => {
    return (
        <>
            <Container className='mb-2'>
                <Header title={"Our Service"} />
                <Row className="mt-4">
                    <h4 className='text-center'>
                        Service at <span className='hotel-color'>lakeSide - </span>  Hotel
                        <span className='gap-2'>
                            <FaClock /> - 24 - Hour Front Desk
                        </span>
                    </h4>
                </Row>
                <hr />
                <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'style={{ color: 'rgb(169, 77, 123)' }}>
                                    <FaWifi /> WiFi
                                </Card.Title>
                                <Card.Text>
                                    Free WiFi is available in all areas and is free of charge.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'style={{ color: 'rgb(169, 77, 123)' }}>
                                    <FaUtensils /> Breakfast
                                </Card.Title>
                                <Card.Text>
                                    Enjoy a delicious breakfastx hotel every morning.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'style={{ color: 'rgb(169, 77, 123)' }}>
                                    <FaTshirt /> Laundry
                                </Card.Title>
                                <Card.Text>
                                    Keep your clothing clean our laundry service.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'style={{ color: 'rgb(169, 77, 123)' }}>
                                    <FaCocktail /> Mini-bar
                                </Card.Title>
                                <Card.Text>
                                    Enjoy a drink from the mini-bar in your room.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'style={{ color: 'rgb(169, 77, 123)' }} >
                                    <FaParking /> On-site Parking
                                </Card.Title>
                                <Card.Text>
                                    Park your car conveniently on-site parking lot.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'  style={{ color: 'rgb(169, 77, 123)' }}>
                                    <FaSnowflake /> Air Conditioning
                                </Card.Title>
                                <Card.Text>
                                    Stay cool and comfortable  air conditioning system.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HotelService;
