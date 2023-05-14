import { Button, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UserAdd = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const Submit = (data) => {
    setLoading(true);
    fetch("https://tts-cms-apis.herokuapp.com/send-email", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        toast.success("Successfully sended!");
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
      <form
        onSubmit={handleSubmit(Submit)}
        className="container py-2 example row g-3"
      >
        <Grid className="modal-header py-2 px-0">
          <h4>Add User</h4>
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
              <input
                type="text"
                placeholder="First Name"
                className={
                  errors.first_name ? "is-invalid form-control" : "form-control"
                }
                {...register("first_name", {
                  required: true,
                  pattern: /^[A-Za-z' ]*$/,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="text"
                placeholder="Last name"
                className={
                  errors.last_name ? "is-invalid form-control" : "form-control"
                }
                {...register("last_name", {
                  required: true,
                  pattern: /^[A-Za-z' ]*$/,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <select
                className={ errors.role ? "is-invalid form-select" : "form-select" }
                {...register("role", { required: true })}
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="register">Register</option>
              </select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="text"
                placeholder="User name"
                className={
                  errors.username ? "is-invalid form-control" : "form-control"
                }
                {...register("username", {
                  required: true,
                  pattern: /^[A-Za-z' ]*$/,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="text"
                placeholder="Password"
                className={
                  errors.password ? "is-invalid form-control" : "form-control"
                }
                {...register("password", {
                  required: true,
                  pattern: /^[A-Za-z' ]*$/,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="text"
                placeholder="Address"
                className={
                  errors.address ? "is-invalid form-control" : "form-control"
                }
                {...register("address", {
                  required: true,
                  pattern: /^[A-Za-z' ]*$/,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="text"
                placeholder="Phone number"
                className={
                  errors.phone_number
                    ? "is-invalid form-control"
                    : "form-control"
                }
                {...register("phone_number", {
                  required: true,
                  pattern: /^[A-Za-z0-9'+ ]*$/,
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

export default UserAdd;
