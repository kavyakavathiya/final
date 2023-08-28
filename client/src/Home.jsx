import React, { useEffect, useState, Fragment } from 'react';
import { ApiDeleteCall, ApiGetCall, ApiPostCall, ApiPutCall } from '../src/Connector';
import { Modal } from 'react-bootstrap';
import './common.css';

function Testing() {
  const [GridData, setGridData] = useState([]);
  const [addpartsPopup, setAddpartsPopup] = useState(false);
  const [FlagForAddUpdate, setFlagForAddUpdate] = useState(false);
  const [FormData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    city: '',
    age: '',
    id: ''
  });

  useEffect(() => {
    GetPartData();
    console.log(FormData);
  }, []);

  function GetPartData() {
    ApiGetCall("/api/displayDeetails").then((result) => {
      if (result === undefined || result === "") {
        alert("Something went wrong");
      } else {
        const responseRs = JSON.parse(result);
        console.log(responseRs);
        setGridData(responseRs);
      }
    });
  }

  function SaveUser() {
    var raw = JSON.stringify({
      name: FormData.name,
      email: FormData.email,
      contact: FormData.contact,
      city: FormData.city,
      age: FormData.age
    });
    ApiPostCall("/api/addDetails", raw).then((result) => {
      if (result === undefined || result === "") {
        alert("Something went wrong");
      } else {
        const responseRs = result;
        console.log(responseRs);
        setAddpartsPopup(false);
        if (responseRs.status === "success") {
          setTimeout(function () {
            window.location = "/";
            GetPartData();
          }, 1500);
        }
      }
    });
  }

  function GetDataById(id) {
    ApiGetCall("/api/selectOneUserDetails/" + id).then((result) => {
      if (result === undefined || result === "") {
        alert("Something went wrong");
      } else {
        const responseRs = JSON.parse(result);
        console.log(responseRs);
        setFormData({
          ...FormData,
          name: responseRs.name,
          city: responseRs.city,
          contact: responseRs.contact,
          email: responseRs.email,
          age: responseRs.age,
          id: responseRs.user_id
        });
      }
    });
  }

  function EditUser() {
    var raw = JSON.stringify({
      name: FormData.name,
      email: FormData.email,
      contact: FormData.contact,
      city: FormData.city,
      age: FormData.age
    });
    ApiPutCall(`/api/updateDetails/${FormData.id}`, raw).then((result) => {
      if (result === undefined || result === "") {
        alert("Something went wrong");
      } else {
        const responseRs = result;
        console.log(responseRs);
        setAddpartsPopup(false);
        if (responseRs.status === "success") {
          setTimeout(function () {
            window.location = "/";
            GetPartData();
          }, 1500);
        }
      }
    });
  }

  function DeleteCall(id) {
    ApiDeleteCall(`/api/deleteDetails/${id}`).then((result) => {
      if (result === undefined || result === "") {
        alert("Something went wrong");
      } else {
        const responseRs = result;
        console.log(responseRs);
        setAddpartsPopup(false);
        if (responseRs.status === "success") {
          setTimeout(function () {
            window.location = "/";
            GetPartData();
          }, 1500);
        }
      }
    });
  }

  return (
    <Fragment>
      <div className="d-flex justify-content-between pe-0 align-items-center" style={{ background: "black", padding: "0.5%" }}>
        <div>
          <h1 className="PageHeading" style={{ color: "white" }}>Manage Customers</h1>
        </div>
        <div className="text-center d-flex justify-content-end align-items-end"
          onClick={(e) => { setAddpartsPopup(true); setFlagForAddUpdate(1) }}>
          <label className="BorderBtn text-center">
            Add Customers
            <img src="/images/AddInventory.svg" className="img-fluid ps-2" />
          </label>
        </div>
      </div>
      <div style={{ height: "50px" }}></div>
      <div className="GridBox mt-1 p-3">
        <div className="col-12">
          <div className='col-12 greyBox mt-1 data-table-container'>
           
            <table className="table data-table mb-0">
              <thead className='GridHeader'>
                <tr>
                  <th scope="col" className='cursor-pointer fw-600 bg-dark text-light'>Name</th>
                  <th scope="col" className='cursor-pointer fw-600 bg-dark text-light'>Email</th>
                  <th scope="col" className='cursor-pointer fw-600 bg-dark text-light'>Contact</th>
                  <th scope="col" className='cursor-pointer fw-600 bg-dark text-light'>City</th>
                  <th scope="col" className='cursor-pointer fw-600 bg-dark text-light'>Age</th>
                  <th scope="col" className='cursor-pointer fw-600 bg-dark text-light'>Action</th>
                </tr>
              </thead>
              <tbody>
                {GridData.map((item, i) => {
                  var returData =
                    <tr key={i} className={`OddEvenClass tableBorderHide `} style={{ height: '30px' }}>
                      <td className='py-12'>{item.name}</td>
                      <td className='py-12'>{item.email}</td>
                      <td className='py-12'>{item.contact}</td>
                      <td className='py-12'>{item.city}</td>
                      <td className='py-12'>{item.age}</td>
                      <td className='py-12'>
                        <img
                          src="/images/EditIconNew.svg"
                          title="Edit"
                          className="img-fluid pe-2 cursor-pointer partsgetID"
                          onClick={(e) => { setAddpartsPopup(true); setFlagForAddUpdate(2); GetDataById(item.user_id) }}
                        />
                        <img
                          src="/images/DeleteIcon.svg"
                          title="Delete"
                          className="img-fluid cursor-pointer"
                          onClick={(e) => { DeleteCall(item.user_id) }}
                        />
                      </td>
                    </tr>;
                  return returData;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={addpartsPopup} size="l">
        <div className="pt-3 px-2">
          <div className="d-flex justify-content-between pe-0">
            <div>
              {FlagForAddUpdate === 1 ?
                <h5 className="fw-600">Add User</h5> :
                <h5 className="fw-600">Edit User</h5>
              }
            </div>
            <div className=" mb-2  text-center d-flex justify-content-end align-items-end">
              <img src="/images/CanclePartsIson.svg" style={{height:"20px"}} className="img-fluid ps-2" onClick={(e) => { setAddpartsPopup(false); }} />
            </div>
          </div>

          <img src="/images/HorizontalLine.svg" className="img-fluid w-100 my-2 postclass" />

          <div id="AddPartDiv" className='parent'>
            <div className="row pt-2">
              <div className="col-md-3 text-start">Name</div>
              <div className="col-md-9 ps-0">
                <input
                  type="text"
                  autoComplete="off"
                  name="partName"
                  className="form-control partNamee"
                  value={FormData.name}
                  onChange={(e) => { setFormData({ ...FormData, name: e.target.value }) }}
                />
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-md-3 text-start">Email</div>
              <div className="col-md-9 ps-0">
                <input
                  type="text"
                  autoComplete="off"
                  name="partName"
                  className="form-control partNamee"
                  value={FormData.email}
                  onChange={(e) => { setFormData({ ...FormData, email: e.target.value }) }}
                />
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-md-3 text-start">Contact</div>
              <div className="col-md-9 ps-0">
                <input
                  type="text"
                  autoComplete="off"
                  name="partName"
                  className="form-control partNamee"
                  value={FormData.contact}
                  onChange={(e) => { setFormData({ ...FormData, contact: e.target.value }) }}
                />
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-md-3 text-start">City</div>
              <div className="col-md-9 ps-0">
                <input
                  type="text"
                  autoComplete="off"
                  name="partName"
                  className="form-control partNamee"
                  value={FormData.city}
                  onChange={(e) => { setFormData({ ...FormData, city: e.target.value }) }}
                />
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-md-3 text-start">Age</div>
              <div className="col-md-9 ps-0">
                <input
                  type="text"
                  autoComplete="off"
                  name="partName"
                  className="form-control partNamee"
                  value={FormData.age}
                  onChange={(e) => { setFormData({ ...FormData, age: e.target.value }) }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 text-center py-4">
            {FlagForAddUpdate === 1 ?
              <button className="SaveBtn" onClick={(e) => SaveUser(e)}> Add User </button> :
              <button className="SaveBtn" onClick={(e) => EditUser(e)}> Update User </button>
            }
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default Testing;
