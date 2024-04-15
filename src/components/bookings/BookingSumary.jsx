import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { bookRoom } from "../utils/ApiFunctions";

const BookingSummary = ({ booking, payment, isFormValid }) => {
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const history = useHistory();
  const { roomId } = useParams();
  const checkInDate = moment(booking.checkInDate, "YYYY-MM-DD");
  const checkOutDate = moment(booking.checkOutDate, "YYYY-MM-DD");
  const numberOfDays = checkOutDate.diff(checkInDate, "days");

  const handleConfirmBooking = async () => {
    setIsProcessingPayment(true);
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setIsBookingConfirmed(true);
      history.push("/booking-success", { 
        message: `Room booked successfully. Your booking confirmation code is ${confirmationCode}`,
        confirmationCode: confirmationCode
      });
    } catch (error) {
      console.error("Error confirming booking:", error);
      history.push("/", { state: { error: error.message } });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  useEffect(() => {
    const confirmBooking = async () => {
      try {
        const confirmationCode = await bookRoom(roomId, booking);
        setIsBookingConfirmed(true);
        history.push("/booking-success", { 
          message: `Room booked successfully. Your booking confirmation code is ${confirmationCode}`
      });
      
      } catch (error) {
        console.error("Error confirming booking:", error);
        history.push("/booking-success", { state: { error: error.message } });
      } finally {
        setIsProcessingPayment(false);
      }
    };

    confirmBooking();

    // Ensure clean-up
    return () => setIsBookingConfirmed(false);
  }, [booking, history, roomId]);

  const isDateValid = checkOutDate.isSameOrAfter(checkInDate);

  return (
    <div className="card card-body mt-5">
      <h4>Reservation Summary</h4>
      <p>
        <strong>Full Name:</strong> {booking.guestName}
      </p>
      <p>
        <strong>Email:</strong> {booking.guestEmail}
      </p>
      <p>
        <strong>Check-In Date:</strong> {checkInDate.format("MM Do YYYY")}
      </p>
      <p>
        <strong>Check-Out Date:</strong> {checkOutDate.format("MM Do YYYY")}
      </p>
      <p>
        <strong>Number of Days:</strong> {numberOfDays}
      </p>
      <div>
        <h5>Number of Guests</h5>
        <p>
          <strong>
            Adult{booking.numOfAdults > 1 ? "s" : ""}: {booking.numOfAdults}
          </strong>
        </p>
        <p>
          <strong>Children:</strong> {booking.numOfChildren}
        </p>
      </div>
      {payment > 0 ? (
        <>
          <p>
            <strong>Total Payment:</strong> ${payment}
          </p>
          <Button
            variant="success"
            onClick={handleConfirmBooking}
            disabled={!isFormValid || !isDateValid || isBookingConfirmed}
          >
            {isProcessingPayment ? (
              <>
                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                Booking confirmed, redirecting to payment...
              </>
            ) : (
              "Confirm Booking and Process Payment"
            )}
          </Button>
        </>
      ) : (
        <p className="text-danger">Check-out date must be after check-in date.</p>
      )}
    </div>
  );
}  

export default BookingSummary;
