import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function Navbar() {
  const { userStore } = useStore();
  const { user, logout } = userStore;

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img src="/assets/logo.png" alt="logo" />
          Slike
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" exact name="Activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            exact
            positive
            content="Create activity"
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Image
            src={user?.image || "/assets/user.png"}
            avatar
            spaced="right"
          ></Image>
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/${user?.username}`}
                text="My profile"
                icon="user"
              />
              <Dropdown.Item onClick={logout} text="Logout" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
});
