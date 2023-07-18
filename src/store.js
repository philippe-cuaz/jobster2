import {configureStore} from '@reduxjs/toolkit';
//import userSlice from './features/user/userSlice';
import userSlice from './features/user/UserSlice';
import jobSlice from './features/job/jobSlice';
import allJobsSlice from './features/allJobs/allJobsSlice';


export const store = configureStore({
    reducer:{
        user:userSlice,
        job:jobSlice,
        allJobs:allJobsSlice,
    },
});


