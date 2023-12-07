import CreateEmploye from "../components/CreateEmploye";
import { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/dialog';
import 'jquery-modal';

import '../css/createEmploye.css'

function Index() {
  const form = useRef(null);

  const submitForm = () => {
    form.current.requestSubmit();
    $('#confirmation').modal();
  };

  return (
    <section>
        <header>
            <h1>HRnet</h1>
            <Link to='/form'>
            <FontAwesomeIcon icon={faList} />
                View Current Employees
            </Link>
        </header>
        <div>
            <h2>Create Employee</h2>
            <CreateEmploye formRef={form} />
            <button onClick={submitForm} className="save-button">
                Save
            </button>
        </div>
        <div id="confirmation" className="modal">
            <a className="button-close-modal" href="#close" rel="modal:close">
                <FontAwesomeIcon icon={faXmark}/>
            </a>
            <p className="text-confirmation">Employee Created!</p>
        </div>
    </section>
  );
}

export default Index;