import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inpt = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const inpt2 = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

const Doctor = () => {
  const queryAll = document.querySelectorAll.bind(document);
  const query = document.querySelector.bind(document);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const closeRef = useRef();
  const closeRef2 = useRef();
  const [doc, setDoc] = useState("");

  const [patient, setPatient] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [details, setDetails] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [historyDay, setHistoryDay] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const response = async () => {
      setLoading(true);
      await getPatiens();
      await getDetails();
      await getTreatments();
      setLoading(false);
    };
    response();
  }, []);

  const handleSubmit = async () => {
    let patientAnswer = "";
    let tablee = "";
    const toothAnswer = [];
    const deteilAnswer = [];
    queryAll(".patient input").forEach((el) => {
      if (el.checked) patientAnswer = el.value;
    });
    queryAll(".tooth input").forEach((el) => {
      if (el.checked) toothAnswer.push(el.value);
    });
    queryAll(".details_inp").forEach((el) => {
      if (el.checked) deteilAnswer.push(el.value);
    });
  };

  const getPatiens = () => {
    axios(`${process.env.REACT_APP_API_URL}/doctor/get_patients`, {
      headers: { token: sessionStorage.getItem("token") },
    })
      .then((res) => {
        console.log(res.data);
        setPatient(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getDetails = (tableName) => {
    axios(
      `${process.env.REACT_APP_API_URL}/doctor/get_obj?table_name=${tableName}`,
      {
        headers: { token: sessionStorage.getItem("token") },
      }
    )
      .then((res) => {
        console.log(res.data);
        setDetails(
          res.data.map((item) => ({ name: item.name, body: item.price }))
        );
      })
      .catch((err) => console.log(err));
  };
  const getTreatments = () => {
    axios(
      `${process.env.REACT_APP_API_URL}/doctor/get_obj?table_name=Treatments`,
      {
        headers: { token: sessionStorage.getItem("token") },
      }
    )
      .then((res) => {
        console.log(res.data);
        setTreatments(
          res.data.map((item) => ({ name: item.name, body: item.price }))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (id) => {
    console.log(id)
    axios(`${process.env.REACT_APP_API_URL}/doctor/get_treatment_day?patient_id=${id}`,
      { headers: { token: sessionStorage.getItem("token") } }
    ).then(res => {
      setHistoryDay(res.data[0])
      console.log(res.data[0])
    }).catch(err => setHistoryDay([]))
  }

  return (
    <div className="register">
      <ToastContainer autoClose={2000} />
      <div className="row">
        <div className="col-3 list_cont">
          <h4 className="text-center my-4">Mijozlar ro'yhati</h4>
          {loading ? (
            <p>loading...</p>
          ) : (
            <>
              
              {patient.map((item, i) => (
                <span className="list__item patient" key={i}>
                  <input
                    type="radio"
                    name="patient"
                    id={`${item.id}`}
                    value={item.id}
                    onChange={(e)=> handleChange(item.id)}
                  />
                  <label htmlFor={`${item.id}`}>
                    {item.first_name + "  " + item.last_name}
                  </label>
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
              ))}
            </>
          )}
        </div>
        <div className="col-9 row reg_content">
          <div
            className="col-8 reg_center tooth"
            style={{ background: "#8BB6B3" }}
          >
            {
              historyDay.length !== 0 &&
              <>
                <img src="tooth.png" alt="" width={600} height={400} />
                {inpt.map((el, idx) => (
                  historyDay?.tooth_id.map(id => (
                    <div className={`input b${idx + 1} d-grid`} key={idx}>
                      <label htmlFor={`chkbox${el}`}>{el}</label>
                      <input type="checkbox" id={`chkbox${el}`} checked={id == el} value={el} />
                    </div>
                  ))
                ))}
                {inpt2.map((el, idx) => (
                  historyDay?.tooth_id.map(id => (
                    <div className={`input bc c${idx + 1} d-grid`} key={idx}>
                      <input type="checkbox" id={`chkbox2${el}`} checked={id == el} value={el} />
                      <label htmlFor={`chkbox2${el}`}>{el}</label>
                    </div>
                  ))
                ))}
              </>
            }
            

            <button
              className="btn btn-primary position-absolute"
              style={{ top: "490px", right: "265px", width: "145px" }}
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>
          <div className="col-4 reg_info">
            <FormGroup>
              <h4 className="text-center my-4">Informatsiya</h4>
              <div className="check__group py-2 ms-2 d-grid">
                <div
                  class="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                        onClick={() => getDetails("DentalComplaints")}
                      >
                        DentalComplaints
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        {details.map((details) => (
                          <div className="list__item">
                            <input
                              type="checkbox"
                              className="details_inp"
                              value={details.id}
                            />
                            <label>{details.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                        onClick={() => getDetails("CleaningAgents")}
                      >
                        CleaningAgents
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingTwo"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        {details.map((details) => (
                          <div className="list__item">
                            <input
                              type="checkbox"
                              className="details_inp"
                              value={details.id}
                            />
                            <label>{details.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                        onClick={() => getDetails("Fillings")}
                      >
                        Fillings
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingThree"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        {details.map((details) => (
                          <div className="list__item">
                            <input
                              type="checkbox"
                              className="details_inp"
                              value={details.id}
                            />
                            <label>{details.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-heading4">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapse4"
                        aria-expanded="false"
                        aria-controls="flush-collapse4"
                        onClick={() => getDetails("Extractions")}
                      >
                        Extractions
                      </button>
                    </h2>
                    <div
                      id="flush-collapse4"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-heading4"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        {details.map((details) => (
                          <div className="list__item">
                            <input
                              type="checkbox"
                              className="details_inp"
                              value={details.id}
                            />
                            <label>{details.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FormGroup>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Doctor;
