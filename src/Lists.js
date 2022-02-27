import React, {useState, useEffect,useMemo} from 'react';
import { Link } from 'react-router-dom'
async function userDataList() {

	return fetch('http://localhost:3001/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }).then(data => data.json())

}
function List({socket,username,room}) {
	// const [currentMessage, setCurrentMessage] = useState('');
	const [userdata, setUserData] = useState();

	useMemo( async e => {
        var allData = await userDataList();
        console.log(allData)
        setUserData(allData)     
    },[]);
	useEffect(()=> {
		// socket.on('receive_message', (data) => {
		// 	console.log(data)
		// })
		socket.on('list_data', (data) => {
			console.log(data)
			setUserData(data)
		})
	},[socket])
	return (
		<div>
			<h3>List of data</h3>
			{
                userdata?
                <div>
                    <br />
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>##</th>
                                <th>Room Id</th>
                                <th>Name</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            userdata.map((val, i)=>
                            <tr>
                                <td>{i+1}</td>
                                <td>{val.room}</td>
                                <td>{val.username}</td>
                                <td><Link to={"/student/edit/"+val._id}>Edit</Link></td>
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
                :null
            }
		</div>
	)
}

export default List