import { useNavigate } from "react-router-dom"
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


const Calendar = ({timepoint}) => {
    const navigate = useNavigate();
    return (
        <div className="tw-m-10">
                  <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    events={timepoint}
                    eventDisplay="block"
                    displayEventTime = {false}
                    eventColor="rgb(31,41,55)"
                    height="750px"
                    eventClick={function(info){
                        info.jsEvent.preventDefault();
                        console.log(info)
                        navigate(`/timepoints/${info.event._def.extendedProps._id}`)
                    }} 
                    />
        </div>
    )
}

export default Calendar