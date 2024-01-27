import React from "react";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { registerUser } from "../../service/LoginService";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Registration.css'

function Registration() {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        state: '',
        zip: ''
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        try {
            await registerUser(formData);
            navigate('/');
          } catch (error) {
            console.log(error);
          }

    }


    return (
        <div className="registration-page">
            <Form className="registration-form" onSubmit={handleFormSubmit}>
                <h1>Enter your details to Register</h1>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formuname">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter your Username" name="userName"
                                value={formData.userName} onChange={handleInputChange}
                                required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email"
                                value={formData.email} onChange={handleInputChange}
                                required />

                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formpassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password"
                                onChange={handleInputChange} value={formData.password} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formphone">
                            <Form.Label>Phone No.</Form.Label>
                            <Form.Control type="tel" placeholder="Phone no." name="phone"
                                onChange={handleInputChange} value={formData.phone} required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="City" name="city"
                                onChange={handleInputChange} value={formData.city} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" placeholder="State" name="state"
                                onChange={handleInputChange} value={formData.state} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="zip">
                            <Form.Label>ZIP Code</Form.Label>
                            <Form.Control type="text" placeholder="zip" name="zip"
                                onChange={handleInputChange} value={formData.zip} required />
                        </Form.Group>
                    </Col>
                </Row>
                <div style={{ padding: 25 }}>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </div>

            </Form>

        </div>
    )
}

export default Registration