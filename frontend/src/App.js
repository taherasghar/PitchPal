import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Login from "./features/auth/Login";
import Layout from "./components/Layout";
import Stadiums from "./pages/StadiumsListPage/Stadiums";
import Error from "./pages/ErrorPage/Error";
import Register from "./features/auth/Register";
import Host from "./pages/HostPage/Host";
import Unauthorized from "./components/Unauthorized";
import UsersList from "./pages/AdminPage/components/UsersList";
import StadiumsList from "./pages/AdminPage/components/StadiumsList";
import FormsList from "./pages/AdminPage/components/FormsList";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import DashboardHome from "./pages/AdminPage/DashboardHome";
import DashboardLayout from "./pages/AdminPage/components/DashboardLayout";
import UserProfile from "./pages/UserProfile/UserProfile";
import AddStadium from "./pages/AdminPage/components/AddStadium";
import StadiumPage from "./pages/StadiumPage/StadiumPage";
import UserActiveBooking from "./pages/UserActiveBookingsPage/UserActiveBooking";
import Explore from "./pages/ExplorePage/Explore";
import Checkout from "./pages/CheckoutPage/Checkout";
import BookingsList from "./pages/AdminPage/components/BookingsList";

const ROLES = {
  user: "user",
  admin: "admin",
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          {" "}
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="host-a-pitch" element={<Host />} />
          <Route path="stadiums" element={<Stadiums />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="stadiums/:id" element={<StadiumPage />} />
          <Route
            element={<RequireAuth allowedRole={[ROLES.user, ROLES.admin]} />}
          >
            {" "}
            <Route path="checkout" element={<Checkout />} />
            <Route path="bookings" element={<UserActiveBooking />} />
            <Route path="profile/*" element={<UserProfile />} />
          </Route>
        </Route>
      </Route>
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRole={[ROLES.admin]} />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="users" element={<UsersList />} />
            <Route path="stadiums" element={<StadiumsList />} />
            <Route path="bookings" element={<BookingsList />} />
            <Route path="forms" element={<FormsList />} />
            <Route path="add-stadium" element={<AddStadium />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
