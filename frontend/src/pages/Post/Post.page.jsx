import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
//import { useLoaderData } from "react-router-dom";
import { LoadSpinner } from "./loadSpinner";
import { defer } from 'react-router-dom'
import { useEffect, useState } from "react";

export const postsLoader = async () => {
  return defer({
    posts: axios.get(`${DOMAIN}/api/posts`).then(response => response.data)
  });
};

export const PostPage = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios.get(`${DOMAIN}/api/posts`).then(response => {
      console.log('Direct API call data:', response.data);
      setPosts(response.data);
    });
  }, []);

  if (!posts) {
    return (
      <Container>
        <LoadSpinner />
      </Container>
    );
  }

  return (
    <Container>
      <SimpleGrid cols={3}>
        {posts.map((post) => (
          <ArticleCardImage key={post.id} {...post} />
        ))}
      </SimpleGrid>
    </Container>
  );
};