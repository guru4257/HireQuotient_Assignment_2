import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RiDeleteBin7Line } from "react-icons/ri";
import "../Pages/AdminPanel.css";
import UserTable from "../Compnents/UserTable";
import { fetchUserList } from "../Services/GetApiData";
import PaginationBar from "../Compnents/PaginationBar";


const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [showData, setShowData] = useState([]);
  const[pageLength,setPageLength] = useState(0);
  const[deleteData,setDeleteData] = useState([]);  
  const[searchValue,setSearchValue] = useState('');

  useEffect(() => {
    
    fetchUserList().then((res)=>{
         const val = res.data;
         setUsers(val);
         setPageLength(Math.ceil(val.length/10));
         const temp = val.slice(pageNo * 10 - 10, pageNo * 10);
         setShowData(temp);
    }).catch((err)=>{
      console.log(err);
    })
  }, []);

  useEffect(()=>{
      settingArrayCorrectly();
  },[users]);


 
  const changePageNo =(cp)=>{
       
       setPageNo(cp);
       const temp = users.slice(cp * 10 - 10, cp * 10);
       setShowData(temp);
  }
  
  const getDeleteDataFromTable = (data)=>{
        
        setDeleteData(data);
        
  }
  
  const settingArrayCorrectly = ()=>{

      setPageLength(Math.ceil(users.length/10));
      const temp = users.slice(pageNo * 10 - 10, pageNo * 10);
      setShowData(temp);
  }

  const deleteSelected = ()=>{
       
      const newData = users.filter((ele)=>!deleteData.includes(ele.id));
      setUsers(newData);
  }

  const deleteOneUser = (userId)=>{
       const newData = users.filter((ele)=> ele.id !== userId);
       setUsers(newData);
  }
  
  const EditData = (userId,data, fun)=>{
   
     const newData = users.map((ele)=>{
         return ele.id === userId ? {...ele,...data}:ele;
     })

     setUsers(newData);
     fun();
       
  }

  const OnHandleChange = (e)=>{
      setSearchValue({...searchValue,[e.target.name]:e.target.value});
  }

  const onHanldeSubmit = (e)=>{
       e.preventDefault();
       onSearchData(searchValue.search);
       setSearchValue('');
  }

  const onSearchData = (searchWord)=>{
       
       const word = typeof searchWord ==='string'? searchWord.toLowerCase():searchWord;

       const newData = users.filter((user)=>{
           const userName = user.name.toLowerCase();
           const userEmail = user.email.toLowerCase();
           const userRole = user.role.toLowerCase();

           return userName.includes(word) || userEmail.includes(word) || userRole.includes(word);
       })

       setUsers(newData);
  }
 
  return (
    <Container>
      <Row>
        <Col>
        <form onSubmit={onHanldeSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Search here..."
            onChange={OnHandleChange}
            value={searchValue.search}
            className="search-box"
          ></input>
          <button className="search" type="submit">Search</button>
          </form>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <button className="delete-selected" onClick={deleteSelected}>
            <strong>
              <RiDeleteBin7Line />
            </strong>
          </button>
        </Col>
      </Row>
      <Row style={{ marginTop: "2%" }}>
        <Col>
           
           <UserTable showData={showData} getDeleteDataFromTable={getDeleteDataFromTable} deleteOneUser={deleteOneUser} EditData={EditData} totalRows={users.length} />
           
        </Col>
      </Row>
      <Row>
        <Col>
            {/* <button className="delete-selected" onClick={deleteSelected}>Delete Selected</button> */}
        </Col>
        <Col>
        <PaginationBar pageLength={pageLength} pageNo={pageNo} changePageNo={changePageNo}/>
           
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
