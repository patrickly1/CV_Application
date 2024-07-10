import React, { useState } from "react";
import FormSection from "./Form";
import "../styles/styles.css";

function App() {
    const personalFields = [
        { name: 'firstName', placeholder: 'First Name'},
        { name: 'lastName', placeholder: 'Last Name'},
        { name: 'email', placeholder: 'Email'},
        { name: 'phoneNumber', placeholder: 'Phone Number'}
    ];

    const educationFields = [
        { name: 'dateOfStudy', placeholder: 'Date of Study'},
        { name: 'locationofStudy', placeholder: 'Location'},
        { name: 'school', placeholder: 'School'},
        { name: 'program', placeholder: 'Program'}
    ];

    const workFields =[
        { name: 'dateOfWork', placeholder: 'Date of Work'},
        { name: 'locationofWork', placeholder: 'Location'},
        { name: 'company', placeholder: 'Name of Company'},
        { name: 'positionTitle', placeholder: 'Title of Position'},
        { name: 'responsibilities', placeholder: 'Main Responsibilities'}
    ];

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

    const [submittedData, setSubmittedData] = useState({ personal: {}, education: [], work: []});

    function handleChange(e, setData, data) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value});
    }

    function handleSubmit(e, data, section) {
        e.preventDefault();
        if (section === 'education' || section === 'work') {
            setSubmittedData((prev) => ({ ...prev, [section]: [...prev[section], data] }))
        } else {
            setSubmittedData((prev) => ({ ...prev, [section]: data}))
        };

        handleReset(section === 'work' ? workFields : (section === 'education' ? educationFields : personalFields), 
        section === 'work' ? setWorkData : (section === 'education' ? setEducationData : setPersonalData));
    }

    function handleReset(fields, setData, section) {
        setData(fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {}));
        if (section === 'education' || section === 'work') {
            setSubmittedData((prev) => ({
                ...prev,
                [section]: prev[section].slice(0, -1)
            }));
        } else {
            setSubmittedData((prev) => ({
                ...prev,
                [section]: {}
            }));
        }
    }

    function handleEdit(setData, section) {
        if (section === 'education' || section === 'work') {
            const lastEntry = submittedData[section][submittedData[section].length - 1];
            setData(lastEntry);
        } else {
            setData(submittedData[section]);
        }
    }

    return (
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
                <h1 className="CV">CV</h1>
                <div className="personalContainer">
                    {Object.keys(submittedData.personal).map(key => (
                        <p key={key} classname={key}>{submittedData.personal[key]}</p>
                    ))}

                </div>
                <div className="educationContainer">
                    {submittedData.education.length > 0 && <h2 className="educationHeader">Education</h2>}
                    {submittedData.education.map((education, index) => (
                        <div key={index}>
                            {Object.keys(education).map(key => (
                                <p key={key} className={key}>{education[key]}</p>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="workContainer">
                    {submittedData.work.length > 0 && <h2 className="workHeader">Work Experience</h2>}
                    {submittedData.work.map((work, index) => (
                        <div key={index}>
                            {Object.keys(work).map(key => (
                                <p key={key} className={key}>{work[key]}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;