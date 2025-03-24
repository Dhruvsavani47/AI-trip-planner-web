// import React from 'react'
// import PlaceCardItem from './PlaceCardItem'

// const PlacesToVisit = ({ trip }) => {
//     console.log("Data : ", trip)
//     return (
//         <div className=''>
//             <h2 className='text-xl font-bold mt-10'>Places to Visit</h2>

//             <div>
//                 {trip?.tripData?.itinerary?.map((item, index) => (
//                     <div key={index} className=''>
//                         <h2 className='font-medium text-lg'>Day {item.day} : <span className='text-gray-500 font-normal'>{item.theme}</span></h2>

//                         <div className='grid md:grid-cols-2 gap-5'>
//                             {item?.activities?.map((act, idx) => (
//                                 <div key={idx} className='my-3 transition-all cursor-pointer'>
//                                     <h2 className='font-medium text-sm text-[#88BDF2]'>{act.timeToVisit}</h2>

//                                     <PlaceCardItem act={act} />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default PlacesToVisit


import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({ trip }) => {
    return (
        <div className="px-6 mt-10">
            <h2 className="text-2xl font-bold text-gray-800">Places to Visit</h2>

            <div className="mt-6 space-y-8">
                {trip?.tripData?.itinerary?.map((item, index) => (
                    <div key={index} className="bg-gray-200 p-5 rounded-2xl shadow-sm">
                        
                        <h2 className="text-xl font-semibold text-gray-700">
                            Day {item.day}: <span className="text-gray-500 font-normal">{item.theme}</span>
                        </h2>

                        <div className="grid 2xl:grid-cols-2 xl:grid-cols-1 gap-6 mt-4">
                            {item?.activities?.map((act, idx) => (
                                <div key={idx} className="my-3 transition-all cursor-pointer hover:scale-[1.02]">
                                    <h2 className="text-sm font-medium text-[#3a74ae] mb-3">{act.timeToVisit}</h2>
                                    <PlaceCardItem act={act} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit
