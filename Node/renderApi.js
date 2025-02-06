const axios = require('axios');

// API key שלך
const apiKey = 'rnd_VWdEdIKvi9tOqJXxHXeXMwK2TSzb';

// פונקציה שמבצעת קריאה ל-Render API ומחזירה את רשימת האפליקציות
const getServices = async () => {
  const url = 'https://api.render.com/v1/services?includePreviews=true&limit=20';
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${apiKey}` // השתמש במפתח ה-API שלך
    }
  };

  try {
    const response = await axios(url, options);
    return response.data; // מחזיר את התוצאה
  } catch (err) {
    console.error('Error fetching services:', err);
    throw err; // אם יש שגיאה, השליך אותה
  }
};

module.exports = {
  getServices
};
