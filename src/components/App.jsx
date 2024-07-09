import React, { useState } from "react";
import FormSection from "./Form";
import "../styles/styles.css";

function App() {
    const [submittedData, setSubmittedData] = useState({});

    function handleSubmit(data) {
        setSubmittedData(prevData => ({
            ...prevData,
            ...data
        }));
    }

    function handleReset(fields) {
        setSubmittedData(prevData => {
            const newData = { ...prevData };
            fields.forEach(field => {
                delete newData[field.name];
            });
            return newData;
        });
    }
    
    const personalFields = [
        { name: 'firstName', placeholder: 'First Name'},
        { name: 'lastName', placeholder: 'Last Name'},
        { name: 'email', placeholder: 'Email'},
        { name: 'phoneNumber', placeholder: 'Phone Number'}
    ];

    const educationFields = [
        { name: 'school', placeholder: 'School'},
        { name: 'program', placeholder: 'Program'},
        { name: 'dateOfStudy', placeholder: 'Date of Study'}
    ];

    const workFields =[
        { name: 'company', placeholder: 'Name of Company'},
        { name: 'positionTitle', placeholder: 'Title of Position'},
        { name: 'responsibilities', placeholder: 'Main Responsibilities'},
        { name: 'dateOfWork', placeholder: 'Date of Work'}
    ]

    return (
        <div className="container">
            <div className="form-container">
            <FormSection 
                title="Personal Information" 
                fields={personalFields} 
                onSubmit={handleSubmit} 
                onReset={handleReset}>
            </FormSection>
            <FormSection 
                title="Education" 
                fields={educationFields} 
                onSubmit={handleSubmit} 
                onReset={handleReset}>
                </FormSection>
            <FormSection 
            title="Work" 
            fields={workFields} 
            onSubmit={handleSubmit} 
            onReset={handleReset}>
            </FormSection>
            </div>
            <div className='output-container'>
                <h1>Submitted Data</h1>
                <p>{Object.values(submittedData).join(' ')}</p>
            </div>
        </div>
    )
}

export default App;