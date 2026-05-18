import axiosInstance from "../../services/axios";

export interface TutorProfileRequest {
  fullName: string;
  phone: string;
  avatarUrl: string;
  bio: string;
  experienceYears: number;
  pricePerHour: number;
  subjects: string[];
}

export interface TutorProfileResponse {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  bio: string;
  experienceYears: number;
  pricePerHour: number;
  kycStatus: string;
  subjects: string[];
}

export const tutorApi = {
  getMyProfile: async (): Promise<TutorProfileResponse> => {
    const res = await axiosInstance.get("/tutors/me/profile");
    return res.data.data;
  },
  
  updateMyProfile: async (data: TutorProfileRequest): Promise<TutorProfileResponse> => {
    const res = await axiosInstance.put("/tutors/me/profile", data);
    return res.data.data;
  }
};
