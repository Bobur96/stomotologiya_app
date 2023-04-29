import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inpt = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const inpt2 = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

const Register = () => {

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
      await getDoctors()
      await getDetails()
      setLoading(false)
    }
    response()
  }, [])

  const handleSubmit = () => {
    document.querySelectorAll('input').forEach(el => {
      el.checked = false;
    })
    setDoc('')
    toast.success('Successfully added!')
  }

  const getPatiens = () => {
    axios(`${process.env.REACT_APP_API_URL}/register/get_patients`, {
      headers: { token: sessionStorage.getItem('token') }
    }).then(res => {console.log(res.data); setPatient(res.data)})
    .catch( err => console.log(err))
  }

  const getDoctors = () => {
    axios(`${process.env.REACT_APP_API_URL}/register/get_doctors`, {
      headers: { token: sessionStorage.getItem('token') }
    }).then(res => {console.log(res.data); setDoctors(res.data)})
    .catch( err => console.log(err))
  }

  const getDetails = () => {
    axios(`${process.env.REACT_APP_API_URL}/register/get_dentalComplaints`, {
      headers: { token: sessionStorage.getItem('token') }
    }).then(res => {console.log(res.data); setDetails(res.data)})
    .catch( err => console.log(err))
  }

  const handleSave = () => {
    closeRef.current.click();
    document.querySelectorAll("input").forEach((el) => (el.checked = false));
  };

  const handleSaveCart = () => {
    if(doc2 !== '' && patient2 !== '') {
        fetch(`${process.env.REACT_APP_API_URL}/register/create_treatmentteeth?patient_id=${patient2}&attached_id=${doc2}`,{
          method: "POST",
          headers: { token: sessionStorage.getItem('token') }
        }).then(res => {
          toast.success('Succesfull added!'); 
          closeRef2.current.click();
          setPatient2(''); setDoc2('')
        })
        .catch( err => toast.error('Ann error occured!'))
    }
    else {
      toast.error('All field required!')
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="register">
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
                    <input type="checkbox" id={`${item.id}`} value={item.id} />
                    <label htmlFor={`${item.id}`}>{item.first_name+'  '+item.last_name}</label>
                    <div className="menu__btn">
                      <IconButton aria-haspopup="true" onClick={handleClick}>
                        <MoreVertIcon />
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
        <div className="col-9 row reg_content">
          <div className="col-8 reg_center" style={{ background: "#8BB6B3" }}>
            <button className="btn btn-primary position-absolute"
              style={{ top: "20px", left: "25px" }}
              data-bs-target="#exampleModal2" 
              data-bs-toggle="modal"
            >
              Create Cart
            </button>
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
          <div className="col-4 reg_info">
              <FormGroup>
                <h4 className="text-center my-4">Informatsiya</h4>
                <TextField select label="Select Doctor"
                  value={doc} onChange={(e)=>setDoc(e.target.value)}>
                  { doctors.map((el, id) => (
                      <MenuItem key={id} value={el.id}>{el.first_name +"  "+el.last_name}</MenuItem>
                  ))}
                </TextField>
                <div className="check__group py-2 ms-2 d-grid">
                  {
                    details.map((item, i) => (
                      <FormControlLabel key={i} control={<Checkbox />} label={item} />
                    ))
                  }
                </div>
              </FormGroup>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Patient
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-0">
              <form action="" className="w-100 py-4 px-3">
                <div className="info_item">
                  <label htmlFor="name1">First name</label>
                  <input type="text" id="name1" />
                </div>
                <div className="info_item">
                  <label htmlFor="name2">Last name</label>
                  <input type="text" id="name2" />
                </div>
                <div className="info_item">
                  <label htmlFor="name3">Phone</label>
                  <input type="text" id="name3" />
                </div>
                <div className="info_item">
                  <label htmlFor="name4">Address</label>
                  <input type="text" id="name4" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                ref={closeRef}
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>


      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModal2Label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModal2Label">
                Create Cart
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-0">
              <form action="" className="d-grid p-4">
                <TextField select label="Select Patient" className="mb-3"
                  value={patient2} onChange={(e)=>setPatient2(e.target.value)}>
                  { patient.map((el, id) => (
                      <MenuItem key={id} value={el.id}>{el.first_name +"  "+el.last_name}</MenuItem>
                  ))}
                </TextField>
                <TextField select label="Select Doctor"
                    value={doc2} onChange={(e)=>setDoc2(e.target.value)}>
                    { doctors.map((el, id) => (
                        <MenuItem key={id} value={el.id}>{el.first_name +"  "+el.last_name}</MenuItem>
                    ))}
                </TextField>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                ref={closeRef2}
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSaveCart}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;
