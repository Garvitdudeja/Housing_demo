import { createSlice } from "@reduxjs/toolkit";
import { restAllData } from "../commanAction";

const initialState = {
  loading: false,
  dashboard: {},
  logs: {},
  logUsers: {},
  customerList: {},
  deletedCustomer: {},
  supervisorList: {},
  staffList: {},
  blockedUser: {},
  jobList: {},
  territoryList: {},
  siteList: {},
  jobsById: {},
};

export const webSlice = createSlice({
  name: "web",
  initialState,
  extraReducers: (builder) => builder.addCase(restAllData, () => initialState),
  reducers: {
    getDashboard: (state) => {
      state.loading = true;
    },
    setDashboard: (state, action) => {
      state.loading = false;
      state.dashboard = action.payload;
    },
    getLogs: (state) => {
      state.loading = true;
    },
    setLogs: (state, action) => {
      state.loading = false;
      state.logs = action.payload;
    },
    getLogUsers: (state) => {
      state.loading = true;
    },
    setLogUsers: (state, action) => {
      state.loading = false;
      state.logUsers = action.payload;
    },
    getCustomerList: (state) => {
      state.loading = true;
    },
    setCustomerList: (state, action) => {
      state.loading = false;
      state.customerList = action.payload;
    },
    deleteACustomer: (state) => {
      state.loading = true;
    },
    setDeletedCustomer: (state, action) => {
      state.loading = false;
      state.deletedCustomer = action.payload;
    },
    sendUserNotification: (state) => {
      state.loading = true;
    },
    setSentUserNotification: (state, action) => {
      state.loading = false;
      // state.userNotifaction = action.payload;
    },
    getUserByID: (state) => {
      state.loading = true;
    },
    updateUser: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    ImageUpload: (state) => {
      state.loading = true;
    },
    getSupervisorList: (state) => {
      state.loading = true;
    },
    setSupervisorList: (state, action) => {
      state.loading = false;
      state.supervisorList = action.payload;
    },
    getStaffList: (state) => {
      state.loading = true;
    },
    setStaffList: (state, action) => {
      state.loading = false;
      state.staffList = action.payload;
    },
    blockUser: (state) => {
      state.loading = true;
    },
    setBlockUser: (state, action) => {
      state.loading = false;
      state.blockedUser = action.payload;
    },
    unblockUser: (state) => {
      state.loading = true;
    },
    onErrorStopLoad: (state) => {
      state.loading = false;
    },
    getUserPermissions: (state) => {
      state.loading = true;
    },
    updateUserPermission: (state) => {
      state.loading = true;
    },
    createSupervisor: (state) => {
      state.loading = true;
    },
    updateStaffRequest: (state) => {
      state.loading = true;
    },
    updateStaffSkills: (state) => {
      state.loading = true;
    },
    getJobList: (state) => {
      state.loading = true;
    },
    setJobList: (state, action) => {
      state.loading = false;
      state.supervisorList = action.payload;
    },
    getTerritoryList: (state) => {
      state.loading = true;
    },
    setTerritoryList: (state, action) => {
      state.loading = false;
      state.territoryList = action.payload;
    },
    getSiteList: (state) => {
      state.loading = true;
    },
    setSiteList: (state, action) => {
      state.loading = false;
      state.siteList = action.payload;
    },
    getJobByJobId: (state, action) => {
      state.loading = true;
    },
    setJobsByJobId: (state, action) => {
      state.loading = false;
      state.jobsById = action.payload;
    },
    createJobs: (state, action) => {
      state.loading = true;
    },
    setCreateJobs: (state, action) => {
      state.loading = false;
    },
    getSiteDetails: (state) => {
      state.loading = true;
    },
    setSitesByUserID: (state) => {
      state.loading = false;
    },
    deleteAJob: (state) => {
      state.loading = false;
    },
    deleteTerrority: (state) => {
      state.loading = false;
    },
    addTerritory: (state) => {
      state.loading = false;
    },
    getTerritory: (state) => {
      state.loading = false;
    },
    updateTerritory: (state) => {
      state.loading = false;
    },
    addSite: (state) => {
      state.loading = true;
    },
    updateSite: (state) => {
      state.loading = true;
    },
    deleteSite: (state) => {
      state.loading = true;
    },
    getDesignation: (state) => {
      state.loading = true;
    },
    addJob: (state) => {
      state.loading = true;
    },
    updateJob: (state) => {
      state.loading = true;
    },
    employeeListJob: (state) => {
      state.loading = true;
    },
    assignJob: (state) => {
      state.loading = true;
    },
    cancelJob: (state) => {
      state.loading = true;
    },
    getRolesList: (state) => {
      state.loading = true;
    },
    setRolesList: (state, action) => {
      state.loading = false;
      state.territoryList = action.payload;
    },
    startJobTime: (state) => {
      state.loading = true;
    },
    stopJobTime: (state) => {
      state.loading = true;
    },
    updateArchiveStatus: (state) => {
      state.loading = true;
    },
    addRole: (state) => {
      state.loading = true;
    },
    getDesignationById: (state) => {
      state.loading = true;
    },
    updateDesignation: (state) => {
      state.loading = true;
    },
    getCMS: (state) => {
      state.loading = true;
    },
    updateCMS: (state) => {
      state.loading = true;
    },
    deleteRole: (state) => {
      state.loading = true;
    },
    getNotifications: (state) => {
      state.loading = true;
    },
    markAllRead: (state) => {
      state.loading = true;
    },
    markRead: (state) => {
      state.loading = true;
    },
    sendNotificationToUser: (state) => {
      state.loading = true;
    },
    endChat: (state) => {
      state.loading = true;
    },
    createAdmin: (state) => {
      state.loading = true;
    },
    getAdminList: (state) => {
      state.loading = true;
    },
    setAdminList: (state, action) => {
      state.loading = false;
      state.adminList = action.payload;
    },
    getCalendarJobs: (state) => {
      state.loading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getDashboard,
  setDashboard,
  getLogs,
  setLogs,
  getLogUsers,
  setLogUsers,
  setCustomerList,
  getCustomerList,
  deleteACustomer,
  setDeletedCustomer,
  sendUserNotification,
  setSentUserNotification,
  getUserByID,
  onErrorStopLoad,
  updateUser,
  ImageUpload,
  stopLoading,
  getSupervisorList,
  setSupervisorList,
  getStaffList,
  setStaffList,
  blockUser,
  setBlockUser,
  unblockUser,
  getUserPermissions,
  updateUserPermission,
  createSupervisor,
  updateStaffRequest,
  updateStaffSkills,
  setJobList,
  getJobList,
  getTerritoryList,
  setTerritoryList,
  getJobByJobId,
  setJobsByJobId,
  getSiteList,
  setSiteList,
  getSiteDetails,
  setSitesByUserID,
  createJobs,
  setCreateJobs,
  deleteAJob,
  deleteTerrority,
  addTerritory,
  getTerritory,
  updateTerritory,
  addSite,
  updateSite,
  deleteSite,
  getDesignation,
  addJob,
  updateJob,
  employeeListJob,
  assignJob,
  cancelJob,
  getRolesList,
  setRolesList,
  startJobTime,
  stopJobTime,
  updateArchiveStatus,
  addRole,
  getDesignationById,
  updateDesignation,
  getCMS,
  updateCMS,
  deleteRole,
  getNotifications,
  markAllRead,
  markRead,
  sendNotificationToUser,
  endChat,
  createAdmin,
  getAdminList,
  setAdminList,
  getCalendarJobs
} = webSlice.actions;

export default webSlice.reducer;
