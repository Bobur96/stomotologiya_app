import React, { useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CircularProgress } from '@mui/material';
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
                item?.map((el, i) => (
                  <Accordion key={el.id} expanded={expanded === `panel${i+1}`} onChange={handleChanges(`panel${i+1}`)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>{el.date_of_treatment}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>descriptions{el.description}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Attached ID : {el.attached_id}</Typography>
                      <Typography>Created By : {el.created_by}</Typography>
                      <Typography>Narxi : {el.price}</Typography>
                      <Typography>Description : {el.description}</Typography>
                      <Typography>Doctor Description: {el.doctor_description}</Typography>
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