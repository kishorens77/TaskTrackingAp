import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../images/logo.png'
import './Navbar.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function Navigationbar({ handleLogout, isLoggedIn }) {
  const navigate = useNavigate();
  const {id}  = useParams();
  console.log(id);

  function LogoutEvent(){
    handleLogout();
    navigate('/');
    

  }



  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container className="navbar-container">
        <Link className="custom-logo" to={`/Home/${id}`}>
          <img src={logo} alt="logo" style={{ width: 52, marginTop: -10 }} />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to ={`/Home/${id}`} className="custom-navlink" >
              Home
            </Link>
            <Link to = {`/Mytasks/${id}`} className="custom-navlink" >
              My Tasks
            </Link>
            <Button className="logout-button" variant="warning" onClick={LogoutEvent}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Navigationbar;