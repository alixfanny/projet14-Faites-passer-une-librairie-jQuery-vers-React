import React, { useRef, useEffect } from 'react';
import { states } from '../data/states';
import { useDispatch } from "react-redux";
import { add } from "../redux/employeeSlice.js";
import $ from 'jquery';
import 'jquery-ui/ui/widgets/selectmenu';
import 'jquery-datetimepicker';
import '../css/createEmploye.css';
import '../css/jquery.datetimepicker.css'

function CreationForm({ className, formRef }) {
  const dispatch = useDispatch();

  const department = useRef(null);
  const state = useRef(null);
  const birthdate = useRef(null);
  const startdate = useRef(null);

  useEffect(() => {
    $(department.current).selectmenu();
    $(state.current)
      .selectmenu()
      .selectmenu("menuWidget")
      .addClass(["select-overflow"]);

    $(birthdate.current).datetimepicker({
      timepicker: false,
      format: "m/d/Y",
    });
    $(startdate.current).datetimepicker({
      timepicker: false,
      format: "m/d/Y",
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    let employee = {};

    for (let field of formData.entries()) {
      employee[field[0]] = field[1];
    }
    dispatch(add(employee));
    formRef.current.reset();
  };

  return (
    <form className={`form`} ref={formRef} onSubmit={handleSubmit}>
        <div className={`${["input-employer"]}`}>
            <div className='container-input'>
                <h3>employer</h3>
                <div className={`${["input-container"]}`}>
                <label  htmlFor="firstName">
                    First Name: 
                </label>
                <input
                    className={["input-field"]}
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                />
                </div>
                <div className={`${["input-container"]}`}>
                    <label htmlFor="lastName">
                        Last Name: 
                    </label>
                    <input
                        className={["input-field"]}
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                    />
                </div>
                <div className={`${["input-container"]}`}>
                    <label htmlFor="dateOfBirth">
                        Date of Birth: 
                    </label>
                    <input
                        className={["input-field"]}
                        id="dateOfBirth"
                        type="text"
                        name="dateOfBirth"
                        ref={birthdate}
                        required
                    />
                </div>
            </div>
        </div>

        <div className={` ${["input-address"]}`}>
            <div className='container-input'>
                <h3>address</h3>
                <div className={`${["input-container"]}`}>
                    <label htmlFor="street">
                    Street :
                    </label>
                    <input
                    className={["input-field"]}
                    id="street"
                    type="text"
                    name="street"
                    required
                    />
                </div>

                <div className={`${["input-container"]}`}>
                    <label htmlFor="city">
                        City: 
                    </label>
                    <input
                        className={["input-field"]}
                        id="city"
                        type="text"
                        name="city"
                        required
                    />
                </div>

                <div className={`${["input-container"]}`}>
                    <label htmlFor="state">
                        State: 
                    </label>
                    <select name="state" id="state" ref={state} required>
                        {states.map((stat, index) => {
                        return (
                            <option value={stat.abbreviation} key={index}>
                            {stat.name}
                            </option>
                        );
                        })}
                    </select>
                </div>

                <div className={`${["input-container"]}`}>
                    <label htmlFor="zipCode">
                        Zip Code: 
                    </label>
                    <input
                        className={["input-field"]}
                        id="zipCode"
                        type="number"
                        name="zipCode"
                        required
                    />
                </div>
            </div>
        </div>

        <div className={`${["input-employs"]}`}>
            <div className='container-input'>
                <h3>employs</h3>
                <div className={`${["input-container"]}`}>
                    <label  htmlFor="startDate">
                        Start Date: 
                    </label>
                    <input
                        className={["input-field"]}
                        id="startDate"
                        type="text"
                        name="startDate"
                        ref={startdate}
                        required
                    />
                </div>

                <div className={`${["input-container"]}`}>
                    <label  htmlFor="department">
                        Department: 
                    </label>
                    <select name="department" id="department" ref={department} required>
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option>Engineering</option>
                        <option>Human Resources</option>
                        <option>Legal</option>
                    </select>
                </div>
            </div>
        </div>
    </form>
  );
}

export default CreationForm;