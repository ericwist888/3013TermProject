import { Loader } from '@mantine/core';

export function LoadSpinner() {
   return (
      <>
         <p>loading . . . </p>
         <Loader color="orange" size="lg" />
      </>
      
   );
}