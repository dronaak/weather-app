import { Form , FormControl,  Button } from "react-bootstrap";
import '../styles/NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar navbar-light bg-light justify-content-between">
            <h1 className="navbar-brand titleStyle px-3">Weather Info</h1>
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button className="me-3" variant="secondary">Search</Button>
            </Form>
        </nav>
    )
    
}


export default NavBar;
