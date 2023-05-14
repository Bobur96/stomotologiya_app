import { Button, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const CreateItems = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const Submit = (data) => {
    setLoading(true); 
    axios.post(`${process.env.REACT_APP_API_URL}/admin/create_obj`, data, { 
      headers: { token: sessionStorage.getItem("token") } }
    ).then((res) => {
        toast.success("Successfully created!");
        setLoading(false);
        reset();
      })
      .catch((error) => {
        toast.error("An Error occurred!");
        setLoading(false);
      });
  };

  return (
    <div className="container px-5">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(Submit)}
        className="container py-2 example row g-3"
      >
        <Grid className="modal-header py-2 px-0">
          <h4>Create Items</h4>
        </Grid>
        <Grid container direction="column" spacing={2}>
          <Grid
            item
            container
            spacing={3}
            xs={12}
            sm="auto"
            className="pt-4 mt-0"
          >
             <Grid item xs={12} sm={6}>
              <select
                className={ errors.table_name ? "is-invalid form-select" : "form-select" }
                {...register("table_name", { required: true })}
              >
                <option value="">Select Table Name</option>
                <option value="Fillings">Fillings</option>
                <option value="Treatments">Treatments</option>
                <option value="Extractions">Extractions</option>
                <option value="CleaningAgents">CleaningAgents</option>
                <option value="DentalComplaints">DentalComplaints</option>
              </select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="text"
                placeholder="Name"
                className={
                  errors.name ? "is-invalid form-control" : "form-control"
                }
                {...register("name", {
                  required: true,
                  pattern: /^[A-Za-z0-9' ]*$/,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="text"
                placeholder="Price"
                className={
                  errors.price ? "is-invalid form-control" : "form-control"
                }
                {...register("price", {
                  required: true,
                  pattern: /^[A-Za-z0-9' ]*$/,
                })}
              />
            </Grid>

            <Grid className="modal-footer mt-4 pt-3" item xs={12} sm={12}>
              <Button
                className="float-end"
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
                startIcon={loading && <CircularProgress size="0.9rem" />}
              >
                {loading ? "Saving" : "Save"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateItems;
