import axiosInstance from "../../utils/axios.js"
export const studentLogin = async (enteredData)=>{
    try{
        const response = await axiosInstance.post('/login/student',{
            rollNo: enteredData.rollNo,
            mobile: enteredData.mobile,
        })
        if(response){
            sessionStorage.setItem("studentData", JSON.stringify(response.data.data));
            return response.data.data;
        } else {
            throw new Error("Login failed");
        }
    }catch(e){
        throw new Error("Login failed: " + e.message);
    }
}

export const logout = () =>{
    sessionStorage.removeItem("studentData");
}