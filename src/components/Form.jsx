import React, { useState } from "react";

function FormSection({title, fields}) {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {})
    );

    const [submittedData, setSubmittedData] = useState({});
    const [previousData, setPreviousData] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value}); 
    };

    function handleReset(e) {
        setFormData(fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {}));
        setSubmittedData({});
        setPreviousData({});
    };

    function handleSubmit(e) {
        e.preventDefault();
        setSubmittedData(formData);
        setPreviousData(formData);
        setFormData(fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {}));
    }

    function handleEdit() {
        setFormData(previousData);
    }

    return (
        <div className="FormSectionContainer">
            <form onSubmit={handleSubmit}>
                <div className="FormSectionTitle">{title}</div>
                {fields.map((field) => (
                    <input
                        key={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                    />
                ))}
                <button type="submit">Submit</button>
                <button type="button" onClick={handleReset}>Reset</button>
                <button type="button" onClick={handleEdit}>Edit</button>
                <h1>{Object.values(submittedData).join(' ')}</h1>
            </form>
        </div>
    )
}

export default FormSection;
