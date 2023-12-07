import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Input, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse} from '@fortawesome/free-solid-svg-icons';
import '../css/formEmploye.css'
import { Link } from 'react-router-dom';

const { Option } = Select;

const EmployeeList = () => {
  const employee = useSelector(state => state.employees.list);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(employee || []);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handlePageSizeChange = value => {
    setPagination({ ...pagination, pageSize: value });
};
  const handleSearch = value => {
    const filtered = employee.filter(entry =>
        Object.values(entry).some(
            val => typeof val === 'string' && val.toLowerCase().includes(value.toLowerCase())
        )
    );
    setFilteredData(filtered);
    setSearchText(value);
  };
  
  const columns = [
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        sorter:(a, b) => a.lastName.localeCompare(b.lastName),
      },
      {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        sorter: (a, b) => a.department.localeCompare(b.department),
      },
      {
        title: 'Date of Birth',
        dataIndex: 'dateOfBirth',
        key: 'dateOfBirth',
        sorter: (a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth),
      },
      {
        title: 'Street',
        dataIndex: 'street',
        key: 'street',
        sorter: (a, b) => a.street.localeCompare(b.street),
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        sorter: (a, b) => a.city.localeCompare(b.city),
      },
      {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
        sorter: (a, b) => a.state.localeCompare(b.state),
      },
      {
        title: 'Zip Code',
        dataIndex: 'zipCode',
        key: 'zipCode',
        sorter: (a, b) => a.zipCode.localeCompare(b.zipCode),
      },
  ];
    
  return (
      <div className="container">
          <div className='header'>
              <Link className='logo' to='/'>
                  <FontAwesomeIcon icon={faHouse} />
              </Link>
              <h1>Current Employees</h1>
          </div>
          <div className='recherche'>
            <Select
              defaultValue="10"
              style={{ width: 120, marginBottom: 16 }}
              onChange={handlePageSizeChange}
            >
              <Option value="10">10 / page</Option>
              <Option value="25">25 / page</Option>
              <Option value="50">50 / page</Option>
              <Option value="100">100 / page</Option>
            </Select>
            <Input
              className="input-with-icon"
              placeholder='Search Employees'
              value={searchText}
              onChange={e => handleSearch(e.target.value)}
            />
          </div>
          <Table 
            dataSource={filteredData} 
            columns={columns} 
            rowKey="id" 
            pagination={pagination}
            onChange={(newPagination) => setPagination({ ...pagination, current: newPagination.current })}
          />
      </div>
  );
};

export default EmployeeList;