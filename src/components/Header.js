import { Link } from "react-router-dom";

const Header = (props) => {
    return (
        <div className="tw-flex tw-justify-between tw-items-center tw-h-24 tw-mx-auto tw-px-4 tw-text-white tw-bg-gray-800">
            <h1 className="tw-text-3xl tw-font-bold">Fisher</h1>
            <ul className="tw-flex">
                <Link to="/"><li className="tw-p-6">Home</li></Link>
                <Link to="/tests"><li className="tw-p-6">Tests</li></Link>
                <Link to="/projects"><li className="tw-p-6">Projects</li></Link>
                <Link to="/new-project"><li className="tw-p-6">Create New Project</li></Link>
            </ul>
        </div>
    )
}



export default Header