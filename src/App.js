import './App.css'
import io from 'socket.io-client';
import {useState} from "react";
import List from './Lists.js'
import UpdateStudent from "./UpdateStudent"

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {Navbar, Nav} from "react-bootstrap"



const socket  = io.connect("http://localhost:3001");

async function register(credentials) {

	return fetch('http://localhost:3001/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())

}

function App() {
	const [username, setUsername] = useState('');
	const [room, setRoom] = useState('');

	const joinRoom = async () => {

		if (username !== "" && room !== "") {
			socket.emit('join_room',room)

			await register({
               username:username,
               room:room
            });
			setUsername('')
			setRoom('')
            document.getElementById('myInput1').value = '';
            document.getElementById('myInput2').value = ''
		}
	};
	return (
			<div className="App">
				<Router>
	                <Navbar bg="light" expand="lg">
	                 
	                    <Navbar.Collapse id="basic-navbar-nav">
	                        <Nav className="mr-auto">
	                            <Nav.Link ><Link to="/"> Home</Link></Nav.Link>
	                            <Nav.Link ><Link to="/student/create"> Create</Link></Nav.Link>
	                        </Nav>
	                    </Navbar.Collapse>
	                </Navbar>

	                <Route exact path="/"> <List socket={socket} username={username} room={room} />  </Route>
	               
	                <Route path="/student/create">
	                	<div className='joinChatContainer'>
							<h3>Register</h3>
							<input id="myInput1" type="text" placeholder="Username" onChange={(event)=>{setUsername(event.target.value);}} />&nbsp;
							<input id="myInput2" type="text" placeholder="room id" onChange={(event)=>{setRoom(event.target.value);}} />&nbsp;
							<button onClick={joinRoom}>Submit</button>
						<List socket={socket} username={username} room={room} />  
						</div>
	                </Route>
	                
	                <Route path="/student/edit/:id" render={props=>(<UpdateStudent {...props} /> )}></Route>
        		</Router>
			</div>
		);

}

export default App;
