import { useState } from "react";

export default function CreateUser() {
  // States for registration
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // States for success and error message visibility
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // State for storing the submitted consultant object
  const [consultant, setConsultant] = useState(null);

  // Handling the name change
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
  };

  const handleSurName = (e) => {
    setSurName(e.target.value);
    setSubmitted(false);
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName === "" || surName === "" || email === "") {
      setError(true);
      setShowErrorMessage(true);
    } else {
      setSubmitted(true);
      setError(false);
      setShowSuccessMessage(true);

      // Create an object with the submitted values
      const submittedData = {
        firstName: firstName,
        surName: surName,
        email: email,
      };

      setConsultant(submittedData); // Save the submitted object in the consultant state

      console.log(submittedData); // Log the submitted object to the console

      setFirstName(""); // Reset firstName to empty string
      setSurName(""); // Reset surName to empty string
      setEmail(""); // Reset email to empty string
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: showSuccessMessage ? "" : "none",
        }}
      >
        <h1>Konsultkonto {firstName + " " + surName} har registrerats!</h1>
      </div>
    );
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
              onChange={handleFirstName}
              className="input border-2 border-gray-900 rounded-md"
              value={firstName}
              type="text"
            />
          </div>

          <div className="flex flex-col max-w-[224px]">
            <label className="label font-semibold text-lg flex justify-start mr-4">
              Efternamn
            </label>
            <input
              onChange={handleSurName}
              className="input border-2 border-gray-900 rounded-md"
              value={surName}
              type="text"
            />
          </div>

          <div className="flex flex-col max-w-[224px]">
            <label className="label font-semibold text-lg flex justify-start mr-4">
              Email
            </label>
            <input
              onChange={handleEmail}
              className="input border-2 border-gray-900 rounded-md"
              value={email}
              type="email"
            />
          </div>
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
