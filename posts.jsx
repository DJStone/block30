import { useState, useEffect } from "react";
import { getPosts } from "../API";
import Register from "./register";
import { registerUser } from "../API";

export default function UserPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function retrievePosts() {
      const response = await getPosts();
      setPosts(response);

      const customId = "custom-id-yes";
      toast("Successfully logged in!", {
        toastId: customId,
      });
    }
    retrievePosts();
  }, []);

  return (
    <div className="posts">
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post._id}>
            <ul className="posts">
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <li className = "liststyle">Price: {post.price}</li>
              <li className = "liststyle">Seller: {post.author.username}</li>
              <li className = "liststyle">Location: {post.location}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}