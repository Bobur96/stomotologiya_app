import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inpt = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const inpt2 = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];


const Doctor = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const closeRef = useRef();
    const closeRef2 = useRef();
    const [doc, setDoc] = useState('');
    const [doc2, setDoc2] = useState('');
    const [patient2, setPatient2] = useState('')

    const [patient, setPatient] = useState([])
    const [doctors, setDoctors] = useState([])
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const response = async () => {
            setLoading(true)
            await getPatiens()
            await getDetails()
            setLoading(false)
        }
        response()
    }, [])

    const getPatiens = () => {
        axios(`${process.env.REACT_APP_API_URL_D}/get_patients`, {
            headers: {token: sessionStorage.getItem('token')}
        }).then(res => {
            console.log(res.data);
            setPatient(res.data)
        })
            .catch(err => console.log(err))
    }
    const getDetails = () => {
        axios(`${process.env.REACT_APP_API_URL_D}/get_obj?table_name=DentalComplaints`, {
            headers: {token: sessionStorage.getItem('token')}
        }).then(res => {
            console.log(res.data);
            setDetails(res.data)
        })
            .catch(err => console.log(err))
    }
    const handleSave = () => {
        closeRef.current.click();
        document.querySelectorAll("input").forEach((el) => (el.checked = false));
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSubmit = () => {
        document.querySelectorAll('input').forEach(el => {
            el.checked = false;
        })
        setDoc('')
        toast.success('Successfully added!')
    }

    return (
        <div className="doctor">
            <ToastContainer autoClose={2000}/>
            <div className="row">
                <div className="col-3 list_cont">
                    <h4 className="text-center my-4">Mijozlar ro'yhati</h4>
                    {
                        loading ? <p>loading...</p> :
                            <>
                                {
                                    patient.map((item, i) => (
                                        <span className="list__item" key={i}>
                                        <input type="checkbox" id={`${item.id}`} value={item.id}/>
                                        <label htmlFor={`${item.id}`}>{item.first_name + '  ' + item.last_name}</label>
                                        <div className="menu__btn">
                                          <IconButton aria-haspopup="true" onClick={handleClick}>
                                            <MoreVertIcon/>
                                          </IconButton>
                                          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                              <MenuItem>select</MenuItem>
                                              <MenuItem>View karta</MenuItem>
                                          </Menu>
                                        </div>
                                      </span>
                                    ))
                                }
                                <AddCircleIcon
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    className="add__icon" color="primary"/>
                            </>
                    }

                </div>
                <div className="col-8 reg_center" style={{ background: "#8BB6B3" }}>
                    <img src="tooth.png" alt="" width={600} height={400} />
                    {inpt.map((el, idx) => (
                        <div className={`input b${idx + 1} d-grid`} key={idx}>
                            <label htmlFor={`chkbox${el}`}>{el}</label>
                            <input type="checkbox" id={`chkbox${el}`} value={el} />
                        </div>
                    ))}
                    {inpt2.map((el, idx) => (
                        <div className={`input bc c${idx + 1} d-grid`} key={idx}>
                            <input type="checkbox" id={`chkbox2${el}`} value={el} />
                            <label htmlFor={`chkbox2${el}`}>{el}</label>
                        </div>
                    ))}

                    <button
                        className="btn btn-primary position-absolute"
                        style={{ top: "490px", right: "265px", width: "145px" }}
                        onClick={handleSubmit}
                    >
                        NEXT
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Doctor