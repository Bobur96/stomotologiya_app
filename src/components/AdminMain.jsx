import React from "react";

const AdminMain = ({doc, adm, reg, users}) => {

  console.log(adm)
  
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Home
              </a>
            </li>
          </ul>
        </div>
        {/* <a href="#" className="btn-download">
              <i className="bx bxs-cloud-download"></i>
              <span className="text">Download PDF</span>
            </a> */}
      </div>

      <ul className="box-info">
        <li>
          <i className="bx bxs-calendar-check"></i>
          <span className="text">
            <h3>{adm.length}</h3>
            <p>Admins</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-group"></i>
          <span className="text">
            <h3>{doc.length}</h3>
            <p>Doctors</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-dollar-circle"></i>
          <span className="text">
            <h3>{reg.length}</h3>
            <p>Registers</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Recent Orders</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Created date</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map(el =>(
                  <tr key={el.id}>
                    <td>
                      <img src="img/people.png" />
                      <p>{el.first_name +" "+ el.last_name}</p>
                    </td>
                    <td>{el.created_date?.slice(0,10)}</td>
                    <td>
                      <span className="status completed">{el.role}</span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        {/* <div className="todo">
          <div className="head">
            <h3>Todos</h3>
            <i className="bx bx-plus"></i>
            <i className="bx bx-filter"></i>
          </div>
          <ul className="todo-list">
            <li className="completed">
              <p>Todo List</p>
              <i className="bx bx-dots-vertical-rounded"></i>
            </li>
            <li className="completed">
              <p>Todo List</p>
              <i className="bx bx-dots-vertical-rounded"></i>
            </li>
            <li className="not-completed">
              <p>Todo List</p>
              <i className="bx bx-dots-vertical-rounded"></i>
            </li>
            <li className="completed">
              <p>Todo List</p>
              <i className="bx bx-dots-vertical-rounded"></i>
            </li>
            <li className="not-completed">
              <p>Todo List</p>
              <i className="bx bx-dots-vertical-rounded"></i>
            </li>
          </ul>
        </div> */}
      </div>
    </main>
  );
};

export default AdminMain;
