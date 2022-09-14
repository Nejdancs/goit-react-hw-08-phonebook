import styled from 'styled-components';
import { RiUserFill } from 'react-icons/ri';

export const ContactWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media screen and (max-width: 768px) {
    gap: 12px;
  }

  @media screen and (max-width: 480px) {
    gap: 7px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const Contact = styled.p`
  display: flex;
  /* flex-wrap: wrap; */
  padding: 7px 15px;
  gap: 5px;
  align-items: center;
  font-size: 20px;
  font-weight: 500;

  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

export const IconUser = styled(RiUserFill)`
  padding: 3px;
  border: 1px solid #4287f5;
  border-radius: 50%;
  margin-right: 10px;
  color: #4287f5;
`;

export const Button = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #242323;
  font-size: 24px;
  border: none;
  /* border-radius: 50%;
  border: 1px solid #242323; */
  background-color: transparent;

  transition: color 100ms linear;
  cursor: pointer;

  :hover {
    color: red;
    /* border: 1px solid #fff; */
  }
`;

export const ButtonEdit = styled(Button)`
  :hover {
    color: #4287f5;
  }
`;
