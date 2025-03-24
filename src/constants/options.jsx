export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveles in exploration',
        icon: '✈',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '👫',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people: '3 to 6 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '🍾',
        people: '3 to 10 People'
    }
]


export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸'
    },
]

export const AI_PROMPT = "Generate Travel Plan for Location : {location} , for {totalDays} Days for {Traveler} with {Budget} budget , Give me a Hotels option list with HotelName, Hotel address , Price, Hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place image url, Geo coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format. Please provide all value if you not have perfect value then generate random value and itinerary show as an array. generate Image url generate of real world photo and tripDetail contain currency of location"