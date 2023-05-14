import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import FormGroup from "@mui/material/FormGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewCart from "./ViewCart";

import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const inpt = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const inpt2 = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

const Doctor = () => {
  const [expanded, setExpanded] = React.useState(false);
  const queryAll = document.querySelectorAll.bind(document);
  const query = document.querySelector.bind(document);

  const closeRef = useRef();
  const closeRef2 = useRef();

  const [edit, setEdit] = useState(false);
  const [patient, setPatient] = useState([]);
  const [modalID, setModalID] = useState(null);
  const [cleaning, setCleaning] = useState([]);
  const [fillings, setFillings] = useState([]);
  const [treatment, setTreatment] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [dComplains, setDComplains] = useState([]);
  const [historyId, setHistoryId] = useState(null);
  const [modalTittle, setModalTittle] = useState([]);
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

  const handleChanges = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubmit = async () => {
    console.log("submit");
    const toothAnswer = [];
    const deteilAnswer = [];
    const fillingAnswer = [];
    const cleaningAnswer = [];
    const treatmentAnswer = [];
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
    queryAll(".treatment").forEach((el) => {
      if (el.checked) {
        console.log(el.value)
        treatmentAnswer.push(el.value);
      }
    });

    const body = {
      tooth_id: toothAnswer,
      complaint_id: deteilAnswer,
      treatment_id: treatmentAnswer,
      filling_id: fillingAnswer,
      cleaning_agent_id: cleaningAnswer,
      extraction_id: extractionAnswer,
    };

    const create_body = {
      treatmentteeth: treatmentteeth,
      tooth_id: toothAnswer,
      complaint_id: deteilAnswer,
    };

    const prices = {
      treatmentteeth_id: treatmentteeth,
      price: query('#total_price').value,
      doctor_description: query('#description').value
    }

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
      await axios.post(`${process.env.REACT_APP_API_URL}/doctor/create_history`,
          create_body,
          { headers: { token: sessionStorage.getItem("token") }}
        ).then((res) => {
          toast.success("Succesfully saved!");
          queryAll("input").forEach((el) => (el.checked = false));
        }).catch((err) => toast.error("Ann error occured!"));
    }
    
    await axios.put(`${process.env.REACT_APP_API_URL}/doctor/update_price`, prices , { 
      headers: { token: sessionStorage.getItem("token") }}
    ).then((res) => { 
      query('#total_price').value = '';
      query('#description').value = '';
      query('#file').value = '';
    })
    .catch((err) => toast.error("Ann error occured!"));
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
        res.data[0][0].treatment_id?.forEach((el) => {
          query(`.inp_tr${el}`).checked = true;
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

  const handleCard = (id, title) => {
    setModalID(id)
    setModalTittle(title)
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
                    onChange={(e) => handleChange(item.id)}
                  />
                  <label htmlFor={`${item.id}`}>
                    {item.first_name + "  " + item.last_name}
                  </label>
                  <div className="menu__btn">
                    <span data-bs-toggle="modal" data-bs-target="#exampleModal"
                      onClick={(e)=>handleCard(item.id, item.first_name+" "+item.last_name)} className="btn_cart"
                    >view cart</span>
                  </div>
                </span>
              ))}
            </>
          )}
        </div>

        <div className="col-9 row reg_content">
            <div className="col-8 reg_center tooth" style={{ background: "#8BB6B3" }}>
              {
                errorMsg ? 
                <div className="error">Bu bemor uchun bugungi karta mavjud emas!</div> :
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
              <h4 className="text-center my-2">Informatsiya</h4>
              <div className="check__group py-2 ms-2 d-grid">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                  <Accordion expanded={expanded === `panel1`} onChange={handleChanges(`panel1`)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                      <Typography sx={{ width: '83%', flexShrink: 0 }}>Dental Complaints</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {dComplains.map((itm) => (
                        <div className="list__item d-flex align-items-center" key={itm.id}>
                          <input type="checkbox" value={itm.id}
                            className={`details_inp complain inp_c${itm.id}`}
                          />
                          <div className="w-100 d-flex justify-content-between align-items-center">
                            <label>{itm.name}</label>
                            <span>{itm.price} so'm</span>
                          </div>
                        </div>
                      ))}
                    </AccordionDetails>
                  </Accordion>

                  <Accordion expanded={expanded === `panel2`} onChange={handleChanges(`panel2`)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                      <Typography sx={{ width: '83%', flexShrink: 0 }}>Cleaning Agents</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {cleaning.map((itm) => (
                        <div className="list__item d-flex align-items-center" key={itm.id}>
                          <input type="checkbox" value={itm.id} className={`details_inp cleaning inp_cl${itm.id}`}/>
                          <div className="w-100 d-flex justify-content-between align-items-center">
                            <label>{itm.name}</label>
                            <span>{itm.price} so'm</span>
                          </div>
                        </div>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                 
                  <Accordion expanded={expanded === `panel3`} onChange={handleChanges(`panel3`)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                      <Typography sx={{ width: '83%', flexShrink: 0 }}>Fillings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {fillings.map((itm) => (
                        <div className="list__item d-flex align-items-center" key={itm.id}>
                          <input type="checkbox" value={itm.id} className={`details_inp filling inp_f${itm.id}`}/>
                          <div className="w-100 d-flex justify-content-between align-items-center">
                            <label>{itm.name}</label>
                            <span>{itm.price} so'm</span>
                          </div>
                        </div>
                      ))}
                    </AccordionDetails>
                  </Accordion>

                  <Accordion expanded={expanded === `panel4`} onChange={handleChanges(`panel4`)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                      <Typography sx={{ width: '83%', flexShrink: 0 }}>Extractions</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {extractions.map((itm) => (
                        <div className="list__item d-flex align-items-center" key={itm.id}>
                          <input type="checkbox" value={itm.id} className={`details_inp extraction inp_ex${itm.id}`}/>
                          <div className="w-100 d-flex justify-content-between align-items-center">
                            <label>{itm.name}</label>
                            <span>{itm.price} so'm</span>
                          </div>
                        </div>
                      ))}
                    </AccordionDetails>
                  </Accordion>

                  <Accordion expanded={expanded === `panel5`} onChange={handleChanges(`panel5`)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5bh-content" id="panel5bh-header">
                      <Typography sx={{ width: '83%', flexShrink: 0 }}>Treatments</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {treatment?.map((itm) => (
                        <div className="list__item d-flex align-items-center" key={itm.id}>
                          <input type="checkbox" value={itm.id} className={`details_inp treatment inp_tr${itm.id}`}/>
                          <div className="w-100 d-flex justify-content-between align-items-center">
                            <label>{itm.name}</label>
                            <span>{itm.price} so'm</span>
                          </div>
                        </div>
                      ))}
                    </AccordionDetails>
                  </Accordion>

                  <input type="file" className="form-control my-3" multiple id="file"/>
                  <textarea placeholder="Qayd yozish uchun" class="form-control" id="description" rows="2"></textarea>
                  <div className="d-flex justify-content-between mt-3">
                    <label for="total_price">Total price</label>
                    <input type="text" style={{height: "30px", width: "200px"}} id="total_price" className="form-control" placeholder="100 000" />
                  </div>
                </div>
              </div>
            </FormGroup>
          </div>
        </div>
      </div>

      <ViewCart title={modalTittle} id={modalID}/>

    </div>
  );
};

export default Doctor;
