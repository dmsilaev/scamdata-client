import axios from "axios";
import Qs from "qs";
import notAuthorized from "./interceptors/notAuthorized";

const instance = axios.create({
  paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: "brackets" })
})

instance.interceptors.response.use(...notAuthorized);

export default instance;
