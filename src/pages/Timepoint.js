//NOT WORKING RIGHT NOW

import { useParams } from "react-router-dom"
import Moment from 'react-moment';


const Timepoint = ({timepoint}) => {
    const {id} = useParams()
    const point = timepoint ? timepoint.find(v => v._id === id) : null;
    const dateToFormat = new Date(point.production_date)
    const loading = () => {
        return <h1 className="mt-[96px] mx-auto text-center">Loading ... </h1>
    };
    const loaded = () => {
        return (
            <>
                <h1 className="tw-text-3xl tw-text-center tw-font-bold">Variable Code: <span className="tw-font-semibold">{point.variable}</span></h1>
                <h2 className="tw-text-3xl tw-text-center tw-font-bold">Project Name: <span className="tw-font-semibold">{point.project_title}</span></h2>
                <h2 className="tw-text-2xl tw-text-center tw-font-bold">Production Date: <span className="tw-font-semibold"><Moment format="MMM Do YY">{dateToFormat}</Moment></span></h2>
                <h2 className="tw-text-2xl tw-text-center tw-font-bold">Timepoint: <span className="tw-font-semibold">Timepoint #{point.timepoint_number}</span></h2>
                <h2 className="tw-text-2xl tw-text-center tw-font-bold">Developer: <span className="tw-font-semibold">{point.developer}</span></h2>
                <h2 className="tw-text-2xl tw-text-left tw-font-bold">Tests to Run:</h2>
                <ul className="tw-list-disc">
                    {point.tests.map((test, index) => {
                        return (
                        <>
                            <li className="tw-text-xl tw-text-left tw-ml-8" key={index}>{test}</li>
                        </>
                        )
                    })}
                    </ul>
                <h2 className="tw-text-2xl tw-text-left tw-font-bold">Variable Description</h2>
                <h2 className="tw-text-xl tw-text-left tw-font-semibold">{point.description}</h2>
            </>
        );
    };
    return (
        <div className="tw-m-10">
            <div className="tw-tw-block tw-bg-slate-50 tw-p-6 tw-rounded-xl tw-shadow-md tw-shadow-slate-300 tw-w-90">
                { point ? loaded() : loading() }
            </div>
        </div>
    )
}


export default Timepoint