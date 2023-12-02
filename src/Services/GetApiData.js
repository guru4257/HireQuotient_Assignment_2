import axios from "axios";


let url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export const fetchUserList = async ()=>{
 
     return await axios.get(url);    
}