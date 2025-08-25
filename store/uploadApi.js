import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1" }),

  endpoints: (builder) => {
    return {
      uploadFile: builder.mutation({
        query: (formData) => {
          return {
            url: "/files/upload",
            method: "POST",
            body: formData,
          };
        },
      }),
    
    };
  },
});

export const { useUploadFileMutation } = uploadApi;
