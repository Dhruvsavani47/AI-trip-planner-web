import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../services/firebaseConfig";
import UserTripCardItem from './components/UserTripCardItem';

const MyTrips = () => {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(!user){
        navigate('/');
        return;
    }
    
    const q = query(collection(db, 'AiTrip'), where("userEmail", "==",  user?.email));

    const res = await getDocs(q);
    setUserTrips([]); 
    res.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prevVal => [...prevVal, doc.data()]);
    });
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-90 px-5 mt-10 mb-20">
      <h2 className='font-bold text-3xl'>My Trips</h2>

      <div className='grid mt-10  grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5'>
        {userTrips.length > 0 ? userTrips.map((trip, index) =>(
            <UserTripCardItem trip={trip} key={index}/>
        )) :
            [1,2,3,4,5,6].map((trip, index) =>(
                <div key={index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'> 

                </div>
            ))
        }
      </div>
    </div>
  )
}

export default MyTrips
