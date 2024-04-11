import React, { useState, useEffect } from 'react';
import { getRoomTypes } from '../utils/ApiFunctions';
import '../styles/index.css'

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showRoomTypeInput, setShowRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState('');

  useEffect(() => {
    // Lấy danh sách loại phòng từ API
    getRoomTypes()
      .then((data) => {
        // Nếu lấy được dữ liệu từ API, sử dụng danh sách đó
        setRoomTypes(data);
      })
      .catch((error) => {
        // Nếu không thể kết nối với API hoặc có lỗi, sử dụng danh sách tùy chọn cố định
        console.error('Error fetching room types:', error);
        setRoomTypes(["Single Room", "Double Room", "Suite", "Studio", "Apartment"]);
      });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    // Kiểm tra newRoom trước khi cập nhật newRoomType
    if (newRoom && newRoom.roomType) {
      setNewRoomType(e.target.value);
    }
  }

  const handleAddNewRoomType = () => {
    if (newRoomType.trim() !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowRoomTypeInput(false);
    }
  }

  return (
    <>
      {roomTypes.length > 0 && (
        <div className="input-group">
          <select
            id='roomType'
            name='roomType'
            // Kiểm tra newRoom trước khi truy cập vào roomType
            value={newRoom && newRoom.roomType}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowRoomTypeInput(true);
              } else {
                handleRoomInputChange(e);
              }
            }}
            className="form-select"
          >
            <option value={""}>Select a room type</option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {showRoomTypeInput && (
            <>
              <input
                className='form-control'
                type='text'
                placeholder='Enter a new room type'
                value={newRoomType}
                onChange={handleNewRoomTypeInputChange}
              />
              <button className='btn btn-primary' type="button" onClick={handleAddNewRoomType}>
                Add
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default RoomTypeSelector;
