import { React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

// import { getAllUsers } from "../redux-toolkit/Slice/usersSlice.js";
import { getAllUsers, RemoveUser } from "../redux-toolkit/Slice/usersSlice.js";

import Banner from "../components/Banner";

const Users = () => {

  // const [orders, setOrders] = useState([]);

  const dispatch = useDispatch();
  const { userslist, loading, error } = useSelector((state) => state.Allusers);

  const deleteUser = (id) => {
    dispatch(RemoveUser(id));
    console.log('delete user id:', id);
  };  
  
    useEffect(() => {
      dispatch(getAllUsers());
    }, [dispatch]);
  
  
  if (loading) return <p>Loading users....</p>
  if (error) return <p style={{color:'red'}}>error: {error}</p>
  
  return (
    <>
      <Banner page={"Users"} />
      <section className="w-full">
        <>
          {userslist.map((user, i) => {
            const id = user._id;
            return (
              <ul key={i} className=" flex gap-3">
                <li>{i}</li>
                <li>{user._id}</li>
                <li>
                  {" "}
                  {user.Firstname} {user.Lastname}
                </li>
                <li>{user.number}</li>
                <li>{user.address[0].Country}</li>
                <li>{user.carts.length}</li>
                <li>{user.gender}</li>
                <li>{user.email}</li>
                <li className="cursor-pointer"> <button type="button" onClick={()=>deleteUser(id)}> Delete </button> </li>
              </ul>
            );
          }
          )}
        </>
        <div className="px-4">
          <ul className="h-12 bg-yellow-100 grid grid-cols-8 items-center border-b-2 border-solid border-gray-500">
            <li className=" bg-slate-300 w-32 h-10 text-center">user id</li>
            <li className=" bg-slate-300 w-32 h-10 text-center">Name</li>
            <li className=" bg-slate-300 w-32 h-10 text-center">Contact</li>
            <li className=" bg-slate-300 w-32 h-10 text-center">Country</li>
            <li className=" bg-slate-300 w-32 h-10 text-center">Orders date</li>
            <li className=" bg-slate-300 w-32 h-10 text-center">Order quantity</li>
            <li className=" bg-slate-300 w-32 h-10 text-center">Total Amount</li>
            <li className=" bg-slate-300 w-32 h-10 text-center">Actions</li>
          </ul>
          <ul className=" h-12 grid grid-cols-8 items-center border-b-2 border-solid border-white hover:border-gray-300">
            <li className=" w-32 h-10 text-center">1</li>
            <li className=" w-32 h-10 text-center">Jhon</li>
            <li className=" w-32 h-10 text-center">123-234-2125</li>
            <li className=" w-32 h-10 text-center">USA</li>
            <li className=" w-32 h-10 text-center">12-12-2023</li>
            <li className=" w-32 h-10 text-center">3</li>
            <li className=" w-32 h-10 text-center">1789</li>
            <li className=" w-32 h-10 text-center">
            <button>Delete</button>
            </li>
          </ul>
          <ul className=" h-12 grid grid-cols-8 items-center border-b border-solid border-gray-300">
            <li>USA</li>
            <li>Jhon</li>
            <li>123-234-2125</li>
            <li>10</li>
            <li>12-12-2023</li>
            <li>1789</li>
            <li>
              <button>Delete</button>
            </li>
          </ul>
          <ul className=" h-12 grid grid-cols-8 items-center border-b border-solid border-gray-300">
            <li>USA</li>
            <li>Jhon</li>
            <li>123-234-2125</li>
            <li>10</li>
            <li>12-12-2023</li>
            <li>1789</li>
            <li>
              <button>Delete</button>
            </li>
          </ul>
          <ul className=" h-12 grid grid-cols-8 items-center border-b border-solid border-gray-300">
            <li>USA</li>
            <li>Jhon</li>
            <li>123-234-2125</li>
            <li>10</li>
            <li>12-12-2023</li>
            <li>1789</li>
            <li>
              <button>Delete</button>
            </li>
          </ul>
          <ul className=" h-12 grid grid-cols-8 items-center border-b border-solid border-gray-300">
            <li>USA</li>
            <li>Jhon</li>
            <li>123-234-2125</li>
            <li>10</li>
            <li>12-12-2023</li>
            <li>1789</li>
            <li>
              <button>Delete</button>
            </li>
          </ul>
          <ul className=" h-12 grid grid-cols-8 items-center border-b border-solid border-gray-300">
            <li>USA</li>
            <li>Jhon</li>
            <li>123-234-2125</li>
            <li>10</li>
            <li>12-12-2023</li>
            <li>1789</li>
            <li>
              <button>Delete</button>
            </li>
          </ul>
          <ul className=" h-12 grid grid-cols-8 items-center border-b border-solid border-gray-300">
            <li>USA</li>
            <li>Jhon</li>
            <li>123-234-2125</li>
            <li>10</li>
            <li>12-12-2023</li>
            <li>1789</li>
            <li>
              <button>Delete</button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Users;
