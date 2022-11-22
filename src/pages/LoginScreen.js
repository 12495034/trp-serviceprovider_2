import React, { useState } from "react"
import NavBarTRP from "../components/NavBarTRP"

export default function LoginScreen() {
  //add some logic to check to login details, if they are incorrect log a message above the login button
  //only a placeholder for now until connection to firebase authentication is setup

  const [formData, setformData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    subscribe: false
  }
  )

  console.log(formData)

  function handleChange(event) {
    // console.log(event.target.type)
    const { name, value, type, checked } = event.target
    setformData(prevState => {
      return {
        ...prevState, [name]: type === "checkbox" ? checked : value
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (formData.password === formData.passwordConfirm) {
      console.log("Passwords Match")
    } else {
      console.log("Passwords do not match")
    }

    if (formData.subscribe) {
      console.log("Thanks for signing up")
    }
  }

  return (
    <>
    {/* This is only here so that other pages can be navigated to until authentication is setup */}
    <NavBarTRP />
    <div className="login-screen">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Management system for Rapid HIV & Syphillus Clinics</h1>
          <img src={require("../images/logo.png")} alt="missing" />
          <input
            type="email"
            placeholder="Email address"
            className="form--input"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="form--input"
            name="password"
            onChange={handleChange}
          />
          <button
            className="form--submit"
          >
            Login
          </button>
        </form>
        {/* Add function return here for incorrect login details message */}
        <h5>No login details?</h5>
        <h5>Sign-up</h5>
      </div>
    </div>
    </>
  )
}
