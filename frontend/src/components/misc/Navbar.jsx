import React from "react";
import classes from "./Navbar.module.css";
import { Container, Group, Burger, Drawer, Stack } from "@mantine/core";
import useLinks from "./useLinks";
import { DrawerContext } from "../../Contexts/drawerContext";
import SVGComponent from "./SVGComponent";

const Navbar = () => {
  const { opened, toggle } = React.useContext(DrawerContext);
  const [items] = useLinks();

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <SVGComponent />
        <Group gap={5} visibleFrom="xs">
          {items.map((item, index) => (
            // Assuming you can't add keys in useLinks, add them here
            // Clone the item to add a key if it's JSX; otherwise, render directly with a key
            React.isValidElement(item) ? React.cloneElement(item, { key: index }) : <div key={index}>{item}</div>
          ))}
        </Group>
        <Burger hiddenFrom="xs" opened={opened} onClick={toggle} />
        <Drawer
          withCloseButton={true}
          opened={opened}
          size="100%"
          onClose={toggle}
        >
          <Stack>
            {items.map((item, index) => (
              // Apply the same logic inside the Drawer
              React.isValidElement(item) ? React.cloneElement(item, { key: index }) : <div key={index}>{item}</div>
            ))}
          </Stack>
        </Drawer>
      </Container>
    </header>
  );
};

export default Navbar;
