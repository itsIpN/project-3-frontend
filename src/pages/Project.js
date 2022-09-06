import { useParams } from "react-router-dom"
import Moment from 'react-moment';


const Project = ({variables}) => {
    const {id} = useParams()
    const variable = variables ? variables.find(v => v._id === id) : null;
    const dateToFormat = new Date(variable.production_date)
    const loading = () => {
        return <h1 className="mt-[96px] mx-auto text-center">Loading ... </h1>
    };
    const loaded = () => {
        return (
            <>
                <h1 className="tw-text-3xl tw-text-center tw-font-bold">Variable Code: <span className="tw-font-semibold">{variable.variable}</span></h1>
                <h2 className="tw-text-3xl tw-text-center tw-font-bold">Project Name: <span className="tw-font-semibold">{variable.project_title}</span></h2>
                <h2 className="tw-text-2xl tw-text-center tw-font-bold">Production Date: <span className="tw-font-semibold"><Moment format="MMM Do YY">{dateToFormat}</Moment></span></h2>
                <h2 className="tw-text-2xl tw-text-center tw-font-bold">Developer: <span className="tw-font-semibold">{variable.developer}</span></h2>
                <h2 className="tw-text-2xl tw-text-left tw-font-bold">Tests to Run:</h2>
                <ul className="tw-list-disc">
                    {variable.tests.map((test, index) => {
                        return (
                        <>
                            <li className="tw-text-xl tw-text-left tw-ml-8" key={index}>{test}</li>
                        </>
                        )
                    })}
                    </ul>
                <h2 className="tw-text-2xl tw-text-left tw-font-bold">Timepoints:</h2>
                <ul className="tw-list-disc">
                    {variable.timepoints.map((timepoint, index) => {
                        return (
                            <>
                                <li className="tw-text-xl tw-text-left tw-ml-8" key={index}>{timepoint} month(s)</li>
                            </>

                        )
                        
                    })}
                </ul>
                <h2 className="tw-text-2xl tw-text-left tw-font-bold">Variable Description</h2>
                <h2 className="tw-text-xl tw-text-left tw-font-semibold">{variable.description}</h2>
            </>
        );
    };
    return (
        <div className="tw-m-10">
            <div className="tw-tw-block tw-bg-slate-50 tw-p-6 tw-rounded-xl tw-shadow-md tw-shadow-slate-300 tw-w-90">
                { variable ? loaded() : loading() }
            </div>
        </div>
    )
}


export default Project