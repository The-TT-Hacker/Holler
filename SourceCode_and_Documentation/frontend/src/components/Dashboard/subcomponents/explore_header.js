import React, { useState } from 'react'
import { Form, FormControl, ToggleButton, ToggleButtonGroup, Collapse } from 'react-bootstrap'



const ExploreHeader = () => {
    /* All of this is for toggling the search bar */
    const [value, setValue] = useState([])
    const [active, setActive] = useState(false)
    const handleChange = (val) => {
        setValue(val)
        if (active) {
            document.getElementById("search-box-input").style.display = 'none';
            document.getElementById("btn-explore-search").classList.remove("active");
        } else {
            document.getElementById("search-box-input").style.display = 'block';
            document.getElementById("btn-explore-search").classList.add("active");
        }
        setActive(!active);
    }

    /* For searching events */
    const [open, setOpen] = useState(false);
    const onFormSubmit = e => {
        e.preventDefault();
        console.log("searching");
        // search stuff
    }

    return (
        <div>
            <div className="row" style={{ width: '100%', marginBottom: '1rem' }}>
                <div className="col">
                    <div className="page-title"> Explore </div>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
                    <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>

                        <ToggleButton
                            onClick={() => { setOpen(!open); }}
                            aria-controls="collapse-search"
                            aria-expanded={open}
                            id="btn-explore-search" value={"search-button"}>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

            </div>

            <div className="row" style={{ width: '100%'}}m>
                <div className="col d-flex align-items-end justify-content-end" style={{ 'margin-right':'15px'}}>
                    <Collapse in={open} >
                        <div  className="row d-flex align-items-center justify-content-center" >
                            <Form className="search-box-form" id="search-box-input" onSubmit={onFormSubmit} inline>
                                <FormControl type="text" placeholder="Search" />
                            </Form>
                        </div>
                    </Collapse>
                </div>
            </div>
        </div>



    )
}

export default ExploreHeader