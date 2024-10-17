import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo-horizontal.png";
import "./myCustom.css";
import axios from "axios";
import { SERVER_URL } from "../../Constant/env";
function Login({ setIsLogin }) {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isSignupForm, setIsSignupForm] = useState(false);
  let [catTree, setCatTree] = useState([]);

  const handleSignupForm = () => {
    setIsLoginForm(false);
    setIsSignupForm(true);
  };

  const handleLoginForm = () => {
    setIsLoginForm(true);
    setIsSignupForm(false);
  };

  const handleIsLogin = async (e) => {
    e.preventDefault();
    // Validate form values
    const formErrors = validateLoginForm();
    setLoginerrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const result = await axios.post(
          `${SERVER_URL}api/users/login`,
          LoginformValues,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (result.status === 200) {
          if (result.data.status === true) {
            //localStorage.setItem("isLogin", true);
            localStorage.setItem("isLogin", true);
            localStorage.setItem(
              "bearToken",
              result.data.userDetails.jwt_token
            );
            localStorage.setItem("userStatus", result.data.userDetails.Status);
            setIsLogin(true);
          } else {
            alert(result.data.message);
          }
        } else {
          alert("Login failed: " + result.data.message);
        }
      } catch (error) {
        console.error("Error during signup:", error);
        alert(
          "Login failed: " + (error.response?.data?.message || error.message)
        );
      }
    }
  };

  useEffect(() => {
    getCategoryTree();
  }, []);
  const getCategoryTree = async () => {
    let result = await axios.get(`${SERVER_URL}api/getAllCatTree`);
    if (result.data.status == true) setCatTree(result.data.Categories);
  };

  /*
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  */
  const handleChange = (e) => {
    const { name, value, type, options } = e.target;

    // Handle multi-select
    if (type === "select-multiple") {
      const selectedValues = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }

      setFormValues({
        ...formValues,
        [name]: selectedValues,
      });
    } else {
      // Handle text inputs or other input types
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginformValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Dynamically update the specific field based on the input's name attribute
    }));
  };

  const [LoginformValues, setLoginformValues] = useState({
    email: "",
    password: "",
  });
  const [Loginerrors, setLoginerrors] = useState({});

  const validateLoginForm = () => {
    let formErrors = {};
    if (!LoginformValues.email) formErrors.email = "Email is required";
    if (!LoginformValues.password) formErrors.password = "Password is required";
    return formErrors;
  };

  const [formValues, setFormValues] = useState({
    username: "",
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    DniNumber: "",
    IsResident: "",
    Education: "",
    ContactNumber: "",
    Address: "",
    City: "",
    Gender: "",
    categoryIds: [],
    DeviceType: "",
    DeviceMac: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!formValues.username) formErrors.username = "User Name is required";
    if (!formValues.email) formErrors.email = "Email is required";
    if (!formValues.password) formErrors.password = "Password is required";
    if (!formValues.FirstName) formErrors.FirstName = "First Name is required";
    if (!formValues.LastName) formErrors.LastName = "Last Name is required";
    if (!formValues.DniNumber) formErrors.DniNumber = "DniNumber is required";
    if (!formValues.IsResident)
      formErrors.IsResident = "Is Resident is required";
    if (!formValues.Education) formErrors.Education = "Education is required";
    if (!formValues.ContactNumber)
      formErrors.ContactNumber = "Contact Number is required";
    if (!formValues.Address) formErrors.Address = "Address is required";
    if (!formValues.City) formErrors.City = "City is required";
    if (!formValues.Gender) formErrors.Gender = "Gender is required";
    if (!formValues.categoryIds.length)
      formErrors.categoryIds = "category is required";
    if (!formValues.DeviceType)
      formErrors.DeviceType = "Device Type is required";
    if (!formValues.DeviceMac) formErrors.DeviceMac = "Device Mac is required";
    return formErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form values
    const formErrors = validateForm();
    setErrors(formErrors);

    // If no errors, send POST request
    if (Object.keys(formErrors).length === 0) {
      try {
        const result = await axios.post(
          `${SERVER_URL}api/users/signup`,
          formValues,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (result.status === 200) {
          if (result.data.status === true) {
            //localStorage.setItem("isLogin", true);
            localStorage.setItem("isLogin", true);
            localStorage.setItem(
              "bearToken",
              result.data.userDetails.jwt_token
            );
            localStorage.setItem("userStatus", result.data.userDetails.Status);
            setIsLogin(true);
          } else {
            alert(result.data.message);
          }
        } else {
          alert("Signup failed: " + result.data.message);
        }
      } catch (error) {
        console.error("Error during signup:", error);
        alert(
          "Signup failed: " + (error.response?.data?.message || error.message)
        );
      }
    }
  };

  return (
    <>
      {isLoginForm && (
        <div className="bm-login">
          <div className="login-box">
            <img className="logo" src={Logo} alt="logo" />

            <div className="heading">
              <h1>Login</h1>
              <p>
                Don't have an account?{" "}
                <button onClick={handleSignupForm}>Sign up</button>
              </p>
            </div>

            <form
              action="#"
              className="login-form"
              autoComplete="off"
              onSubmit={handleIsLogin}
            >
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  value={LoginformValues.email}
                  onChange={handleLoginChange}
                  className={Loginerrors.email ? "ErrorMessage" : ""}
                />
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  value={LoginformValues.password}
                  onChange={handleLoginChange}
                  className={Loginerrors.password ? "ErrorMessage" : ""}
                />
              </div>

              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      {isSignupForm && (
        <div className="bm-login">
          <div className="login-box">
            <img className="logo" src={Logo} alt="logo" />

            <div className="heading">
              <h1>Sign up</h1>
              <p>
                Already have an account?{" "}
                <button onClick={handleLoginForm}>Login</button>
              </p>
            </div>

            <form action="#" className="login-form" onSubmit={handleIsLogin}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="f-name">First Name</label>
                  <input
                    type="text"
                    id="f-name"
                    placeholder="Enter your First Name"
                    name="FirstName"
                    value={formValues.FirstName}
                    onChange={handleChange}
                    className={errors.FirstName ? "ErrorMessage" : ""}
                  />
                </div>
                <div className="field">
                  <label htmlFor="l-name">Last Name</label>
                  <input
                    type="text"
                    id="l-name"
                    placeholder="Enter your Last Name"
                    name="LastName"
                    value={formValues.LastName}
                    onChange={handleChange}
                    className={errors.LastName ? "ErrorMessage" : ""}
                  />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    className={errors.email ? "ErrorMessage" : ""}
                  />
                </div>
                <div className="field">
                  <label htmlFor="ContactNumber">ContactNumber</label>
                  <input
                    type="text"
                    id="ContactNumber"
                    placeholder="Enter your Contact Number"
                    name="ContactNumber"
                    value={formValues.ContactNumber}
                    onChange={handleChange}
                    className={errors.ContactNumber ? "ErrorMessage" : ""}
                  />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="username">User Name</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your User Name"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                    className={errors.username ? "ErrorMessage" : ""}
                  />
                </div>

                <div className="field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    className={errors.password ? "ErrorMessage" : ""}
                  />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="DniNumber">DNI/NIE Number</label>
                  <input
                    type="text"
                    id="DniNumber"
                    placeholder="Enter your DNI/NIE Number"
                    name="DniNumber"
                    value={formValues.DniNumber}
                    onChange={handleChange}
                    className={errors.DniNumber ? "ErrorMessage" : ""}
                  />
                </div>

                <div className="field">
                  <label htmlFor="IsResident">Is Resident</label>
                  <select
                    name="IsResident"
                    value={formValues.IsResident} // This binds the select to state
                    onChange={handleChange}
                    className={errors.IsResident ? "ErrorMessage" : ""} // Corrected class assignment
                  >
                    <option value="">...Please Select...</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="City">City</label>
                  <input
                    type="text"
                    id="City"
                    placeholder="Enter your City"
                    name="City"
                    value={formValues.City}
                    onChange={handleChange}
                    className={errors.City ? "ErrorMessage" : ""}
                  />
                </div>

                <div className="field">
                  <label htmlFor="Gender">Gender</label>
                  <select
                    name="Gender"
                    value={formValues.Gender} // This binds the select to state
                    onChange={handleChange}
                    className={errors.Gender ? "ErrorMessage" : ""}
                  >
                    <option value="">...Please Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="DeviceType">Device Type</label>
                  <select
                    name="DeviceType"
                    value={formValues.DeviceType} // This binds the select to state
                    onChange={handleChange}
                    className={errors.DeviceType ? "ErrorMessage" : ""}
                  >
                    <option value="">...Please Select...</option>
                    <option value="web">Web</option>
                    <option value="ios">Ios</option>
                    <option value="andriod">Andriod</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="DeviceMac">Device Mac</label>
                  <input
                    type="text"
                    id="DeviceMac"
                    placeholder="Enter your DeviceMac"
                    name="DeviceMac"
                    value={formValues.DeviceMac}
                    onChange={handleChange}
                    className={errors.DeviceMac ? "ErrorMessage" : ""}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="Education">Education</label>
                <input
                  type="text"
                  id="Education"
                  placeholder="Enter your Education"
                  name="Education"
                  value={formValues.Education}
                  onChange={handleChange}
                  className={errors.Education ? "ErrorMessage" : ""}
                />
              </div>
              <div className="field">
                <label htmlFor="Address">Address</label>
                <input
                  type="text"
                  id="Address"
                  placeholder="Enter your Address"
                  name="Address"
                  value={formValues.Address}
                  onChange={handleChange}
                  className={errors.Address ? "ErrorMessage" : ""}
                />
              </div>

              <div className="field">
                <label htmlFor="Courses">Select Courses</label>
                <select
                  name="categoryIds"
                  value={formValues.categoryIds} // This binds the select to state
                  onChange={handleChange}
                  className={errors.categoryIds ? "ErrorMessage" : ""}
                  multiple
                >
                  {catTree.map((el, index) => {
                    return (
                      <option key={el._id} value={el._id}>
                        {el.name} - ${el.Price}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button type="submit">Sign up</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
