import authHeader from "../../utils/authHeader";
import customFetchn,{checkForUnauthorizedResponse} from "../../utils/axios";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { logoutUser } from "../user/UserSlice";
import { clearValues } from "./jobSlice";


// const authHeader = (thunkAPI)=>{
//     return  {
//       headers:{
//         authorization:`Bearer ${thunkAPI.getState().user.user.token}`
//       },
//     }
// }

export const createJobThunk = async(job,thunkAPI)=>{
  try
  {
    const resp = await customFetch.post('/jobs',job,authHeader(thunkAPI));
    // {
    //   headers:{
    //     authorization:`Bearer ${thunkAPI.getState().user.user.token}`
    //   },
    // }
    //);
    thunkAPI.dispatch(clearValues());
    return resp.data;

  }
  catch(error)
  {
    // if(error.response.status===401)
    // {
    //   thunkAPI.dispatch(logoutUser());
    //   return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    // }
    // return thunkAPI.rejectWithValue(error.response.data.msg);
    return checkForUnauthorizedResponse(error,thunkAPI);

  }
};


export const deleteJobThunk = async(jobId,thunkAPI)=>{
  thunkAPI.dispatch(showLoading());
  try
  {
    const resp = await customFetch.delete(`/jobs/${jobId}`,authHeader(thunkAPI));
    // {
    //   headers:{
    //     authorization:`Bearer ${thunkAPI.getState().user.user.token}`,
    //   },
    // }
   // );
    thunkAPI.dispatch(getAllJobs());
    return resp.data.msg;
  }
  catch(error)
  {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};


export const editJobThunk=
 async({jobId,job},thunkAPI)=>{
  try{
      const resp = await customFetch.patch(`/jobs/${jobId}`,job,authHeader(thunkAPI));
    //   {
    //      headers:{
    //     authorization:`Bearer ${thunkAPI.getState().user.user.token}`,
    //   },
    //   }
     // );
      thunkAPI.dispatch(clearValues());
      return    resp.data; 
  }
  catch(error)
  {
return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};