// import React, { useEffect, useRef, useState } from 'react'
// import Button from './Button'
// import * as Avatar from '@radix-ui/react-avatar';
// import { LuLogOut } from "react-icons/lu";
// import { useNavigate } from 'react-router';

// const Header = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const popoverRef = useRef(null);
//     const navigate = useNavigate();

//     const user = JSON.parse(localStorage.getItem('user'));
//     useEffect(() => {
//         console.log(user);
//     })

//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (popoverRef.current && !popoverRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         }

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem(); // Clear user data
//         navigate('/'); // Redirect to home screen
//         window.location.reload(); // Force page refresh to reset state
//     };

//     return (
//         <div className='p-3 shadow-sm flex justify-between item-center px-5 bg-[#384959]'>
//             <h2 className='text-3xl text-white font-medium'>JetSet<span className='text-[#88BDF2]'>GO</span></h2>

//             <div>
//                 {user ?
//                     <div className='flex items-center gap-5'>
//                         <Button buttonText="Create Trips" />
//                         <Button buttonText="My Trips" />
//                         <Avatar.Root className="rounded-full overflow-hidden bg-gray-300 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
//                             <Avatar.Image
//                                 src={user?.picture}
//                                 alt="User Avatar"
//                                 className="w-11 h-11 rounded-full object-cover"
//                             />
//                         </Avatar.Root>

//                         {isOpen && (
//                             <div className="absolute right-5 top-15 mt-2 w-64 bg-gray-300 border border-gray-300 shadow-lg rounded-lg p-3 z-50 font-medium">
//                                 <h2 className='font-bold mb-4'>{user?.given_name} {user?.family_name}</h2>
//                                 <h2 className='flex gap-3 text-red-800 font-bold cursor-pointer'
//                                     onClick={handleLogout}
//                                 >Log Out <LuLogOut size={"20px"} /></h2>
//                             </div>
//                         )}
//                     </div> :
//                     <Button buttonText="Sign In" />
//                 }
//             </div>
//         </div>
//     )
// }

// export default Header



import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import Avatar from "@mui/material/Avatar";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router';
import Dailog from './Dailog';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef(null);
    const [openDailog, setOpenDailog] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedUser = JSON.parse(localStorage.getItem('user'));
            setUser(updatedUser);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const getUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: "Application/json",
            }
        }).then(response => {
            console.log(response);
            localStorage.setItem('user', JSON.stringify(response.data));
            setOpenDailog(false);
            window.location.reload();
        })
    }

    const login = useGoogleLogin({
        onSuccess: (codeResp) => {
            getUserProfile(codeResp);
        },
        onError: (error) => console.log(error)
    })

    const onClose = () => {
        setOpenDailog(false);
    };

    return (
        <div className='p-3 shadow-sm flex justify-between item-center px-5 bg-[#384959]'>
            <h2 className='text-3xl text-white font-medium'>JetSet<span className='text-[#88BDF2]'>GO</span></h2>

            <div>
                {user ? (
                    <div className='flex items-center gap-5'>
                        <a href='/create-trip'>
                            <Button buttonText="+ Create Trips" />
                        </a>
                        <a href='/my-trips'>
                            <Button buttonText="My Trips" />
                        </a>
                        <Avatar src={user?.picture} className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />


                        {isOpen && (
                            <div className="absolute right-5 top-15 mt-2 w-64 bg-gray-300 border border-gray-300 shadow-lg rounded-lg p-3 z-50 font-medium">
                                <h2 className='font-bold mb-4'>{user?.given_name} {user?.family_name}</h2>
                                <h2 className='flex gap-3 text-red-800 font-bold cursor-pointer'
                                    onClick={handleLogout}
                                >Log Out <LuLogOut size={"20px"} /></h2>
                            </div>
                        )}
                    </div>
                ) : (
                    <button className='text-[#384959] text-md font-bold py-2 px-8 rounded-xl bg-[#BDDDFC] hover:bg-[#88BDF2] cursor-pointer' onClick={() => setOpenDailog(true)}>Sign In</button>
                )}
            </div>

            <Dailog open={openDailog} onClose={onClose} onClick={login} />
        </div>
    );
};

export default Header;
