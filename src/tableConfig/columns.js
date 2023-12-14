const columnsConfig = [
    {
      title: 'First Name',
      key: 'firstName',
    },
    {
        title: 'Last Name',
        key: 'lastName',
    },
    {
        title: 'Date of Birth',
        key: 'dateOfBirth',
        transformer: (value) => { 
            return value.split("/").reverse().join("");
        }
    },
    {
        title: 'Start Date',
        key: 'startDate',
        transformer: (value) => { 
            return value.split("/").reverse().join("");
        }
    },
    {
        title: 'Department',
        key: 'department',
    },
    {
        title: 'Street',
        key: 'street',
    },
    {
        title: 'City',
        key: 'city',
    },
    {
        title: 'State',
        key: 'state',
    },
    {
        title: 'Zip Code',
        key: 'zipCode',
    },
];
  
export default columnsConfig;