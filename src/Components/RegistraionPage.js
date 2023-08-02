import React, { useState } from "react";

const cities = [
  "Jerusalem",
  "Tel Aviv",
  "Holon",
  "Eilat",
  "Rishon Letzion",
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    city: cities[0],
    address: "",
    cellularPhone: "",
    landline: "",
    infected: false,
    zipCode: "",
    previousConditions: "",
  });

  const [confirmationMessage, setConfirmationMessage] = useState('');


  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handlePreviousConditionsChange = (event) => {
    const { value, checked } = event.target;
    let updatedConditions = formData.previousConditions.slice();

    if (checked) {
      updatedConditions += (value + ", ");
    }

    setFormData((prevData) => ({
      ...prevData,
      previousConditions: updatedConditions,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Sending form data to the specified URL (You need to replace 'YOUR_API_URL' with your actual API endpoint)
    const apiUrl = "http://localhost:8080/user";
    console.log(JSON.stringify(formData));
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setConfirmationMessage('Form submitted successfully!');
        setFormData({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          city: cities[0],
          address: "",
          cellularPhone: "",
          landline: "",
          infected: false,
          zipCode: "",
          previousConditions: "",
        });
        console.log("Form data submitted successfully:", data);
      
        // You can handle the response from the server here, or perform any other actions as needed.
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      });
  };

  return (
    <div className="registration-form-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          City:
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Zip Code (optional):
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Landline:
          <input
            type="tel"
            name="landline"
            value={formData.landline}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Cellular Phone:
          <input
            type="tel"
            name="cellularPhone"
            value={formData.cellularPhone}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Have you been infected by COVID-19 before?
          <input
            type="checkbox"
            name="covidInfected"
            checked={formData.covidInfected}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Previous Conditions:
          <br />
          <input
            type="checkbox"
            name="previousConditions"
            value="Diabetes"
            checked={formData.previousConditions.includes("Diabetes")}
            onChange={handlePreviousConditionsChange}
          />
          Diabetes
          <br />
          <input
            type="checkbox"
            name="previousConditions"
            value="Cardio-Vascular problems"
            checked={formData.previousConditions.includes(
              "Cardio-Vascular problems"
            )}
            onChange={handlePreviousConditionsChange}
          />
          Cardio-Vascular problems
          <br />
          <input
            type="checkbox"
            name="previousConditions"
            value="Allergies"
            checked={formData.previousConditions.includes("Allergies")}
            onChange={handlePreviousConditionsChange}
          />
          Allergies
          <br />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
};

export default RegistrationForm;
