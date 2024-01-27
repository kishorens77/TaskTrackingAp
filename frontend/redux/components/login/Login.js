import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import { loginUser } from '../../service/LoginService';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/loginActions';

function Login() {

    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({
        userName: '', password: '',
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
    }


    function handleFormSubmit(event) {
        event.preventDefault();
        loginUser(loginData)
        //dispatch(login(loginData));
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Enter your Login details</Card.Title>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="userName"
                                value={loginData.userName} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password"
                                value={loginData.password} onChange={handleInputChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
