import React from 'react';
import axios from "axios";

const AxiosInst = axios.create({
        baseURL: "http://localhost:3001" //change this so it's not hardcoded
      });

export default AxiosInst