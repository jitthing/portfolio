import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { IoMdDocument } from "react-icons/io";

export const About = () => {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="relative w-full group max-w-md min-w-0 mx-auto mb-6 break-words bg-white shadow-2xl md:max-w-sm rounded-2xl">
        <div className="pb-6 shadow-2xl">
          <div className="flex flex-wrap justify-center">
            <div className="flex justify-center w-full">
              <img
                src="../images/profile.jpg"
                alt="Portrait About"
                className="border-white rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[150px]"
              />
            </div>
          </div>

          <div className="mt-20 text-center items-center">
            <h3 className="mt-4 mb-1 text-2xl font-bold leading-normal text-black">
              Lim Jitt Hing
            </h3>
            <div className="divider-card mt-5 mx-auto"></div>
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-6">
                <p className="mb-4 font-light leading-relaxed text-gray-600">
                  Thank you for visiting my portfolio website. Feel free to get
                  in touch with me through the links below.
                </p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
