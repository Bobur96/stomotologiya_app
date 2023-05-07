import React, { useEffect, useRef, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormGroup from "@mui/material/FormGroup";
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

  const [edit, setEdit] = useState(false);
  const [patient, setPatient] = useState([]);
  const [cleaning, setCleaning] = useState([]);
  const [fillings, setFillings] = useState([]);
  const [treatment, setTreatment] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [dComplains, setDComplains] = useState([]);
  const [historyId, setHistoryId] = useState(null);
  const [extractions, setExtractions] = useState([]);
  const [treatmentAns, setTreatmentAns] = useState([]);
  const [treatmentteeth, setTreatmentteeth] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const response = async () => {
      setLoading(true);
      await getPatiens();
      await getCleaning();
      await getDentalComplaints();
      await getExtractions();
      await getFillings();
      await getTreatments();
      setLoading(false);
    };
    response();
  }, []);

  const handleSubmit = async () => {
    console.log("submit");
    const toothAnswer = [];
    const deteilAnswer = [];
    const fillingAnswer = [];
    const cleaningAnswer = [];
    const extractionAnswer = [];

    queryAll(".tooth input").forEach((el) => {
      if (el.checked) toothAnswer.push(el.value);
    });
    queryAll(".complain").forEach((el) => {
      if (el.checked) deteilAnswer.push(el.value);
    });
    queryAll(".filling").forEach((el) => {
      if (el.checked) fillingAnswer.push(el.value);
    });
    queryAll(".cleaning").forEach((el) => {
      if (el.checked) cleaningAnswer.push(el.value);
    });
    queryAll(".extraction").forEach((el) => {
      if (el.checked) extractionAnswer.push(el.value);
    });

    const body = {
      tooth_id: toothAnswer,
      complaint_id: deteilAnswer,
      treatment_id: treatment,
      filling_id: fillingAnswer,
      cleaning_agent_id: cleaningAnswer,
      extraction_id: extractionAnswer,
    };

    const create_body = {
      treatmentteeth: treatmentteeth,
      tooth_id: toothAnswer,
      complaint_id: deteilAnswer,
    };

    if (historyId) {
      console.log(body)
      await axios.put(`${process.env.REACT_APP_API_URL}/doctor/update_history?treatmentteeth_id=${treatmentteeth}`,
          body, { headers: { token: sessionStorage.getItem("token") }}
        ).then((res) => {
          toast.success("Succesfully saved!");
          queryAll("input").forEach((el) => (el.checked = false));
        })
        .catch((err) => toast.error("Ann error occured!"));
    } else {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/doctor/create_history`,
          create_body,
          {
            headers: { token: sessionStorage.getItem("token") },
          }
        )
        .then((res) => {
          toast.success("Succesfully saved!");
          queryAll("input").forEach((el) => (el.checked = false));
        })
        .catch((err) => toast.error("Ann error occured!"));
    }
  };

  const getPatiens = () => {
    axios(`${process.env.REACT_APP_API_URL}/doctor/get_patients`, {
      headers: { token: sessionStorage.getItem("token") },
    })
      .then((res) => setPatient(res.data))
      .catch((err) => console.log(err));
  };

  const getCleaning = () => {
    axios(
      `${process.env.REACT_APP_API_URL}/doctor/get_obj?table_name=CleaningAgents`,
      {
        headers: { token: sessionStorage.getItem("token") },
      }
    )
      .then((res) => setCleaning(res.data))
      .catch((err) => console.log(err));
  };

  const getFillings = () => {
    axios(
      `${process.env.REACT_APP_API_URL}/doctor/get_obj?table_name=Fillings`,
      {
        headers: { token: sessionStorage.getItem("token") },
      }
    )
      .then((res) => setFillings(res.data))
      .catch((err) => console.log(err));
  };

  const getExtractions = () => {
    axios(
      `${process.env.REACT_APP_API_URL}/doctor/get_obj?table_name=Extractions`,
      {
        headers: { token: sessionStorage.getItem("token") },
      }
    )
      .then((res) => setExtractions(res.data))
      .catch((err) => console.log(err));
  };

  const getDentalComplaints = () => {
    axios(`${process.env.REACT_APP_API_URL}/doctor/get_obj?table_name=DentalComplaints`,
      { headers: { token: sessionStorage.getItem("token") } }
    ).then((res) => setDComplains(res.data))
      .catch((err) => console.log(err));
  };

  const getTreatments = () => {
    axios(`${process.env.REACT_APP_API_URL}/doctor/get_obj?table_name=Treatments`,
      { headers: { token: sessionStorage.getItem("token") } }
    ).then((res) => setTreatment(res.data))
      .catch((err) => console.log(err));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (id) => {
    setEdit(false);
    setHistoryId(null);
    setErrorMsg(false);
    setTreatmentAns(null);
    setTreatmentteeth(null);
    axios(
      `${process.env.REACT_APP_API_URL}/doctor/get_treatment_day?patient_id=${id}`,
      { headers: { token: sessionStorage.getItem("token") } }
    )
      .then((res) => {
        setEdit(true);
        console.log(res.data[0][0])
        setHistoryId(res.data[0][0].id);
        setTreatmentAns(res.data[0][0].treatment_id);
        setTreatmentteeth(res.data[0][0].treatmentteeth);
        queryAll(".reg_center input").forEach((el) => {
          el.disabled = false;
          el.checked = false;
        });
        queryAll(".details_inp").forEach((el) => {
          el.disabled = false;
          el.checked = false;
        });
        res.data[0][0].tooth_id?.forEach((el) => {
          query(`.inp${el}`).checked = true;
        });
        res.data[0][0].complaint_id?.forEach((el) => {
          query(`.inp_c${el}`).checked = true;
        });
        res.data[0][0].extraction_id?.forEach((el) => {
          query(`.inp_ex${el}`).checked = true;
        });
        res.data[0][0].filling_id?.forEach((el) => {
          query(`.inp_f${el}`).checked = true;
        });
        res.data[0][0].cleaning_agent_id?.forEach((el) => {
          query(`.inp_cl${el}`).checked = true;
        });
        queryAll("input").forEach((el) => {
          el.disabled = true;
        });
        queryAll('input[type="radio"]').forEach((el) => {
          el.disabled = false;
        });
      })
      .catch((err) => {
        setErrorMsg(true);
        setTreatmentteeth(null);
        queryAll(".reg_center input").forEach((el) => {
          el.disabled = false;
          el.checked = false;
        });
        queryAll(".details_inp").forEach((el) => {
          el.disabled = false;
          el.checked = false;
        });
      });
  };

  const handleEdit = () => {
    setEdit(false);
    queryAll("input").forEach((inp) => {
      inp.disabled = false;
    });
  };

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
                    onChange={(e) => handleChange(item.id)}
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
                errorMsg ? 
                <div className="error">An error occurred</div> :
                <>
                  <img src="tooth.png" alt="" width={600} height={400} />
                    {inpt.map((el, idx) => (
                      <div className={`input b${idx + 1} d-grid`} key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input
                          type="checkbox"
                          className={`inp${el}`}
                          id={el}
                          value={el}
                        />
                      </div>
                    ))}
                    {inpt2.map((el, idx) => (
                      <div className={`input bc c${idx + 1} d-grid`} key={el}>
                        <input
                          type="checkbox"
                          className={`inp${el}`}
                          id={el}
                          value={el}
                        />
                        <label htmlFor={el}>{el}</label>
                      </div>
                    ))}
                    {edit && (
                      <button
                        className="btn btn-secondary position-absolute"
                        style={{ top: "490px", right: "26px", width: "65px" }}
                        onClick={() => handleEdit()}
                      >
                        edit
                      </button>
                    )}
                    <button
                      className="btn btn-primary position-absolute"
                      style={{ top: "490px", right: "275px", width: "125px" }}
                      onClick={handleSubmit}
                    >
                      SUBMIT
                    </button> 
                </>
              }
            </div>

          <div className="col-4 reg_info">
            <FormGroup>
              <h4 className="text-center my-4">Informatsiya</h4>

              <div className="check__group py-2 ms-2 d-grid">
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        Dental Complaints
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        {dComplains.map((itm) => (
                          <div className="list__item" key={itm.id}>
                            <input
                              type="checkbox"
                              className={`details_inp complain inp_c${itm.id}`}
                              value={itm.id}
                            />
                            <label>{itm.name}</label>
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
                        {cleaning.map((itm) => (
                          <div className="list__item" key={itm.id}>
                            <input
                              type="checkbox"
                              className={`details_inp cleaning inp_cl${itm.id}`}
                              value={itm.id}
                            />
                            <label>{itm.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                      >
                        Fillings
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingThree"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        {fillings.map((itm) => (
                          <div className="list__item" key={itm.id}>
                            <input
                              type="checkbox"
                              className={`details_inp filling inp_f${itm.id}`}
                              value={itm.id}
                            />
                            <label>{itm.name}</label>
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
                        {extractions.map((itm) => (
                          <div className="list__item" key={itm.id}>
                            <input
                              type="checkbox"
                              className={`details_inp extraction inp_ex${itm.id}`}
                              value={itm.id}
                            />
                            <label>{itm.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-heading5">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapse5"
                        aria-expanded="false"
                        aria-controls="flush-collapse5"
                      >
                        Treatments
                      </button>
                    </h2>
                    <div
                      id="flush-collapse5"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-heading5"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        {treatment?.map((itm) => (
                          <div className="list__item" key={itm.id}>
                            <input
                              type="checkbox"
                              className={`details_inp tratment inp_ex${itm.id}`}
                              value={itm.id}
                            />
                            <label>{itm.name}</label>
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
