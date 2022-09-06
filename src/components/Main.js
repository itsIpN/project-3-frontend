import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Calendar from '../pages/Calendar';
import Create from '../pages/Create';
// import Home from '../pages/Home';
import Index from '../pages/Index';
import Project from '../pages/Project';
import Timepoint from "../pages/Timepoint";
import CreateTest from "../pages/CreateTest";
import Test from "../pages/Test";


function Main(props) {
    const [variables, setVariables] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL; 
    const getVariables = async () => {
        try {
            const response = await fetch(API_URL+'variable');
            const data = await response.json();
            setVariables(data)
        } catch (error) {

        }
    }

    const [timepoint, setTimepoint] = useState(null);
    const getTimepoint = async () => {
        try {
            const response = await fetch(API_URL+'timepoint')
            const data = await response.json();
            setTimepoint(data)
        } catch (error) {

        }
    }

    const [test, setTest] = useState(null);
    const getTest = async () => {
        try {
            const response = await fetch(API_URL+'test')
            const data = await response.json()
            setTest(data)
        } catch (error) {

        }
    }

    const createTimepoint = async (timepoint) => {
        await fetch(API_URL+'timepoint', {
            method: 'POST',
            headers: {
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(timepoint)
        })
        getTimepoint()
    }


    const createVariable = async (variable) => {
        await fetch(API_URL+'variable', {
            method: 'POST',
            headers: {
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(variable)
        })
        getVariables()
    }

    const createTest = async (test) => {
        await fetch(API_URL+'test', {
            method: 'POST',
            headers: {
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(test)
        })
        getTest()
    }

    useEffect(() => {
        getVariables();
        getTimepoint()
      }, [])

    return(
        <main>
            <Router>
                <Header />
                <Routes>
                  <Route path="/" element={<Calendar timepoint={timepoint} />}/>            
                  <Route path="/calendar" element={<Calendar timepoint={timepoint} />}/>      
                  <Route path="/projects" element={<Index variables={variables} />}/>      
                  <Route path="/new-project" element={<Create variables={variables} createVariable={createVariable} createTimepoint={createTimepoint} timepoint={timepoint}/>}/>      
                  <Route path="/projects/:id" element={<Project variables={variables}/>}/> 
                  <Route path="/timepoints/:id" element={<Timepoint timepoint={timepoint}/>} /> 
                  <Route path="/new-test" element={<CreateTest test={test} createTest={createTest}/>} />
                  <Route path="/tests" element={<Test test={test}/>}/>    
                </Routes>
            </Router>
        </main>
    )
}






export default Main