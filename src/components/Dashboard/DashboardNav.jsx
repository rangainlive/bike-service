import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

function DashboardNav({ user }) {
  const history = useHistory();
  const logout = () => {
    sessionStorage.removeItem("authenticatedUser");
    history.push({
      pathname: "/",
    });
  };
  return (
    <NavbarContainer>
      <Text>
        Good Morning, <span>{user}</span>
      </Text>
      <InputContainer>
        <Icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </Icon>
        <Input type="text" placeholder="Search for Projects" />
      </InputContainer>
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  height: 5%;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    margin-bottom: 1rem;
  }
`;
const Text = styled.div`
  font-size: 1.6rem;
  color: green;
  span {
    font-size: 1.6rem;
    color: blue;
    font-weight: 600;
    color: #484258;
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    margin-top: 1rem;
    font-size: 1.7rem;
  }
`;
const InputContainer = styled.div`
  display: flex;
`;
const Icon = styled.div`
  height: 3rem;
  width: 3rem;
  background-color: #dce4ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  svg {
    color: #555555;
  }
`;
const Input = styled.input`
  border: none;
  background-color: #dce4ff;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  &:focus {
    border: none;
    outline: none;
  }
`;

export default DashboardNav;
