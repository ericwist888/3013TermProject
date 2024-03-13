import { Container } from "@mantine/core";
import Turtle from "../../components/misc/Turtle";
import { LoadSpinner } from "../Post/loadSpinner";

const Landing = () => {
  return (
    <Container>
      <h1>make photo collections blossom in time</h1>
      <p>
        This app is a platform on which we can share our nature photography. 
      </p>
      <div>
      <Turtle width={510} height={450} />
      <img width ="70%" src="https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="niagra image" /><br /> 
      {/* <hr style={{height: '5px', backgroundColor: 'gray' }}/> */}
      </div>
    </Container>
  );
};

export default Landing;
