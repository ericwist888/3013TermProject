import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { LoadSpinner } from "./loadSpinner";

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  //await new Promise(resolve => setTimeout(resolve, 3000)); // Add a 3-second delay
  return res.data;
};

export const PostPage = () => {
  //const [posts, setPosts] = useState(null);
  const posts= useLoaderData();
  console.log('Posts initially:', posts);

  if (!posts || posts.length === 0) {
    console.log('Loading, showing spinner...');
    return <LoadSpinner/>; // Show a spinner while the data is loading
  }

  // Render the posts once the data is available
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

