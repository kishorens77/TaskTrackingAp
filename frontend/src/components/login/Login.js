import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import { loginUser } from '../../service/LoginService';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ handleLogin, isLoggedIn }) {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        userName: '', password: '',
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
    }


    async function handleFormSubmit(event) {
        event.preventDefault();
        try {
            const res = await loginUser(loginData);
            if (res.status===200) {
                localStorage.setItem('userData',JSON.stringify({userId:res.id , token: res.token}))
                handleLogin();
                navigate(`/Home/${res.id}`);
            } else {
                console.log('Incorrect login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    function redirectToRegister() {
        navigate('/Registration');
    }

    return (
        <div className="login-container">
            <Card className="login-card">
                <Card.Body>
                    <Card.Title className="login-title">Enter your Login details</Card.Title> {/* Add a CSS class to the title */}
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="userName"
                                value={loginData.userName}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={loginData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="login-button">
                            Log In
                        </Button>
                        <div className="register-button">
                            <Button variant="success" className="register-button" onClick={redirectToRegister}>
                                Register an Account
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
