import React from 'react';
import '../styles/index.css'
import HeaderMain from '../layout/HeaderMain';
import HotelService from '../common/HotelService';
import Parallax from '../common/Parallax';
import RoomCarousel from '../room/RoomCarousel';
import RoomSearch from '../common/RoomSearch';
const Home  = () => {
    return (
        <section> 
            <HeaderMain/>
            <section className='container'>
            <RoomSearch/>
            <RoomCarousel/>
          
            <HotelService/>
            </section> 
        </section>
    )
}
export default Home