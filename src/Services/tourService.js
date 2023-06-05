import axios from "axios";
const API = "https://worldtours-backend.onrender.com//tours";
const USER_API = "https://worldtours-backend.onrender.com//users";
//Handles Creating New Tour
export const createTour = async (data) => {
  try {
    const response = await axios.post(`${API}/create-tour`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, message: "Tour created successfully!" };
  } catch (error) {
    console.error("Error creating tour:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
//To Get ALl The Tours From The Database
export const fetchAllTours = async () => {
  try {
    const response = await axios.get(`${API}/tours`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
};
//Getting Orgainzer And Tour Detials At Same Time
export const fetchTourAndOrganizer = async (tourId) => {
  try {
    const response = await axios.get(`${API}/${tourId}`);
    const tour = response.data;
    const organizerResponse = await axios.get(
      `${USER_API}/id/${tour.organizerId}`
    );
    const organizer = organizerResponse.data;

    return { tour, organizer };
  } catch (error) {
    console.error("Error fetching tour and organizer details:", error);
    return { tour: null, organizer: null };
  }
};
export const getTourById = async (id) => {
  try {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
  } catch (e) {
    console.log("error while getting tour ", e);
    return null;
  }
};
export const updateTour = async (tourId, data) => {
  try {
    await axios.put(`${API}/update/${tourId}`, data , {
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`,
      }
    });
    return { success: true, message: "Tour updated successfully!" };
  } catch (error) {
    console.error("Error updating tour:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

// Deleting a tour
export const deleteTour = async (tourId) => {
  try {
    await axios.delete(`${API}/delete/${tourId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return { success: true, message: "Tour deleted successfully!" };
  } catch (error) {
    console.error("Error deleting tour:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
