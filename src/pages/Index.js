import { Link } from "react-router-dom";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Moment from 'react-moment';

const Index = ({variables}) => {
    $(document).ready( function () {
        $('#table').DataTable({
            fixedHeader: true,
            responsive: true,
            retrieve: true,
            paging: true
        });
        } );
    const loaded = () => {
        return variables.map(({variable, project_title, production_date, preferred_test_day, developer, _id }) => {
            const dateToFormat = new Date(production_date)
            return (
                <tr key={_id}>
                    <td className="text-xs font-weight-bold"><Link to={`/projects/${_id}`}>{variable}</Link></td>
                    <td className="text-xs font-weight-bold">{project_title}</td>
                    <td className="text-xs font-weight-bold"><Moment format="MMM Do YY">{dateToFormat}</Moment></td>
                    <td className="text-xs font-weight-bold">{preferred_test_day}</td>
                    <td className="text-xs font-weight-bold">{developer}</td>
                </tr>
            )
        })
    }

    const loading = () => {
        return <h1>Loading ...</h1>
    };


    return (
        <div className="tw-bg-slate-50 tw-rounded-xl tw-shadow-md tw-shadow-slate-300 tw-m-10">
            <div className="tw-mt-[96px] tw-mx-auto tw-text-center tw-text-3xl tw-font-semibold tw-my-4 tw-p-10">Shelf Life Projects</div>


            <div class="container-fluid py-4 tw-p-5">
                <div class="table-responsive p-0 pb-2">
                    <table id="table" className="table align-items-center justify-content-center mb-0">
                        <thead>
                            <tr>
                                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Variable</th>
                                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Project Title</th>
                                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Production Date</th>
                                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Preferred Test Day</th>
                                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Developer</th>
                            </tr>
                        </thead>

                        <tbody>
                            { variables ? loaded() : loading() }
                        </tbody>
                    </table>
                </div>
           </div>
        </div>
    )
}


export default Index