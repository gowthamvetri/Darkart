import toast from "react-hot-toast";

const AxiosTostError = (error) => {
    toast.error(error?.response?.data?.message);
    };
    
export default AxiosTostError;