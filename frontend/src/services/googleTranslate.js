import axios from "axios";

const googleTradutor = axios.create({ baseURL: "https://translation.googleapis.com/language/translate/v2" });

export default googleTradutor;