import { useState } from "react";

function Personal() {
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [submittedFirstName, setSubmittedFirstName] = useState(''); 
    const [submittedLastName, setSubmittedLastName] = useState(''); 
    const [previousFirstName, setPreviousFirstName] = useState(''); 
    const [previousLastName, setPreviousLastName] = useState(''); 
    

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
        setPreviousFirstName('');
        setPreviousLastName('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmittedFirstName(firstName);
        setSubmittedLastName(lastName);
        setPreviousFirstName(firstName);
        setPreviousLastName(lastName);
        setFirstName('');
        setLastName('');
    }

    function handleEdit() {
        setFirstName(previousFirstName);
        setLastName(previousLastName);
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
            <button type="button" onClick={handleEdit}>Edit</button>
        </form>    
    </div>);
}

export default Personal;