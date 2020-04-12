import React, { useState } from 'react'
import { Form, FormControl, ToggleButton, ToggleButtonGroup, Collapse} from 'react-bootstrap'



const SearchButton = () => {
    const [value, setValue] = useState([])
    const handleChange = (val) => setValue(val)

    const onFormSubmit = e => {
        e.preventDefault();
        console.log("searching");
        // search stuff
    }

    const [active, setActive] = useState(false)
    const displaySearchBox = () => {

        if (active) {
            document.getElementById("search-box-input").style.display('none');
            document.getElementById("btn-explore-search").classList.remove("active");
        } else {
            document.getElementById("search-box-input").style.display('block');
            document.getElementById("btn-explore-search").classList.add("active");
        }
        setActive(!active);
    }


    return (

        <div>
            <div className="col-5 d-flex justify-content-end">
                <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton
                        onClick={() => {setOpen(!open);
                                        displaySearchBox;}}
                        aria-controls="collapse-search"
                        aria-expanded={open}
                        className="btn-explore-search" value={"search-button"}>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <Collapse in={open}>
                <div id="collapse-search" className="row d-flex align-items-center justify-content-end">
                    <Form className="search-box-form" id="search-box-input" onSubmit={onFormSubmit} inline>
                        <FormControl type="text" placeholder="Search" />
                    </Form>
                </div>
            </Collapse>
        </div>
    )
}

export default SearchButton