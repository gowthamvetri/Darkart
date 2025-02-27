import Axios from './Axios';
import SummaryApi from '../common/SummaryApi';

const FetchUserInfo = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDetails
    });
        return response.data;
    } catch (error) {
        console.log(error); 
    }
}

export default FetchUserInfo;