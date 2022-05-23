import { isValidPhoneNumber } from 'libphonenumber-js';
import axios from 'axios';

const phoneNumberValidation = (phone: string): boolean => {
    return isValidPhoneNumber(phone);
}

const existanceReportValidation = async (title: string) => {
    const originReport = await axios.get('https://api.fbi.gov/wanted/v1/list', {
        params: { title }
    })
    return !(originReport?.data?.total > 0);
}

export const checkValidation = async (title: string, phone: string) => {
    return phoneNumberValidation(phone) && await existanceReportValidation(title);
}





