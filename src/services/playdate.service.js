import axios from "axios";

class PlaydateServices {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  createPlaydate = (newPlaydate) => {
    return this.api.post(`/api/playdates/create`, newPlaydate);
  };

  getPlaydate = (playdateId) => {
    return this.api.get(`/api/playdates/${playdateId}`);
  };

  getAllPlaydates = () => {
    return this.api.get(`/api/playdates/`);
  };

  editPlaydate = (playdateId, updatedPlaydateData) => {
    return this.api.put(`/api/playdates/${playdateId}`, updatedPlaydateData);
  };

  deletePlaydate = (playdateId) => {
    return this.api.delete(`/api/playdates/${playdateId}`);
  };

  uploadImage = (imageUrl) => {
    return this.api.post("/api/upload", imageUrl)
  };

  updatePlaydate = (playdateId, updatedPlaydateData) => {
    return this.api.put(`/api/playdates/${playdateId}`, updatedPlaydateData);
  };
}

const playdateServices = new PlaydateServices();

export default playdateServices;
