import axios from "axios";

export const getCountryFromIPAddress = async (ip: string): Promise<string> => {
    if (ip == "::1") {
        return 'Made request from localhost';
    }

    const geoLocalizationObject = await axios.get(`http://api.ipstack.com/${ip}?access_key=${process.env.ACCESS_KEY_IPSTACK}&format=1`);
    if (geoLocalizationObject) {
        return geoLocalizationObject?.data?.country_name;
    }
    return 'Unknown';
}