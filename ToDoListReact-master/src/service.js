import axios from 'axios';

// הגדרת כתובת ה-API כ-default
axios.defaults.baseURL = "http://localhost:5246";

// הוספת interceptor שיתפוס את השגיאות וירשום אותן בלוג
axios.interceptors.response.use(
  (response) => {
    // במקרה של הצלחה, מחזירים את התגובה כרגיל
    return response;
  },
  (error) => {
    // במקרה של שגיאה, רושמים את השגיאה בלוג
    console.error("Axios Error:", error.response ? error.response.data : error.message);
    return Promise.reject(error); // חשוב להחזיר את השגיאה כדי שהיא תגיע למקום שהזמין את הקריאה
  }
);

export default {
  // פונקציה לקבלת כל המטלות
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




