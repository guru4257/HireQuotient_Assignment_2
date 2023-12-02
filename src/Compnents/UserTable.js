import React, { useEffect, useState } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import "../Compnents/UserTable.css";
const UserTable = (props) => {
  const { showData, getDeleteDataFromTable, deleteOneUser, EditData, totalRows } = props;

  const [markedData, setMarkedData] = useState([]);
  const [allSelect, setAllselect] = useState(false);
  const [editableId, setEditableId] = useState(null);

  const[editData,setEditData] = useState({
    name :'',
    email:'',
    role:''
  })

  useEffect(() => {
    getDeleteDataFromTable(markedData);
  }, [markedData]);

  useEffect(()=>{
    setAllselect(false);
    setMarkedData([]);
  },[showData]);

  const addToMarkedList = (dataId) => {
    const selected = markedData.includes(dataId);
    if (selected) {
      setMarkedData(markedData.filter((ele) => ele !== dataId));
    } else {
      setMarkedData([...markedData, dataId]);
    }
  };

  const selectAlldata = () => {
    if (allSelect) {
      setMarkedData([]);
    } else {
      const newData = showData.map((ele) => ele.id);
      setMarkedData(newData);
    }

    setAllselect(!allSelect);
  };
 const getEditData = (data)=>{
        
      editData.name = data.name;
      editData.email = data.email;
      editData.role = data.role;
      setEditData(editData);
 }

 const changeToNormal = ()=>{
      setEditableId(null);
 }

  const onHandleChange = (event)=>{
    
      const{name,value} = event.target;
      setEditData({...editData,[name]:value});
  }

  const onHandleSubmit = (id)=>{
       
    EditData(id,editData,changeToNormal);
    setEditData({
      name :'',
      email :'',
      role:''
    })
  }

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allSelect}
                onChange={selectAlldata}
              ></input>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {showData.map((data, i) => {
            return (
              <tr key={data.id}>
                <td style={{backgroundColor:markedData.includes(data.id)?'gray':''}}>
                  <input
                    type="checkbox"
                    checked={markedData.includes(data.id)}
                    onChange={() => addToMarkedList(data.id)}
                  ></input>
                </td>
                <td style={{backgroundColor:markedData.includes(data.id)?'gray':''}}>
                  {editableId === data.id ? (
          
                    <input type="text" name="name"  value={data.name} onChange={(e)=>{onHandleChange(e);
                       
                       data.name = e.target.value;
                     }} disabled={false}></input>
                  ) : (
                    data.name
                  )}
                </td>
                <td style={{backgroundColor:markedData.includes(data.id)?'gray':''}}>
                  {editableId === data.id ? (
                    <input type="text" name="email" value={data.email}  onChange={(e)=>{onHandleChange(e);
                    data.email = e.target.value;
                  }}></input>
                  ) : (
                    data.email
                  )}
                </td>
                <td style={{backgroundColor:markedData.includes(data.id)?'gray':''}}>
                  {editableId === data.id ? (
                    <input type="text" name="role" value={data.role} onChange={(e)=>{onHandleChange(e);
                  data.role = e.target.value;
                }}></input>
                  ) : (
                    data.role
                  )}
                </td>
                <td style={{backgroundColor:markedData.includes(data.id)?'gray':''}}>
                  {editableId === data.id ? (
                    <>
                      <button className="save" onClick={()=>onHandleSubmit(data.id)}>Save</button>
                      <button className="cancel" onClick={()=>setEditableId(null)}><MdCancel /></button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit"
                        onClick={() => {setEditableId(data.id);
                        getEditData(data)}}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteOneUser(data.id)}
                      >
                        <RiDeleteBin7Line />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <span>{markedData.length} of {totalRows} row(s) selected</span>
    </>
  );
};

export default UserTable;
