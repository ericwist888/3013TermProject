import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/misc/Layout";
import LoginPage from "./pages/Auth/Login.page";
import Landing from "./pages/Landing/Landing.page";
import NotFound from "./pages/Notfound/NotFound.page";
import CreatePostPage from "./pages/Post/CreatePost.page";
import  { PostPage, postsLoader } from "./pages/Post/Post.page";
import PostDetailsPage, { postDetailsLoader } from "./pages/Post/PostDetails.page";
import EditPostPage from "./pages/Post/EditPostPage";
import ProtectedRoute from "./services/ProtectedRoute";
import useBoundStore from "./store/Store";

export const Router = () => {
  const authCheck = useBoundStore((state) => state.user ? state.user : false);

  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/posts" 
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostPage />
            </ProtectedRoute>
          } 
          loader={postsLoader} 
        />
        <Route 
          path="/posts/create" 
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <CreatePostPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/posts/:id" 
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostDetailsPage />
            </ProtectedRoute>
          } 
          loader={postDetailsLoader} 
        />
        <Route 
          path="/edit-post/:id" 
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <EditPostPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
};
