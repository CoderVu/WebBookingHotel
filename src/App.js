import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddRoomComponent from './components/room/AddRoomComponent';
import ExistingRooms from './components/room/ExitstingRooms'
import './components/styles/index.css'; // Import index.css file
import Home from './components/home/Home';
import EditRoomComponent from './components/room/EditRoomComponent';
import NavBar from './components/layout/NavBar'; // Import NavBar component
import Footer from './components/layout/Footer'; // Import Footer component
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';


const App = () => {
  return (
    <Router>
      <NavBar /> {/* Đặt Navbar ở đầu trang */}
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add-room" component={AddRoomComponent} />
          <Route path="/edit-room/:roomId" component={EditRoomComponent} />
          <Route path="/existing-rooms" component={ExistingRooms} />
          <Route path="/browse-all-room" component={RoomListing} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </main>
      <Footer /> {/* Đặt Footer ở cuối trang */}
    </Router>
  );
}

export default App;
