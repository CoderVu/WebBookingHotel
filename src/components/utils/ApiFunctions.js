import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081"
});

// This function adds a new room
export async function AddRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  try {
    const response = await api.post("/rooms/add/new-room", formData);
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error adding room:", error);
    return false;
  }
}
// This function gets all room types from the database
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw new Error("Error fetching room types");
  }
}
// This funtion get all room from database
export async function getAllRooms() {
  try {
    const response = await api.get("/rooms/all-rooms");
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Error fetching rooms");
  }
}
// This function delete room from database
export async function deleteRoom(roomId) {
  try {
    const response = await api.delete(`/rooms/delete/room/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    return false;
  }
}
// This function updates a room in the database
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);

  try {
    const response = await api.put(`/rooms/update/${roomId}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating room:", error);
    throw new Error("Error updating room");
  }
}
// This function gets a room by its ID
export async function getRoomById(roomId) {
  try {
    const reaction = await api.get(`/rooms/room/${roomId}`);
    return reaction.data;
  } catch (error) {
    throw new Error("Error fetching room by ID", error);
  }
}
