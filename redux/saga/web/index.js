import ApiPath from "@/constants/apiPath";
import { ApiClient } from "@/utilities/api";
import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  onErrorStopLoad,
  setAdminList,
  setBlockUser,
  setCreateJobs,
  setCustomerList,
  setDashboard,
  setDeletedCustomer,
  setJobList,
  setJobsByJobId,
  setLogs,
  setLogUsers,
  setRolesList,
  setSentUserNotification,
  setSiteList,
  setStaffList,
  setSupervisorList,
  setTerritoryList,
  stopLoading
} from "../../slices/web";

// Worker saga will be fired on USER_FETCH_REQUESTED actions

function* getDashboard(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.DASHBOARD_ADMIN),
      (action.payload = action.payload)
    );

    if (resp.status) {
      yield put(setDashboard(resp));
      yield call(action.payload.cb, (action.res = resp));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getLogs(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_LOGS),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setLogs(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getLogUsers(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_LOG_USERS + dataToSend?.id),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setLogUsers(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getCustomerList(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_CUSTOMER_LIST),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setCustomerList(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* deleteACustomer(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.delete,
      (action.url = ApiPath.WebApiPath.DELETE_A_CUSTOMER + dataToSend?.id),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setDeletedCustomer(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* sendUserNotification(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.SEND_USER_NOTIFICATION),
      action.payload
    );

    if (resp.status) {
      yield put(setSentUserNotification(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getUserByID(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_USER_BY_ID + action.payload?.id)
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* updateUser(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.UPDATE_USER_BY_ID + action.payload?.id),
      action.payload
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* ImageUpload(action) {
  try {
    const resp = yield call(
      ApiClient.postFormData,
      (action.url = ApiPath.WebApiPath.ATTACHMENT_UPLOAD),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.msg);
  }
}

function* getSupervisorList(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_SUPERVISOR_LIST),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setSupervisorList(resp));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getStaffList(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_STAFF_LIST),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setStaffList(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* blockUser(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.BLOCK_USER),
      action.payload
    );

    if (resp.status) {
      yield put(setBlockUser(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* unblockUser(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.UNBLOCK_USER),
      action.payload
    );

    if (resp.status) {
      yield put(setBlockUser(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getUserPermissions(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.get,
      (action.url =
        ApiPath.WebApiPath.GET_USER_PERMISSIONS + action.payload?.id),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* updateUserPermission(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url =
        ApiPath.WebApiPath.UPDATE_USER_PERMISSION + action.payload?.id),
      action.payload
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* createSupervisor(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.CREATE_SUPERVISOR),
      action.payload
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* updateStaffRequest(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url =
        ApiPath.WebApiPath.UPDATE_STAFF_REQUEST + action.payload?.id),
      action.payload
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* updateStaffSkills(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.UPDATE_SKILLS),
      action.payload
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getJobList(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_JOB_LIST),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setJobList(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getTerritoryList(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_TERRITORY_LIST),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setTerritoryList(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getJobByJobId(action) {
  const dataToSend = { ...action.payload };
  delete dataToSend.cb;
  delete dataToSend.id;
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_JOBS_BY_ID + action.payload?.id),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setJobsByJobId(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getSiteList(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.SITE),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setSiteList(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* createJobs(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.ADD_JOBS)(action.payload)
    );
    if (resp.status) {
      yield put(setCreateJobs(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getSiteDetails(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_SITE_BY_ID + action.payload?.id)
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* deleteAJob(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.DELETE_JOB + action.payload?.id),
      action.payload
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* deleteTerrority(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.delete,
      (action.url = ApiPath.WebApiPath.TERRITORY_DELETE + dataToSend?.id),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setDeletedCustomer(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* addTerritory(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.CREATE_TERRITORY),
      action.payload
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getTerritory(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_TERRITORY + action.payload?.id)
    );

    if (resp.status) {
      yield put(stopLoading(resp));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* updateTerritory(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.UPDATE_TERRITORY + action.payload?.id),
      action.payload
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* addSite(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.SITE),
      action.payload
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* updateSite(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.SITE + action.payload?.id),
      action.payload
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* deleteSite(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.delete,
      (action.url = ApiPath.WebApiPath.SITE + dataToSend?.id),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getDesignation(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_DESIGNATION),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* addJob(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.ADD_JOB),
      action.payload
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    console.log(e);
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* updateJob(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.UPDATE_JOB + action.payload?.id),
      action.payload
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    console.log(e);
    toast.error(e?.response?.data?.msg);
  }
}

function* employeeListJob(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.id;
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.EMPLOYEE_LIST_JOB + action.payload?.id),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setLogs(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    console.log(e);
    toast.error(e?.response?.data?.msg);
  }
}

function* assignJob(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.ASSIGN_JOB + action.payload?.id),
      action.payload
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* cancelJob(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.CANCEL_JOB + action.payload?.id),
      action.payload
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    console.log(e, "eeeeeeee");
    toast.error(e?.response?.data?.msg);
  }
}

function* getRolesList(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.ROLES),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setRolesList(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* startJobTime(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.START_JOB_TIME),
      action.payload
    );

    if (resp.status) {
      yield put(setSentUserNotification(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* stopJobTime(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.END_JOB_TIME + action.payload?.id),
      action.payload
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* updateArchiveStatus(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url =
        ApiPath.WebApiPath.UPDATE_ARCHIVE_STATUS + action.payload?.id),
      action.payload
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* addRole(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.ROLES),
      action.payload
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getDesignationById(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.get,
      (action.url =
        ApiPath.WebApiPath.GET_DESIGNATION_BY_ID + action.payload?.id)
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* updateDesignation(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.ROLES + action.payload?.id),
      action.payload
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getCMS(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.CMS),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* updateCMS(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.CMS + action.payload?.id),
      action.payload
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* deleteRole(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.delete,
      (action.url = ApiPath.WebApiPath.ROLES + dataToSend?.id),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getNotifications(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.NOTIFICATION),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* markAllRead(action) {
  try {
    let dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.MARK_ALL_READ),
      dataToSend
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* markRead(action) {
  try {
    let dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.MARK_READ + action.payload.id),
      dataToSend
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* sendNotificationToUser(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.SEND_NOTIFICATION_USER),
      action.payload
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* endChat(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.CHAT_END),
      action.payload
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* createAdmin(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.ADD_ADMIN),
      action.payload
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getAdminList(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.ADMIN_LIST),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setAdminList(resp));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}


function* getCalendarJobs(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.CALENDAR_JOBS + dataToSend?.id),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* webSaga() {
  yield all([
    takeLatest("web/getDashboard", getDashboard),
    takeLatest("web/getLogs", getLogs),
    takeLatest("web/getLogUsers", getLogUsers),
    takeLatest("web/getCustomerList", getCustomerList),
    takeLatest("web/deleteACustomer", deleteACustomer),
    takeLatest("web/sendUserNotification", sendUserNotification),
    takeLatest("web/getUserByID", getUserByID),
    takeLatest("web/updateUser", updateUser),
    takeLatest("web/ImageUpload", ImageUpload),
    takeLatest("web/getSupervisorList", getSupervisorList),
    takeLatest("web/getStaffList", getStaffList),
    takeLatest("web/blockUser", blockUser),
    takeLatest("web/unblockUser", unblockUser),
    takeLatest("web/getUserPermissions", getUserPermissions),
    takeLatest("web/updateUserPermission", updateUserPermission),
    takeLatest("web/createSupervisor", createSupervisor),
    takeLatest("web/updateStaffRequest", updateStaffRequest),
    takeLatest("web/updateStaffSkills", updateStaffSkills),
    takeLatest("web/getJobList", getJobList),
    takeLatest("web/getTerritoryList", getTerritoryList),
    takeLatest("web/getJobByJobId", getJobByJobId),
    takeLatest("web/getSiteList", getSiteList),
    takeLatest("web/getSiteDetails", getSiteDetails),
    takeLatest("web/createJobs", createJobs),
    takeLatest("web/deleteAJob", deleteAJob),
    takeLatest("web/deleteTerrority", deleteTerrority),
    takeLatest("web/addTerritory", addTerritory),
    takeLatest("web/getTerritory", getTerritory),
    takeLatest("web/updateTerritory", updateTerritory),
    takeLatest("web/addSite", addSite),
    takeLatest("web/updateSite", updateSite),
    takeLatest("web/deleteSite", deleteSite),
    takeLatest("web/getDesignation", getDesignation),
    takeLatest("web/addJob", addJob),
    takeLatest("web/updateJob", updateJob),
    takeLatest("web/employeeListJob", employeeListJob),
    takeLatest("web/assignJob", assignJob),
    takeLatest("web/cancelJob", cancelJob),
    takeLatest("web/getRolesList", getRolesList),
    takeLatest("web/startJobTime", startJobTime),
    takeLatest("web/stopJobTime", stopJobTime),
    takeLatest("web/updateArchiveStatus", updateArchiveStatus),
    takeLatest("web/addRole", addRole),
    takeLatest("web/getDesignationById", getDesignationById),
    takeLatest("web/updateDesignation", updateDesignation),
    takeLatest("web/getCMS", getCMS),
    takeLatest("web/updateCMS", updateCMS),
    takeLatest("web/deleteRole", deleteRole),
    takeLatest("web/getNotifications", getNotifications),
    takeLatest("web/markAllRead", markAllRead),
    takeLatest("web/markRead", markRead),
    takeLatest("web/sendNotificationToUser", sendNotificationToUser),
    takeLatest("web/endChat", endChat),
    takeLatest("web/createAdmin", createAdmin),
    takeLatest("web/getAdminList", getAdminList),
    takeLatest("web/getCalendarJobs", getCalendarJobs),
  ]);
}

export default webSaga;
