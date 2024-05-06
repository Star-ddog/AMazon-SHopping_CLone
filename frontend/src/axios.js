import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  // baseURL: 'http://localhost:5000/'
  baseURL: 'https://amazon-shopping-clone-api.vercel.app/'
    // "http://127.0.0.1:5001/amazin-project-48294/us-central1/api",
});

export default instance;