import { React, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux-toolkit/Slice/AuthSlice.js"

import { FaEye, FaEyeSlash } from "react-icons/fa";

import Avatar from "../../assets/avatar with man in green shirt and orange hat.png";
import Design from "../../assets/Rectangle 1.svg"
import Boy from "../../assets/Rectangle.png";
import Lamp from "../../assets/chandelier with green round lampshade.png"

const Signup = () => {
  const [visability, setVisability] = useState(false);
  const [confirmpass, setConfirmpass] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { error, loading } = useSelector((state) => state.Auth);
  
  const [username,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('');
  const [conpassword, setConPassword] = useState('');

  const [errorname, setErromName] = useState('');
  const [erroremail, setErromEmail] = useState('');
  const [errorrole, setErromRole] = useState('');
  const [message, setMessage] = useState('');


  const PasswordShowHide = () => {
    setVisability(!visability);
  };
  const PasswordToggle = () => {
    setConfirmpass(!confirmpass);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const spcialchar = new RegExp("(?=.*[!@#$%^&*~])");
    const length = 6;

    if (!username) { setErromName("Plaese enter username"); }
    
    if (!email) { setErromEmail("Plaese enter email"); }
    
    if (!role) { setErromRole("Plaese select role"); }

    if (password.length !== length) {
      setMessage("length is to short min length is 6")
    }
    
    if (!password) {
      setMessage("Plaese enter Password");
    } else if (password !== conpassword) {
      setMessage("Password dose not match");
    } else if (!lower.test(password)) {
      setMessage("At least one lower case latter include");
    } else if (!upper.test(password)) {
      setMessage("Ar least one upper case latter include");
    } else if (!number.test(password)) {
      setMessage("At least one number include");
    } else if (!spcialchar.test(password)) {
      setMessage("At least one spcial character include");
    } else {
      dispatch(signup({ username, email, password, role }, navigate("/")));
    }
  };

      if (error) return <p style={{ color: "red" }}>error: {error}</p>;

  return (
    <>
      <div className="w-full h-full relative overflow-hidden px-8 text-white bg-[#001f54] font-titles">
        <div className="w-1/2"><img src={Avatar} alt="avatar" className="mx-auto mt-2" /></div>
        <div className="w-1/2"> <h2 className=" text-center text-[4.5rem] font-heading">Registration</h2> </div>
        <form className="w-1/2" onSubmit={handelSubmit}>
          
          <div>
          <label className="font-bold">Username</label>
            <input className="w-full p-2 mt-2 border-0 border-b-2 border-b-[#0af] bg-transparent text-white focus:outline-none" type="text" onChange={(e)=>{setUserName(e.target.value)}} placeholder="Enter username" />
            <p className="text-red-400">{errorname}</p>
          </div>
          
          <div>
          <label className="font-bold">Email</label>
          <input className="w-full p-2 mt-2 border-0 border-b-2 border-b-[#0af] bg-transparent text-white focus:outline-none" type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter email" />
          <p className="text-red-400">{erroremail}</p>
          </div>
          
          <label className="font-bold">Password</label>
          <div className="relative">
            <input className="w-full p-2 mt-2 border-0 border-b-2 border-b-[#0af] bg-transparent text-white focus:outline-none" onChange={(e)=>{setPassword(e.target.value)}} type={visability ? "text" : "password"} placeholder="Enter password" />
            <span className=" absolute right-12 top-5 text-bt cursor-pointer">
              {visability ? (<FaEyeSlash onClick={PasswordShowHide} />) : (<FaEye onClick={PasswordShowHide} />)}
            </span>
            <p className="text-red-400">{message}</p>
          </div>
          
          <label className="font-bold">Confirm Password</label>
          <div className="relative">
            <input className="w-full p-2 mt-2 border-0 border-b-2 border-b-[#0af] bg-transparent text-white focus:outline-none" onChange={(e)=>{setConPassword(e.target.value)}} type={confirmpass ? "text" : "password"} placeholder="Enter password" />
            <span className=" absolute right-12 top-5 text-bt cursor-pointer">
              {confirmpass ? (<FaEyeSlash onClick={PasswordToggle} />) : (<FaEye onClick={PasswordToggle} />)}
            </span>
          </div>
          
          <div>
          <label htmlFor="Role" className="font-bold">Role</label>
          <select name="Role" id="Role" onChange={(e)=>{setRole(e.target.value)}} className="w-full bg-transparent mt-2 p-2 font-titles border-b-2 border-b-[#0af] focus:outline-none">
            <option value="Admin" className="bg-transparent text-black font-semibold">Admin</option>
            <option value="Seller" className="bg-transparent text-black font-semibold">Seller</option>
            </select>
            <p className="text-red-400">{errorrole}</p>
          </div>
            
            
          <button type="submit" className=" w-full p-3 mt-6 text-[1.2rem] bg-[#0af] border-0 text-white font-bold rounded-lg cursor-pointer">
            {loading ? "Registering......" :"Registeration" } </button>
            <p className="text-right mt-4"> Click here  <Link to="/login" className="text-white font-bold text-decoration-none"> Login</Link></p>
          </form>
          <img src={Lamp} alt="Lamp" className="w-[120px] h-[180px] absolute top-0 left-[45rem]"/>
          <img src={Boy} alt="Boy Illustration" className="w-[380px] h-[400px] absolute top-32 left-[48rem] z-10"/>
          <img src={Design} alt="bg illustration" className="w-[600px] h-[980px] absolute -top-32 left-[42rem]" />
        {/* <div className="w-1/2 h-full p-8 border-2 border-solid border-yellow-300"></div> */}
        {/* <div className="w-1/2 h-full relative border-2 border-green-400"></div> */}
      </div>
    </>
  );
};

export default Signup;
