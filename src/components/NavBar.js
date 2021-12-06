import { Form , Button } from "react-bootstrap";
import { useState } from "react";
import '../styles/NavBar.css';

export default ({callBack}) => {

    const [currentCity, setCurrentCity] = useState("");
    const [placeholder, setPlaceholder] = useState("Enter the location");
    const [labelState, setLabelState] = useState("SearchLabel");
    
    const handleInputChange = (oEvent) => {
        if (labelState === "searchLabel searchWarning") {
            setLabelState("searchLabel");
            setPlaceholder("Enter the location");
        } else {
            setCurrentCity(oEvent.target.value);
        }
    }

    const handleInputClick = ()=>{
        if (labelState === "searchLabel searchWarning") {
            setLabelState("searchLabel");
            setPlaceholder("Enter the location");
        }
    }

    const handleButtonClick = ()=>{
        if (currentCity.trim(" ") === "") {
            setLabelState("searchLabel searchWarning");
            setPlaceholder("");
        } else {
            callBack(currentCity);
            setLabelState("searchLabel");
            setPlaceholder("Enter the location");
        }
    }

    const handleKeyPress = (oEve)=>{
        if (oEve.key === "Enter") handleButtonClick();
        else handleInputClick();
    }

    return (
        <nav className="navbar navStyle navbar-light bg-dark justify-content-between">
            <h5 className="px-3 titleStyle">Weather Info</h5>
            <Form className="d-flex">
                <input
                    value={currentCity}
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                    onKeyPress={handleKeyPress}
                    className="SearchInput me-3 rounded"
                    placeholder={placeholder}
                />
                <Button className="me-3" onClick={handleButtonClick} variant="secondary">Search</Button>
            </Form>
        </nav>
    )
    
}


