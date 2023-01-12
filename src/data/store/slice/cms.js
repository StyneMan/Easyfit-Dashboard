import { createSlice } from "@reduxjs/toolkit";

export const cmsSlice = createSlice({
  name: "cms",
  initialState: {
    privacyData: null,
    contactData: null,
    blogData: null,
    bankData: null,
    faqData: null,
    adsData: null,
    aboutData: null,
  },
  reducers: {
    setPrivacyData: (state, action) => {
      state.privacyData = action.payload;
    },
    setBlogData: (state, action) => {
      state.blogData = action.payload;
    },
    setContactData: (state, action) => {
      state.contactData = action.payload;
    },
    setFAQData: (state, action) => {
      state.faqData = action.payload;
    },
    setAdsData: (state, action) => {
      state.adsData = action.payload;
    },
    setAboutData: (state, action) => {
      state.aboutData = action.payload;
    },
    setBankData: (state, action) => {
      state.bankData = action.payload;
    },
  },
});

export const {
  setAdsData,
  setFAQData,
  setBlogData,
  setBankData,
  setAboutData,
  setContactData,
  setPrivacyData,
} = cmsSlice.actions;

export default cmsSlice.reducer;
