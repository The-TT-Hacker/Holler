import React from 'react'
import { Button, Image } from 'react-bootstrap'
import Event from '../../icons/banner.svg'
import Chat from '../../icons/chat.svg'
import Going from '../../icons/going-btn.svg'


const Explore = () => {
  return (
    <div id="tempo2" className="temp">

      <div className="expl_txt" >
              Explore
                <Button className="expl_btn-filter " > Type </Button>
                <Button className="expl_btn-filter " > Date </Button>
      </div>
      <div className="expl_box">

      <div className="expl_events">

        <div className="expl_events_col">
          <Image src={Event} className="expl_imag" />

        </div>

        <div className="expl_events_info">

        <div className="expl_events_info_title">
        CseSoc Weekly Event
        </div>
        <div className="expl_events_info_location">
        Tom, 12-2pm, John Lion's Garden (J17)
        </div>
          <Image src={Going} className="expl_events_info_going" />
          <Image src={Chat} className="expl_events_info_chating" />

          <div className="expl_events_info_timing">
          Next Match
          24hrs
          </div>

        </div>

      </div>


      </div>
    </div>

  )
}

export default Explore