import React, { useState, useEffect } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { Card, Carousel, Container, Row, Col } from "react-bootstrap";

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms()
            .then((data) => {
                setRooms(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="mt-5">Loading rooms...</div>;
    }

    if (errorMessage) {
        return <div className="text-danger mb-5 mt-5">Error: {errorMessage}</div>;
    }

    // Chunk rooms into groups of 9
    const chunkedRooms = [];
    for (let i = 0; i < rooms.length; i += 9) {
        chunkedRooms.push(rooms.slice(i, i + 9));
    }

    return (
        <section className="bg-light mb-5 mt-5 shadow">
            <Container>
                <Carousel indicators={false}>
                    {chunkedRooms.map((group, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {group.map((room) => (
                                    <Col key={room.id} className="mb-4" xs={12} sm={6} md={4}>
                                        <Card>
                                            <Link to={`/bookings/${room.id}`}>
                                                <Card.Img variant="top" src={`data:image/png;base64,${room.photo}`} alt="Room Photo" className="w-100" style={{ height: '200px' }} />
                                            </Link>
                                            <Card.Body>
                                            <Card.Title className="hotel-color" style={{ color: "darkgoldenrod", fontFamily: "'Courier New', Courier, monospace", fontSize: "medium", position: "relative" }}>{room.roomType}</Card.Title>
                                            <Card.Title className="room-price" style={{ color: "darkgoldenrod", fontFamily: "'Courier New', Courier, monospace", fontSize: "medium", position: "relative" }}>${room.roomPrice}/night</Card.Title>
                                            <Link to={`/book-room/${room.id}`} className="btn btn-sm btn-hotel" style={{ color: "darkgoldenrod", fontFamily: "'Courier New', Courier, monospace", fontSize: "medium", position: "relative" }}>
                                                Book Now
                                            </Link>
                                            </Card.Body>
                                        
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
};

export default RoomCarousel;
