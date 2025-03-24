import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { db } from '../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Toast from '../../components/Toast';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';


const ViewTrip = () => {
    const { tripId } = useParams();
    const [toast, setToast] = useState({ show: false, message: "", type: "info" });
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId && getTripData();
    }, [tripId])

    const getTripData = async () => {
        const docRef = doc(db, "AiTrip", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document", docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            console.log("No such document");
            setToast({
                show: true,
                message: "No Trip Found",
                type: "error",
            });
        }
    }

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            <InfoSection trip={trip} />

            <Hotels trip={trip} />
            
            <PlacesToVisit trip={trip} />

            <Footer trip={trip}/>

            {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}
        </div>
    )
}

export default ViewTrip
