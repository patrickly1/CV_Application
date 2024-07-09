import { useState } from "react";

function Personal() {
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [submittedFirstName, setSubmittedFirstName] = useState(''); 
    const [submittedLastName, setSubmittedLastName] = useState(''); 
    const [submittedEmail, setSubmittedEmail] = useState('');
    const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState('');
    const [previousFirstName, setPreviousFirstName] = useState(''); 
    const [previousLastName, setPreviousLastName] = useState(''); 
    const [previousEmail, setPreviousEmail] = useState('');
    const [previousPhoneNumber, setPreviousPhoneNumber] = useState('');
    

    function handleFirstNameChange(e) {
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePhoneNumberChange(e) {
        setPhoneNumber(e.target.value);
    }

    function handleReset() {
        setFirstName('');
        setSubmittedFirstName('');
        setLastName('');
        setSubmittedLastName('');
        setEmail('');
        setSubmittedEmail('');
        setPhoneNumber('');
        setSubmittedPhoneNumber('');
        setPreviousFirstName('');
        setPreviousLastName('');
        setPreviousEmail('');
        setPreviousPhoneNumber('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmittedFirstName(firstName);
        setSubmittedLastName(lastName);
        setSubmittedEmail(email);
        setSubmittedPhoneNumber(phoneNumber);
        setPreviousFirstName(firstName);
        setPreviousLastName(lastName);
        setPreviousEmail(email);
        setPreviousPhoneNumber(phoneNumber);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
    }

    function handleEdit() {
        setFirstName(previousFirstName);
        setLastName(previousLastName);
        setEmail(previousEmail);
        setPhoneNumber(previousPhoneNumber);
    }

    return (
    <div className="PersonalContainer">
        <form onSubmit={handleSubmit}>
            <div class='Personal'>Personal Information</div>
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
            <input
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            />
            <input
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>Reset</button>
            <button type="button" onClick={handleEdit}>Edit</button>
            <h1>{submittedFirstName} {submittedLastName} {submittedEmail} {submittedPhoneNumber}</h1>
        </form>    
    </div>);
}

export default Personal;