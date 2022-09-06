import { useState } from "react"

const CreateTest = (props) => {
    const [newForm, setNewForm] = useState({
        test: ''
    });


    const handleChange = (e) => {
        setNewForm((prevState) => (
            {
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();     
        props.createVariable(newForm);


//RESET STATE

        setNewForm({
            test: ''                 
        })
    }

    return (
        <div className="tw-flex tw-justify-center tw-items-center tw-h-screen">
            <div className="tw-tw-block tw-bg-slate-50 tw-p-6 tw-rounded-xl tw-shadow-md tw-shadow-slate-300 tw-w-90">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <h1 className="tw-text-3xl tw-font-semibold tw-my-4 tw-text-center">Add New Test</h1>
                    <div>
                        <label htmlFor='test' className="tw-w-1/2 tw-mr-1">Test Name: </label>
                        <input type='text' className="tw-h-8 tw-w-full tw-rounded-md tw-border tw-border-slate-300 tw-text-sm tw-pl-2 tw-bg-transparent" value={newForm.variable} name='test' id='test' placeholder="Test Name" onChange={handleChange} required/> 
                    </div>                   
                    <div className="tw-mt-4">         
                        <input type='submit' className="tw-h-10 tw-cursor-pointer tw-w-full tw-rounded-md tw-border tw-border-slate-300 tw-text-sm tw-pl-2 tw-bg-transparent hover:tw-bg-neutral-700 tw-outline tw-outline-neutral-700 tw-outline-2 hover:tw-text-white tw-font-bold" value='Create New Variable'/>
                    </div>           
                </form>
            </div>
        </div>
    )
}


export default CreateTest