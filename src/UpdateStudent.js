import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import './App.css'
class UpdateStudent extends Component {

	constructor(props)
    {
		super(props);

		this.state = {
			fields: {},
			errors: {},
      redirect:null
		}
	}

	componentDidMount()
	{
		axios.get("http://localhost:3001/user/"+this.props.match.params.id).then((response)=>{
			this.setState({
				fields:response.data
			})
		})
	}
		
    contactSubmit (e) 
    {
        e.preventDefault();
        const username = this.state.fields.username
        const room = this.state.fields.room
        
        
        	axios.post("http://localhost:3001/user/update/" + this.state.fields._id, {
        		username:username,
        		room:room,
        	}).then((response)=>{
        	// alert('Student updated successfully')	
        	this.setState({redirect:true})
        	}).catch((err) => {
        		alert(err)
        	});
        

    }
	   	
    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

	render() 
    {
		if (this.state.redirect) {
            return <Redirect to="/" />
        }
		return (
            <div id="formUpdated">
              <h1>Update user</h1>
                <form onSubmit= {this.contactSubmit.bind(this)}>
                    
                  <input id="updatedInput"  ref="username"  type="text" size="30" placeholder="Username" onChange={this.handleChange.bind(this, "username")} value={this.state.fields["username"]}/>
                  <br/>
                  
                  <input id="updatedInput" ref="room" type="text" size="50" placeholder="Room" onChange={this.handleChange.bind(this, "room")} value={this.state.fields["room"]}/>
                  <br />
                  <button id="updatedButton">Submit</button>
                        
                </form>
            </div>
		);
	}
}

export default UpdateStudent;