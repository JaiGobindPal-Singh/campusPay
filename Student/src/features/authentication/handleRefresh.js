import axiosInstance from "../../utils/axios";
export const loadStudentData = async()=>{
    try{
        const studentData = sessionStorage.getItem("studentData");
        if(studentData){
            const response = await axiosInstance.post('/student/getCurrentStudentDetails');
            if(response){
                const data = response.data.data;
                sessionStorage.setItem("studentData", JSON.stringify(data));
                return data;
            }
        }
        return null;
    }catch(e){
        console.warn(e)
        return null;
    }
}