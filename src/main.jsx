// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { createBrowserRouter } from 'react-router'
// import { RouterProvider } from 'react-router-dom'
// import CreateTrip from './create-trip/index.jsx'
// import Header from './components/Header.jsx'
// import { GoogleOAuthProvider } from '@react-oauth/google'
// import ViewTrip from './view-trip/[tripId]/index.jsx'
// import { BrowserRouter } from 'react-router-dom';

// const router = createBrowserRouter([
//   { path: "/", element: <App /> },
//   { path: "/create-trip", element: <CreateTrip /> },
//   { path: "/view-trip/:tripId", element: <ViewTrip /> },
// ]);

// createRoot(document.getElementById('root')).render(
//   // <StrictMode>
//   <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
//     <Header />
//     <BrowserRouter>
//       <RouterProvider router={router} />
//     </BrowserRouter>
//   </GoogleOAuthProvider>
//   // </StrictMode>,
// )



import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import Header from './components/Header.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]/index.jsx';
import MyTrips from './my-trips/index.jsx';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/view-trip/:tripId" element={<ViewTrip />} />
        <Route path="/my-trips" element={<MyTrips />} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
