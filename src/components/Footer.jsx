import styled from "styled-components";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { IoMdDocument } from "react-icons/io";

export const Footer = () => {
  return (
    <ContactCardWrapper>
      <ContactCard>
        <img
          src="../../images/profile.jpg"
          alt=""
          className="absolute rounded-full h-3/8 w-2/4 right-20 -top-6"
        />
        <div className="mx-auto pt-12">Lim Jitt Hing</div>
        <div className="font-primary mb-4">
          Thank you for visiting my portfolio website. Feel free to get in touch
          with me through the links below.
        </div>
        <div className="flex flex-row mx-auto text-xl justify-between w-1/2 pt-4">
          <a
            href="https://www.github.com/jitthing"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/jitt-hing-lim/"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin />
          </a>
          <a href="www.example.com" target="_blank" rel="noreferrer">
            <IoMdDocument />
          </a>
        </div>
      </ContactCard>
    </ContactCardWrapper>
  );
};

const ContactCardWrapper = styled.div`
  background-color: white;
  height: 50vh;
`;

const ContactCard = styled.div`
  position: relative;
  background-color: rgba(240, 240, 240, 0.8);
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  margin: auto;
  border-radius: 20px;
  height: 35vh;
  width: 15vw;
  justify-content: center;
  items-align: center;
  display: flex;
  flex-direction: column;
`;
