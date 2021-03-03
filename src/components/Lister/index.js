import React, { useEffect, useState } from "react";
import getPosts from "../../services/posts";
import Post from "./Post";
import CreatePost from "./CreatePost";

const Lister = () => {
  const [loading, setLoading] = useState(true);
  const [allPosts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((data) => {
      setLoading(false);
      setPosts(data);
    });
  }, []);

  const onDeletePost = (id) => {
    const posts = allPosts.filter((p) => p.id !== id);
    posts.sort((a, b) => a.id - b.id);
    setPosts(posts);
  };

  const onCreatePost = (post) => {
    const maxId = !allPosts.length ? 0 : Math.max(...allPosts.map((p) => p.id));
    const newPost = {
      id: maxId + 1,
      ...post,
    };
    setPosts([...allPosts, newPost]);
  };

  return loading ? (
    "Loading..."
  ) : (
    <div className="postList">
      <CreatePost onCreate={onCreatePost} />
      {!allPosts.length
        ? "No posts available..."
        : allPosts.map((post) => (
            <Post key={post.id} onDelete={onDeletePost} {...post} />
          ))}
    </div>
  );
};

export default Lister;
