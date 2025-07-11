import axiosInstance from "../../utils/axios.js"
export const studentLogin = async (enteredData)=>{
    const response = await axiosInstance.post('/login/student',{
        rollNo: enteredData.rollNo,
        mobile: enteredData.mobile,
    })
    if(response.status === 200){
        sessionStorage.setItem("studentData", JSON.stringify(response.data.data));
        return response.data.data;
    } else {
        throw new Error("Login failed");
    }
}
export const accountantLogin = async (enteredData)=>{
    const response = await axiosInstance.post('/login/accountant',{
        username : enteredData.username,
        password : enteredData.password,
    })
    if(response.status === 200){
        sessionStorage.setItem("accountantData", JSON.stringify(response.data.data));
        return response.data.data;
    } else {
        throw new Error("Login failed");
    }
}
export const clerkLogin = async (enteredData)=>{
    const response = await axiosInstance.post('/login/clerk',{
        username : enteredData.username,
        password : enteredData.password,
    })
    if(response.status === 200){
        sessionStorage.setItem("clerkData", JSON.stringify(response.data.data));
        return response.data.data;
    } else {
        throw new Error("Login failed");
    }
}
export const adminLogin = async (enteredData)=>{
    const response = await axiosInstance.post('/login/admin',{
        username : enteredData.username,
        password : enteredData.password,
    })
    if(response.status === 200){
        sessionStorage.setItem("adminData", JSON.stringify(response.data.data));
        return response.data.data;
    } else {
        throw new Error("Login failed");
    }
}

export const logout = () =>{
    sessionStorage.removeItem("studentData");
    sessionStorage.removeItem("accountantData");
    sessionStorage.removeItem("clerkData");
    sessionStorage.removeItem("adminData");
}