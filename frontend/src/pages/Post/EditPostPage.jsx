import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useParams, useNavigate } from 'react-router-dom';
import { TextInput, Button, Group, Box } from '@mantine/core';
import axios from 'axios';
import DOMAIN from '../../services/endpoint';
import styles from './EditPostPage.module.css';
import { Container } from '@mantine/core';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: '',
      category: '',
      image: '',
      content: '',
    },
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/posts/${id}`);
        if (response.data) {
          form.setValues({
            title: response.data.title,
            category: response.data.category,
            image: response.data.image,
            content: response.data.content,
          });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await axios.put(`${DOMAIN}/api/posts/${id}`, values);
      navigate('/posts');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <Container className={styles.container}>
      <div className={styles.leftSection}>
        <Box mx="auto">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Title"
              {...form.getInputProps('title')}
              className={styles.inputField}
            />
            <TextInput
              label="Category"
              {...form.getInputProps('category')}
              className={styles.inputField}
            />
            <TextInput
              label="Image URL"
              {...form.getInputProps('image')}
              className={styles.inputField}
            />
            <TextInput
              label="Content"
              {...form.getInputProps('content')}
              className={styles.inputField}
            />
            <Group position="right" mt="md">
              <Button type="submit">Update</Button>
            </Group>
          </form>
        </Box>
      </div>
      <div className={styles.rightSection}>
        <img src={form.values.image} alt="Post" className={styles.image} />
      </div>
    </Container>
  );
}

export default EditPostPage;
