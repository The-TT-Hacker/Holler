import React, { useState } from 'react'
import { Card, Form, FormControl, Button, Accordion} from 'react-bootstrap'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle'


function SearchBar ({children,eventKey}) {
    const [active, setActive] = useState(false)
    const displaySearchBox =  useAccordionToggle(eventKey, () =>{

        if (active) {
            document.getElementById("btn-explore-search").classList.remove("active")
        } else {
            document.getElementById("btn-explore-search").classList.add("active")
        }
        setActive(!active)
    })

    return (
        <Button id="btn-explore-search" onClick={displaySearchBox}> </Button>
    )
}

const SearchButton = () => {
    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <SearchBar eventKey="0"></SearchBar>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form className="search-box-form" id="search-box-input" >
                                <FormControl type="text" placeholder="Search" />
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}

export default SearchButton