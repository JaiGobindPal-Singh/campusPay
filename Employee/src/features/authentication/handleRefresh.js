import axiosInstance from "../../utils/axios.js";
export const loadAccountantData = async () => {
     try {
          const accountantData = sessionStorage.getItem("accountantData");
          if (accountantData) {
               const response = await axiosInstance.post('/accountant/getCurrentAccountantDetails');
               if (response) {
                    const data = response.data.data;
                    sessionStorage.setItem("accountantData", JSON.stringify(data));
                    return data;
               }
          }
          return null;
     } catch (e) {
          console.warn(e)
          return null;
     }
}
export const loadClerkData = async () => {
     try {
          const clerkData = sessionStorage.getItem("clerkData");
          if (clerkData) {
               const response = await axiosInstance.post('/clerk/getCurrentClerkDetails');
               if (response) {
                    const data = response.data.data;
                    sessionStorage.setItem("clerkData", JSON.stringify(data));
                    return data;
               }
          }
          return null;
     } catch (e) {
          console.warn(e)
          return null;
     }
}
export const loadAdminData = async () => {
     try {
          const adminData = sessionStorage.getItem("adminData");
          if (adminData) {
               const response = await axiosInstance.post('/admin/getCurrentAdminDetails');
               if (response) {
                    const data = response.data.data;
                    sessionStorage.setItem("adminData", JSON.stringify(data));
                    return data;
               }
          }
          return null;
     } catch (e) {
          console.warn(e)
          return null;
     }
}