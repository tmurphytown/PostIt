import React from 'react';
import './App.css'
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import { UserProvider } from './contexts/UserProvider.jsx';
import {PostProvider} from "./contexts/PostProvider.jsx";
import NewPost from "./components/NewPost.jsx";
import EditPost from "./components/EditPost.jsx";
import PostFeed from "./components/PostFeed.jsx";
import UserPage from "./components/UserPage.jsx";


function App() {

  return (
    <div className="App">
            <UserProvider>
                <PostProvider>
                    <div>
                        <BrowserRouter>
                            <nav className="bg-[#FD358E] p-6 flex items-center gap-3">
                                <Link to="/posts">
                                    <img className="w-20"  src='/Post-It-logos/Post-It-1.png'  />
                                </Link>
                                <Link to="/signUp" className="text-white">Sign Up</Link>
                                <span className="text-white"> | </span>
                                <Link className="justify-end text text-white" to="/signIn">Sign In</Link>
                                <hr></hr>
                            </nav>
                            <Routes>
                                <Route path="/" element={<SignIn />} />
                                <Route path="/signIn" element={<SignIn />} />
                                <Route path="/signUp" element={<SignUp />} />
                                <Route path="/posts/new" element={<NewPost />} />
                                <Route path="/posts/:id" element={<EditPost/>} />
                                <Route path="/posts" element={<PostFeed />} />
                                <Route path="/users/:id" element={<UserPage/>} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </PostProvider>
            </UserProvider>
        </div>
    );
}

export default App;
