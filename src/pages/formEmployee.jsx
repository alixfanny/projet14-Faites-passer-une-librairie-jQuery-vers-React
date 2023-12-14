import ListTable from '../components/ListTable';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import columnsConfig from '../tableConfig/columns';
import { useSelector } from 'react-redux';



function Form() {
    const employeesList = useSelector(state => state.employees.list);

    return(
        <div className='body'>
            <div className='header'>
              <Link className='logo' to='/'>
                  <FontAwesomeIcon icon={faHouse} />
              </Link>
              <h2>Current Employees</h2>
            </div>
            <ListTable headers={columnsConfig} items={employeesList} />
        </div>
    )
}

export default Form