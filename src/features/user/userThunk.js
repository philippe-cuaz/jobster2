import { toast } from "react-toastify";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { logoutUser } from "./UserSlice";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";

export const registerUserThunk = async(url,user,thunkAPI)=>{
    try{
        const resp = await customFetch.post(url,user);
        console.log(resp);
        return resp.data

    }catch(error){
        // toast.error(error.response.data.msg)
        // console.log(`reg error: ${error.response}`);
        return thunkAPI.rejectWithValue(error.response.data.msg);

    }
};

export const loginUserThunk = async(url,user,thunkAPI)=>{
try{
        const resp = await customFetch.post(url,user);
        console.log(resp);
        return resp.data

    }catch(error){
        // toast.error(error.response.data.msg)
        // console.log(`reg error: ${error.response}`);
        return thunkAPI.rejectWithValue(error.response.data.msg);

    }
}

export const updateUserThunk = async(url,user,thunkAPI)=>{
try{
        const resp = await customFetch.patch(
            url,
            user,
            {headers:{
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }}
            );
        console.log(resp);
        return resp.data

    }catch(error){
        // if(error.response.status === 401){
        //     thunkAPI.dispatch(logoutUser());
        //     //toast.error('');
        //     return thunkAPI.rejectWithValue('Unauthorized!! Logging Out...');
        // }
        // toast.error(error.response.data.msg)
         console.log(`patch error: ${error.response}`);
        // return thunkAPI.rejectWithValue(error.response.data.msg);
        return checkForUnauthorizedResponse(error,thunkAPI);
        

    }
};

export const clearStoreThunk = async (message,thunkAPI)=>{
    try{
        thunkAPI.dispatch(logoutUser(message));
        thunkAPI.dispatch(clearAllJobsState());
        thunkAPI.dispatch(clearValues());
        return Promise.resolve();

    }catch(error){
        return Promise.reject();

    }
}

