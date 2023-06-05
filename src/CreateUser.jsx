import { useState } from "react";

export default function CreateUser() {
  // States for registration
  const [givenName, setGivenName] = useState("");
  const [surname, setSurname] = useState("");
  const [userPrincipalName, setUserPrincipalName] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // States for success and error message visibility
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // State for storing the submitted consultant object
  const [consultant, setConsultant] = useState(null);

  // Handling the name change
  const handleGivenName = (e) => {
    setGivenName(
      e.target.value.slice(0, 1).toUpperCase() + e.target.value.slice(1)
    );
    setSubmitted(false);
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
    updateUPN(e.target.value, surname); // Update email based on new first name
  };

  const handleSurname = (e) => {
    setSurname(
      e.target.value.slice(0, 1).toUpperCase() + e.target.value.slice(1)
    );
    setSubmitted(false);
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
    updateUPN(givenName, e.target.value); // Update email based on new surname
  };

  // Function to update the email based on first name and surname
  const updateUPN = (givenName, surname) => {
    const initials =
      givenName.slice(0, 2).toUpperCase() + surname.slice(0, 2).toUpperCase();
    const currentYear = new Date().getFullYear();
    const newUPN = `${initials}${currentYear}@upplandsvasby.se`;
    setUserPrincipalName(newUPN);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (givenName === "" || surname === "" || userPrincipalName === "") {
      setError(true);
      setShowErrorMessage(true);
    } else {
      setSubmitted(true);
      setError(false);
      setShowSuccessMessage(true);

      // Create an object with the submitted values
      const submittedData = {
        givenName: givenName,
        surname: surname,
        userPrincipalName: userPrincipalName,
      };

      setConsultant(submittedData); // Save the submitted object in the consultant state

      console.log(submittedData); // Log the submitted object to the console

      setGivenName(""); // Reset givenName to empty string
      setSurname(""); // Reset surname to empty string
      setUserPrincipalName(""); // Reset email to empty string
    }
  };

  // Showing success message
  const successMessage = () => {
    if (submitted && consultant) {
      return (
        <div className="success">
          <h1>
            Konsultkonto {consultant.givenName + " " + consultant.surname} har
            registrerats!
          </h1>
        </div>
      );
    }
    return null;
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: showErrorMessage ? "" : "none",
        }}
      >
        <h1 className="mt-5">Fyll i alla fält.</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1 className="flex justify-start text-6xl text-gray-800 font-bold">
          Extern konsult
        </h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages my-6">
        {errorMessage()}
        {successMessage()}
      </div>

      <div className="">
        <form className="flex flex-col">
          <div className="flex flex-col max-w-[224px]">
            <label className="label font-semibold flex justify-start text-lg mr-4">
              Förnamn
            </label>
            <input
              onChange={handleGivenName}
              className="input border-2 border-gray-900 rounded-md"
              value={givenName}
              type="text"
            />
          </div>

          <div className="flex flex-col max-w-[224px]">
            <label className="label font-semibold text-lg flex justify-start mr-4">
              Efternamn
            </label>
            <input
              onChange={handleSurname}
              className="input border-2 border-gray-900 rounded-md"
              value={surname}
              type="text"
            />
          </div>

          {/* No email input field in the JSX */}

          <button
            onClick={handleSubmit}
            className="btn bg-green-800 text-lg text-white font-semibold rounded-md px-4 py-1 mt-5 max-w-[124px]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
