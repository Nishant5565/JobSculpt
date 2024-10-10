import { API_URL } from "./Constants"
import axios from "axios";

// Function to check whether the backend is up and running
export const Website = async () => {
     const api = API_URL();
     try {
          const response = await axios.post(api, {
               SecretCode : 'JobSculpt@7874662036'
          });
          return response;
     }
     catch (error) {
          return false;
     }
}


