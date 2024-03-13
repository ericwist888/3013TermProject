import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Image, Button, Group } from '@mantine/core';
import styles from './PostDetails.page.module.css';
import axios from 'axios';
import DOMAIN from '../../services/endpoint';
import useBoundStore from '../../store/Store'; // Import your state management hook.

export const postDetailsLoader = async ({ params }) => {
  const response = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return response.data;
};

function PostDetailsPage() {
  const post = useLoaderData();
  const navigate = useNavigate();
  const [author, setAuthor] = useState('');
  const user = useBoundStore((state) => state.user); // Assuming this retrieves the current user.

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/users/${post.userId}`);
        setAuthor(response.data.email.split('@')[0]);
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    };

    if (post.userId) {
      fetchAuthor();
    }
  }, [post.userId]);

  const handleEdit = () => {
    navigate(`/edit-post/${post.id}`);
  };

  const handleBack = () => {
    navigate('/posts');
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Container className={styles.container}>
      <div className={styles.textSection}>
        {author && <Title order={4}>Author: {author}</Title>}
        <Title order={1}>{post.title}</Title>
        <Text>{post.category}</Text>
        <Text>{post.content}</Text>

        {/* Show Edit button only if the logged-in user is the author */}
        {user && user.id === post.userId && (
          <Button onClick={handleEdit} mt="md">Edit</Button>
        )}

        <Group position="right" mt="md">
          <Button onClick={handleBack}>Back to Posts</Button>
        </Group>
      </div>
      <div className={styles.imageSection}>
        <Image src={post.image} alt={post.title} className={styles.image} />
      </div>
    </Container>
  );
}

export default PostDetailsPage;
