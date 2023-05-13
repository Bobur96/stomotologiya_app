import React, { useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CircularProgress } from '@mui/material';
import { Empty } from 'antd';
import axios from 'axios';

const ViewCart = ({ title, id }) => {
  const [item, setItem] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  useEffect(()=> {
    getCartItem()
  }, [id])

  const getCartItem = () => {
    setLoading(true)
    axios(`${process.env.REACT_APP_API_URL}/doctor/get_treatment?patient_id=${id}`,
      { headers: { token: sessionStorage.getItem("token") }}
    ).then((res) => {
      setItem(res.data)
      setLoading(false)
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    });
  };

  const handleChanges = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{title}ning Kartasi</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {
                loading ? <div className='text-center py-4'><CircularProgress/></div> :
                item.length === 0 ? <Empty /> :
                item?.map((el, i) => (
                  <Accordion key={el.id} expanded={expanded === `panel${i+1}`} onChange={handleChanges(`panel${i+1}`)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>{el.treatmentteeth.date_of_treatment}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>descriptions{el.treatmentteeth.description}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='karta_info'>
                      <Typography><span>Attached ID:</span> {el.treatmentteeth.attached_id}</Typography>
                      <Typography><span>Tishlar:</span> {el.treatment_history.tooth_id.map(id => id +", ")}</Typography>
                      <Typography><span>Kasallik:</span> {el.treatment_history.complaint_id.map(el => el.name+"  "+el.price+" so'm")}</Typography>
                      <Typography><span>Treatments:</span> {el.treatment_history.treatment_id.map(el => el.name+"  "+el.price+" so'm")}</Typography>
                      <Typography><span>Fillings:</span> {el.treatment_history.filling_id.map(el => el.name+"  "+el.price+" so'm")}</Typography>
                      <Typography><span>Tozalovchi vozisatalar:</span> {el.treatment_history.cleaning_agent_id.map(el => el.name+"  "+el.price+" so'm")}</Typography>
                      <Typography><span>Extractions:</span> {el.treatment_history.extraction_id.map(el => el.name+"  "+el.price+" so'm")}</Typography>
                      <Typography><span>Narxi:</span> {el.treatmentteeth.price}</Typography>
                      {el.treatmentteeth.description && <Typography>Description : {el.treatmentteeth.description}</Typography>}
                      {el.treatmentteeth.doctor_description && <Typography>Doctor Description : {el.treatmentteeth.doctor_description}</Typography>}
                    </AccordionDetails>
                  </Accordion>
                ))
              }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ViewCart;