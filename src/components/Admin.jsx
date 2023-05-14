import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import AdminMain from "./AdminMain";
import axios from "axios";
import UserAdd from "./UserAdd";

const Admin = () => {

  let adminItem = []
  let registerItem = []
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(null)
  const [adminPath, setAdminPath] = useState('')
  const [doctorItem, setDoctorItem] = useState([])

  const handleSidebar = (e) => {
    const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li");
    allSideMenu.forEach((item) => {
      item.classList.remove("active");
    });
    e.target.parentElement.classList.add("active");
    e.target.parentElement.parentElement.classList.add("active");

    if(e.target.textContent === 'Dashboard') setAdminPath('')
    if(e.target.textContent === 'Add User') setAdminPath('Add User')
    if(e.target.textContent === 'Add Items') setAdminPath('Add Items')
  };

  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate('/')
  };

  const getDoctors = () => {
    axios(`${process.env.REACT_APP_API_URL}/admin/get_doctors`,
      { headers: { token: sessionStorage.getItem("token") } }
    ).then((res) => setDoctorItem(res.data))
      .catch((err) => console.log(err));
  };

  const getUsers = () => {
    adminItem = []
    registerItem = []
    axios(`${process.env.REACT_APP_API_URL}/admin/get/users`,
      { headers: { token: sessionStorage.getItem("token") } }
    ).then((res) => {
      console.log(res.data)
      setUsers(res.data)
      res.data?.forEach(el => {
        if(el.role === 'admin') { adminItem.push(el) }
        if(el.role === 'register') registerItem.push(el)
      })
    }).catch((err) => console.log(err));
  };

  useEffect(async()=>{
    setLoading(true)
    await getUsers()
    await getDoctors()
    setLoading(false)
  }, [])

  return (
    <div>
      {/* <!-- SIDEBAR --> */}
      <section id="sidebar" style={{ background: "red", color: "green" }}>
        <a href="#" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">AdminHub</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="#" onClick={(e) => handleSidebar(e)}>
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => handleSidebar(e)}>
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Add User</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => handleSidebar(e)}>
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Add Items</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#" onClick={(e) => handleSidebar(e)}>
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleLogout()} className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
      {/* <!-- SIDEBAR --> */}


      <section id="content">

        <nav>
          <i className="bx bx-menu"></i>
          <a href="#" className="nav-link">
            Categories
          </a>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn">
                <i className="bx bx-search"></i>
              </button>
            </div>
          </form>
          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode"></label>
        </nav>
        {
          adminPath === '' ? <AdminMain doc={doctorItem} adm={adminItem} reg={registerItem} users={users}/> :
          adminPath === 'Add User' ? <UserAdd/> :
          adminPath === 'Add Items' ? <p>Add Items</p> : ""
          
        }
      </section>

    </div>
  );
};

export default Admin;
