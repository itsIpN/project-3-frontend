import { useNavigate } from "react-router-dom";
import { useState } from "react"
import moment from 'moment'


const Create = (props) => {
    const navigate = useNavigate();
    const [newForm, setNewForm] = useState({
        variable: '',
        project_title: '',
        production_date: '',
        preferred_test_day: '',
        developer: '',
        description: '',
        ph: false,
        solids: false,
        viscosity: false,
        leco: false,
        density: false,
        particle_size: false,
        sensory: false,
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false,
        nine: false,
        ten: false,
        eleven: false,
        twelve: false,
        thirteen: false,
        fourteen: false,
        fifteen: false,
        sixteen: false,
        timepoints: [],
        start: '',
        tests: [],
        timepoint_number: '',
        day_adjuster: '',
        timepoint_day:'' 
    });


    const handleChange = (e) => {
      if([e.target.type] !== 'checkbox'){
        setNewForm((prevState) => (
            {
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        } else {
            setNewForm(!e.target.checked)
        } 
    }


    const handleSubmit = (e) => {
        e.preventDefault();

// PUSH ALL DIFFERENT TESTS INTO A SINGLE TEST ARRAY FOR DB

        if(newForm.ph) {
            newForm.tests.push(`pH`)
        }
        if(newForm.solids) {
            newForm.tests.push(`Solids`)
        }
        if(newForm.viscosity) {
            newForm.tests.push(`Viscosity`)
        }
        if(newForm.leco) {
            newForm.tests.push(`LECO Protein`)
        }
        if(newForm.density) {
            newForm.tests.push(`Density`)
        }
        if(newForm.particle_size) {
            newForm.tests.push(`Particle Size`)
        }
        if(newForm.sensory) {
            newForm.tests.push(`Sensory`)
        }


//PUSH ALL TIMEPOINTS INTO A SINGLE TIMEPOINT ARRAY IN DB

        if(newForm.one) {
            newForm.timepoints.push(`1`)
        }
        if(newForm.two) {
            newForm.timepoints.push(`2`)
        }    
        if(newForm.three) {
            newForm.timepoints.push(`3`)
        }
        if(newForm.four) {
            newForm.timepoints.push(`4`)
        }
        if(newForm.five) {
            newForm.timepoints.push(`5`)
        }
        if(newForm.six) {
            newForm.timepoints.push(`6`)
        }
        if(newForm.seven) {
            newForm.timepoints.push(`7`)
        }
        if(newForm.eight) {
            newForm.timepoints.push(`8`)
        }
        if(newForm.nine) {
            newForm.timepoints.push(`9`)
        }
        if(newForm.ten) {
            newForm.timepoints.push(`10`)
        }
        if(newForm.eleven) {
            newForm.timepoints.push(`11`)
        }
        if(newForm.twelve) {
            newForm.timepoints.push(`12`)
        }
        if(newForm.thirteen) {
            newForm.timepoints.push(`13`)
        }
        if(newForm.fourteen) {
            newForm.timepoints.push(`14`)
        }
        if(newForm.fifteen) {
            newForm.timepoints.push(`15`)
        }    
        if(newForm.sixteen) {
            newForm.timepoints.push(`16`)
        }

//FOR DATE AND TIMEPOINTS

//CREATE TIMEPOINT ENTRIES DEPENDING ON THE NUMBER OF TIMEPOINTS SELECTED

        let day = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`]

        for(let i = 0; i < newForm.timepoints.length; i++) {
            let timepointDate = new Date (moment(newForm.production_date).add(newForm.timepoints[i], 'M'))
            for(let i = 0; i < day.length; i++) {
                if(timepointDate.getDay() == i) {
                    newForm.timepoint_day = day[i]
                }
            }

//ADJUSTER FOR TIMEPOINT DATES BASED ON PREFERRED TESTING DAY + DAY OF PRODUCTION
        
        let dayCombo = newForm.timepoint_day+newForm.preferred_test_day;

        if(dayCombo == `SundayMonday` || dayCombo == `MondayTuesday` || dayCombo == `TuesdayWednesday` || dayCombo == `WednesdayThursday` || dayCombo == `ThursdayFriday`) {
            newForm.day_adjuster = 1
        }

        if(dayCombo == `SundayTuesday` || dayCombo == `MondayWednesday` || dayCombo == `TuesdayThursday` || dayCombo == `WednesdayFriday` || dayCombo == `SaturdayMonday`) {
            newForm.day_adjuster = 2
        }

        if(dayCombo == `SundayWednesday` || dayCombo == `MondayThursday` || dayCombo == `TuesdayFriday` || dayCombo == `SaturdayTuesday` || dayCombo == `FridayMonday`) {
            newForm.day_adjuster = 3
        }

        if(dayCombo == `MondayMonday` || dayCombo == `TuesdayTuesday` || dayCombo == `WednesdayWednesday` || dayCombo == `ThursdayThursday` || dayCombo == `FridayFriday`) {
            newForm.day_adjuster = 0
        }

        if(dayCombo == `TuesdayMonday` || dayCombo == `WednesdayTuesday` || dayCombo == `ThursdayWednesday` || dayCombo == `FridayThursday` || dayCombo == `SaturdayFriday`) {
            newForm.day_adjuster = -1
        }

        if(dayCombo == `SundayFriday` || dayCombo == `FridayWednesday` || dayCombo == `SaturdayThursday` || dayCombo == `WednesdayMonday` || dayCombo == `ThursdayTuesday`) {
            newForm.day_adjuster = -2
        }

        if(dayCombo == `SundayThursday` || dayCombo == `MondayFriday` || dayCombo == `SaturdayWednesday` || dayCombo == `ThursdayMonday` || dayCombo == `FridayTuesday`) {
            newForm.day_adjuster = -3
        }




            newForm.start = moment(timepointDate).add(newForm.day_adjuster, `d`)
            newForm.timepoint_number = i + 1
            props.createTimepoint(newForm)
        }



//CREATE VARIABLE ENTRIES        
        props.createVariable(newForm);


//RESET STATE

        setNewForm({
            variable: '',
            project_title: '',
            production_date: '',
            preferred_test_day: '',
            description: '',
            developer: '',
            ph: false,
            solids: false,
            viscosity: false,
            leco: false,
            density: false,
            particle_size: false,
            sensory: false,
            one: false,
            two: false,
            three: false,
            four: false,
            five: false,
            six: false,
            seven: false,
            eight: false,
            nine: false,
            ten: false,
            eleven: false,
            twelve: false,
            thirteen: false,
            fourteen: false,
            fifteen: false,
            sixteen: false,
            timepoints: [],
            start: '',
            tests: [],
            timepoint_number: '',
            day_adjuster: '',
            timepoint_day:''                  
        })
        navigate(`/`)
    }

    return (
        <div className="tw-flex tw-justify-center tw-mt-10 tw-h-max">
            <div className="tw-tw-block tw-bg-slate-50 tw-p-6 tw-rounded-xl tw-shadow-md tw-shadow-slate-300 tw-w-90">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <h1 className="tw-text-3xl tw-font-semibold tw-my-4 tw-text-center">Add New Shelf Life Variable</h1>
                    <div>
                        <label htmlFor='variable' className="tw-w-1/2 tw-mr-1">Variable</label>
                        <input type='text' className="tw-h-8 tw-w-full tw-rounded-md tw-border tw-border-slate-300 tw-text-sm tw-pl-2 tw-bg-transparent" value={newForm.variable} name='variable' id='variable' placeholder="Variable" onChange={handleChange} required/> 
                    </div>                   
                    <div className="tw-mt-2">
                    <label htmlFor='project_title' className="tw-w-1/2 tw-mr-1">Project Title</label>
                        <input type='text' className="tw-h-8 tw-w-full tw-rounded-md tw-border tw-border-slate-300 tw-text-sm tw-pl-2 tw-bg-transparent" value={newForm.project_title} name='project_title' id='project_title' placeholder="Project Title" onChange={handleChange} required/>     
                    </div>       
                    <div className="tw-mt-2">
                        <label htmlFor='production_date' className="tw-w-1/2 tw-mr-1">Production Date</label>
                        <input type='date' className="tw-h-8 tw-w-full tw-rounded-md tw-border tw-border-slate-300 tw-text-sm tw-pl-2 tw-bg-transparent" value={newForm.production_date} name='production_date' id='production_date' onChange={handleChange} required/>   
                    </div>         
                    <div className="tw-mt-2">
                        <label htmlFor='preferred_test_day' className="tw-w-1/2 tw-mr-1">Preferred Testing Day</label>
                        <select  className="tw-h-8 tw-w-full tw-rounded-md tw-border tw-border-slate-300 tw-text-sm tw-pl-2 tw-bg-transparent" value={newForm.preferred_test_day} name='preferred_test_day' id='preferred_test_day' onChange={handleChange} required> 
                            <option value='' disabled defaultValue>Select preferred testing day</option>
                            <option value='Monday'>Monday</option>
                            <option value='Tuesday'>Tuesday</option>
                            <option value='Wednesday'>Wednesday</option>
                            <option value='Thursday'>Thursday</option>
                            <option value='Friday'>Friday</option>                    
                        </select>  
                    </div>
                    <h2 className="tw-mt-2">Tests</h2>
                    <div id='tests' className="tw-flex tw-flex-row tw-mt-2">
                        
                        <div className="tw-mr-4">
                            <label htmlFor='ph' className="tw-w-1/2 tw-mr-1 tw-text-sm">pH</label>
                            <input type='checkbox' name='ph' checked={newForm.ph} onChange={handleChange}/>
                        </div>                        
                        <div className="tw-mr-4">
                            <label htmlFor='solids' className="tw-w-1/2 tw-mr-1 tw-text-sm" >Solids</label>
                            <input type='checkbox' name='solids' checked={newForm.solids} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='viscosity' className="tw-w-1/2 tw-mr-1 tw-text-sm" >Viscosity</label>
                            <input type='checkbox' name='viscosity' checked={newForm.viscosity} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='leco' className="tw-w-1/2 tw-mr-1 tw-text-sm">LECO Protein</label>
                            <input type='checkbox' name='leco' checked={newForm.leco} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='density' className="tw-w-1/2 tw-mr-1 tw-text-sm" >Density</label>
                            <input type='checkbox' name='density' checked={newForm.density} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='particle_size' className="tw-w-1/2 tw-mr-1 tw-text-sm">Particle Size</label>
                            <input type='checkbox' name='particle_size' checked={newForm.particle_size} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor='sensory' className="tw-w-1/2 tw-mr-1 tw-text-sm">Sensory</label>
                            <input type='checkbox' name='sensory' checked={newForm.sensory} onChange={handleChange}/>
                        </div>
                    </div>
                    <h2 className="tw-mt-2">Testing timepoints</h2>
                    <div id='tests' className="tw-flex tw-flex-row tw-tw-mt-2">                        
                        <div className="tw-mr-4">
                            <label htmlFor='one' className="tw-w-1/2 tw-mr-1 tw-text-sm">1</label>
                            <input type='checkbox' name='one' checked={newForm.one} onChange={handleChange}/>
                        </div>                        
                        <div className="tw-mr-4">
                            <label htmlFor='two' className="tw-w-1/2 tw-mr-1 tw-text-sm" >2</label>
                            <input type='checkbox' name='two' checked={newForm.two} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='three' className="tw-w-1/2 tw-mr-1 tw-text-sm" >3</label>
                            <input type='checkbox' name='three' checked={newForm.three} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='four' className="tw-w-1/2 tw-mr-1 tw-text-sm">4</label>
                            <input type='checkbox' name='four' checked={newForm.four} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='five' className="tw-w-1/2 tw-mr-1 tw-text-sm" >5</label>
                            <input type='checkbox' name='five' checked={newForm.five} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='six' className="tw-w-1/2 tw-mr-1 tw-text-sm">6</label>
                            <input type='checkbox' name='six' checked={newForm.six} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='seven' className="tw-w-1/2 tw-mr-1 tw-text-sm">7</label>
                            <input type='checkbox' name='seven' checked={newForm.seven} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='eight' className="tw-w-1/2 tw-mr-1 tw-text-sm">8</label>
                            <input type='checkbox' name='eight' checked={newForm.eight} onChange={handleChange}/>
                        </div>                        
                        <div className="tw-mr-4">
                            <label htmlFor='nine' className="tw-w-1/2 tw-mr-1 tw-text-sm" >9</label>
                            <input type='checkbox' name='nine' checked={newForm.nine} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='ten' className="tw-w-1/2 tw-mr-1 text-sm" >10</label>
                            <input type='checkbox' name='ten' checked={newForm.ten} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='eleven' className="tw-w-1/2 tw-mr-1 tw-text-sm">11</label>
                            <input type='checkbox' name='eleven' checked={newForm.eleven} onChange={handleChange}/>
                        </div>                        
                        <div className="tw-mr-4">
                            <label htmlFor='twelve' className="tw-w-1/2 tw-mr-1 tw-text-sm" >12</label>
                            <input type='checkbox' name='twelve' checked={newForm.twelve} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='thirteen' className="tw-w-1/2 tw-mr-1 tw-text-sm" >13</label>
                            <input type='checkbox' name='thirteen' checked={newForm.thirteen} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='fourteen' className="tw-w-1/2 tw-mr-1 tw-text-sm">14</label>
                            <input type='checkbox' name='fourteen' checked={newForm.fourteen} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='fifteen' className="tw-w-1/2 tw-mr-1 tw-text-sm" >15</label>
                            <input type='checkbox' name='fifteen' checked={newForm.fifteen} onChange={handleChange}/>
                        </div>
                        <div className="tw-mr-4">
                            <label htmlFor='sixteen' className="tw-w-1/2 tw-mr-1 tw-text-sm">16</label>
                            <input type='checkbox' name='sixteen' checked={newForm.sixteen} onChange={handleChange}/>
                        </div>
                    </div>           
                    <div className="tw-mt-2">
                        <label htmlFor='developer' className="tw-w-1/2 tw-mr-1">Developer Name</label>
                        <input type='text' className="tw-h-8 tw-w-full tw-rounded-md tw-border tw-border-slate-300 tw-text-sm tw-pl-2 tw-bg-transparent" value={newForm.developer} name='developer' id='developer' placeholder="Developer Name" onChange={handleChange} required/>
                    </div>
                    <div className="tw-mt-2">
                        <label htmlFor="description" className="tw-w-1/2 tw-mr-1">Variable Description</label>
                        <textarea className="tw-h-8 tw-w-full tw-rounded-md tw-border tw-border-slate-300 tw-text-sm tw-pl-2 tw-bg-transparent tw-min-h-[100px]" name='description' id='description' placeholder="Variable Description" value={newForm.description} onChange={handleChange} required/>
                    </div>
                    <div className="tw-mt-4">         
                        <input type='submit' className="tw-h-10 tw-cursor-pointer tw-w-full tw-rounded-md tw-border tw-border-slate-300 tw-text-sm tw-pl-2 tw-bg-transparent hover:tw-bg-neutral-700 tw-outline tw-outline-neutral-700 tw-outline-2 hover:tw-text-white tw-font-bold" value='Create New Variable'/>
                    </div>           
                </form>
            </div>
        </div>
    )
}


export default Create