import React from "react";
import FormSection from "./Form";

function App() {
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
        <div>
            <FormSection title="Personal Information" fields={personalFields}></FormSection>
            <FormSection title="Education" fields={educationFields}></FormSection>
            <FormSection title="Work" fields={workFields}></FormSection>
        </div>
    )
}

export default App;