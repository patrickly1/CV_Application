import { useState } from "react";

function Personal() {
    const [firstName, setFirstName] = useState(''); 
    const [submittedFirstName, setSubmittedFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [submittedLastName, setSubmittedLastName] = useState(''); 
    

    function handleFirstNameChange(e) {
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value);
    }

    function handleReset() {
        setFirstName('');
        setSubmittedFirstName('');
        setLastName('');
        setSubmittedLastName('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmittedFirstName(firstName);
        setSubmittedLastName(lastName);
    }

    return (
    <div className="PersonalContainer">
        Test
        <form onSubmit={handleSubmit}>
            <input
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            />
            <input
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            />
            <h1>{submittedFirstName} {submittedLastName}</h1>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>Reset</button>
            <button type="button">Edit</button>
        </form>    
    </div>);
}

export default Personal;