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
        { name: 'locationofWork', placeholder: 'Location'}
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
                        <div key={index}>
                            {Object.keys(work).map(key => (
                                <p key={key} className={key}>{work[key]}</p>
                            ))}
                        </div>
                    ))}
                    <div className="dateTime">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;