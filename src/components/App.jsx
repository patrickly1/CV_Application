import React, { useState } from "react";
import FormSection from "./Form";
import "../styles/styles.css";

function App() {
    //Create input fields that will later be used for the Form component
    const personalFields = [
        { name: 'firstName', placeholder: 'First Name'},
        { name: 'lastName', placeholder: 'Last Name'},
        { name: 'email', placeholder: 'Email'},
        { name: 'phoneNumber', placeholder: 'Phone Number'}
    ];

    const educationFields = [
        { name: 'school', placeholder: 'School'},
        { name: 'program', placeholder: 'Program'},
        { name: 'dateOfStudy', placeholder: 'Date of Study'},
        { name: 'locationOfStudy', placeholder: 'Location'}
    ];

    const workFields =[
        { name: 'company', placeholder: 'Name of Company'},
        { name: 'positionTitle', placeholder: 'Title of Position'},
        { name: 'responsibilities', placeholder: 'Main Responsibilities'},
        { name: 'dateOfWork', placeholder: 'Date of Work'},
        { name: 'locationOfWork', placeholder: 'Location'}
    ];

    //Create an object using each input field
    const [personalData, setPersonalData] = useState(
        personalFields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {})
    );

    const [educationData, setEducationData] = useState(
        educationFields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {})
    );

    const [workData, setWorkData] = useState(
        workFields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {})
    );

    //Create a state for submitted data for our reset and edit button features
    const [submittedData, setSubmittedData] = useState({ personal: {}, education: [], work: []});

    //Update the state of the form when an input field changes
    function handleChange(e, setData, data) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value});
    }

    //Handle form submissions based on the section
    function handleSubmit(e, data, section) {
        e.preventDefault();
        //Multiple arrays if section is education or work
        if (section === 'education' || section === 'work') {
            setSubmittedData((prev) => ({ ...prev, [section]: [...prev[section], data] }))
        } else {
            //if section is personal
            setSubmittedData((prev) => ({ ...prev, [section]: data}))
        };

        //Reset the form fields. Check if section is work, then education, then personal
        handleReset(section === 'work' ? workFields : (section === 'education' ? educationFields : personalFields), 
        section === 'work' ? setWorkData : (section === 'education' ? setEducationData : setPersonalData));
    }

    //Handle reset button 
    function handleReset(fields, setData, section) {
        //Reset form fields
        setData(fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {}));
        //If section is education or work, remove the most recent entry
        if (section === 'education' || section === 'work') {
            setSubmittedData((prev) => ({
                ...prev,
                [section]: prev[section].slice(0, -1)
            }));
        } else {
            //Otherwise it's personal section, so we remove everything
            setSubmittedData((prev) => ({
                ...prev,
                [section]: {}
            }));
        }
    }

    //Edit button
    function handleEdit(setData, section) {
        //Update state of form data
        if (section === 'education' || section === 'work') {
            //get the last entry in the stored array
            const lastEntry = submittedData[section][submittedData[section].length - 1];
            setData(lastEntry);
        } else {
            setData(submittedData[section]);
        }
    }

    return (
        //Create formsection using the form component, with submit, reset, and edit buttons
        //for each section
        <div className="container">
            <div className="form-container">
                <FormSection
                    title="Personal Information"
                    fields={personalFields}
                    formData={personalData}
                    handleChange={(e) => handleChange(e, setPersonalData, personalData)}
                    handleReset={() => handleReset(personalFields, setPersonalData, 'personal')}
                    handleSubmit={(e) => handleSubmit(e, personalData, 'personal')}
                    handleEdit={() => handleEdit(setPersonalData, 'personal')}
                />
                <FormSection
                    title="Education"
                    fields={educationFields}
                    formData={educationData}
                    handleChange={(e) => handleChange(e, setEducationData, educationData)}
                    handleReset={() => handleReset(educationFields, setEducationData, 'education')}
                    handleSubmit={(e) => handleSubmit(e, educationData, 'education')}
                    handleEdit={() => handleEdit(setEducationData, 'education')}
                />
                <FormSection
                    title="Work Experience"
                    fields={workFields}
                    formData={workData}
                    handleChange={(e) => handleChange(e, setWorkData, workData)}
                    handleReset={() => handleReset(workFields, setWorkData, 'work')}
                    handleSubmit={(e) => handleSubmit(e, workData, 'work')}
                    handleEdit={() => handleEdit(setWorkData, 'work')}
                />
            </div>
            <div className="output-container">
                <h1 className="fullName">{submittedData.personal.firstName} {submittedData.personal.lastName}</h1>
                <div className="personalContainer">
                    <p className="email">{submittedData.personal.email}</p>
                    <p>{submittedData.personal.email && submittedData.personal.phoneNumber && <p>&nbsp;|&nbsp;</p>}</p>
                    <p className="phoneNumber">{submittedData.personal.phoneNumber}</p>
                </div>
                <div className="educationContainer">
                    {submittedData.education.length > 0 && <h2 className="educationHeader">Education</h2>}
                    {submittedData.education.map((education, index) => (
                        <div key={index} className="educationDetails">
                            <div className="schoolContainer">
                                <p className="school">{education.school}</p>
                                <p className="dateOfStudy">{education.dateOfStudy}</p>
                            </div>
                            <div className="schoolContainer">
                                <p className="program">{education.program}</p>
                                <p className="locationOfStudy">{education.locationOfStudy}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="workContainer">
                    {submittedData.work.length > 0 && <h2 className="workHeader">Work Experience</h2>}
                    {submittedData.work.map((work, index) => (
                        <div key={index} className="workDetails">
                            <div className="workLeftContainer">
                                <p className="company">{work.company}</p>
                                <p className="positionTitle">{work.positionTitle}</p>
                                <ul className="responsibilities">
                                    {work.responsibilities.split(',').map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="workRightContainer">
                                <p className="dateOfWork">{work.dateOfWork}</p>
                                <p className="locationOfWork">{work.locationOfWork}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;