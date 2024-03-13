import {
   TextInput,
   PasswordInput,
   Checkbox,
   Anchor,
   Paper,
   Title,
   Text,
   Container,
   Group,
   Button,
 } from '@mantine/core';
 import classes from './AuthenticationTitle.module.css';
 
 export function AuthenticationTitle({ onLogin }) {

   const handleSubmit = (event) => {
     event.preventDefault(); //prevent reloading of the page
     const email = event.target.elements[0].value; // Adjust based on actual elements
     const password = event.target.elements[1].value; // Adjust based on actual elements
     onLogin(email, password);
   };
 
   return (
     <Container size={420} my={40}>
       <form onSubmit={handleSubmit}>
         <Title className={classes.title} align="center">Welcome back!</Title>
         <TextInput label="Email" placeholder="you@mantine.dev" required name="email" />
         <PasswordInput label="Password" placeholder="Your password" required mt="md" name="password" />
         <Group position="apart" mt="lg">
           <Checkbox label="Remember me" />
           <Anchor size="sm">Forgot password?</Anchor>
         </Group>
         <Button type="submit" fullWidth mt="xl">Sign in</Button>
       </form>
     </Container>
   );
 }