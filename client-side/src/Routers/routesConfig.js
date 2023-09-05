import { Home, Post, Profile, EditProfile, EditTweet, Login, Register, Explore } from "../pages";

export const routes = [
  { path: "/", element: <Home />, isPrivated: true },
  { path: "/explore", element: <Explore />, isPrivated: true },
  { path: "/login", element: <Login />, isPrivated: false },
  { path: "/register", element: <Register />, isPrivated: false },
  { path: "/tweet/:id", element: <Post />, isPrivated: true },
  { path: "/user_profile/:userId", element: <Profile />, isPrivated: true },
  { path: "/user_profile/update/:userId", element: <EditProfile />, isPrivated: true },
  { path: "/tweet/update/:tweetId", element: <EditTweet />, isPrivated: true },


];