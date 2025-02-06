import axios from 'axios';


// axios.defaults.baseURL = process.env.REACT_APP_API_URL
// axios.defaults.baseURL = "https://todolistserver1-v9j0.onrender.com"
axios.defaults.baseURL="http://localhost:5246/"

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Axios Error:", error.response ? error.response.data : error.message);
    return Promise.reject(error); 
  }
);


export default {
  getTasks: async () => {
    try {
      const result = await axios.get('/items');
      return result.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  addTask: async(name)=>{
    const result = await axios.post(`/items`,{
      name:name,
      isComplete:false
    })
    return result.data;
  },

  setCompleted: async(id,isComplete)=>{
    const result = await axios.put(`/items/${id}?iscomplete=${isComplete}`, {});
    return result.data;
  },

  deleteTask:async(id)=>{
    console.log('deleteTask')
    if (id) { 
      const result = await axios.delete(`/items/${id}`, {
      });
  } else {
      console.error('Invalid ID:', id);
    };
  }
};




