import React, { useState } from "react";
import "./HomePage.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import AddNodeModal from "../AddNodeModal/AddNodeModal";
import { useSelector } from "react-redux";
import SVG from "../SVG/SVG";

export default function HomePage() {
  const [addUserOpen, setAddUserOpen] = useState(false);
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  const openAddUser = () => {
    setAddUserOpen(true);
  };

  const closeAddUser = () => {
    setAddUserOpen(false);
  };

  const svgPathData = [
    "M8.67188 6.75C7.61045 6.75 6.75 7.61045 6.75 8.67188V19.0781C6.75 20.1395 7.61045 21 8.67188 21H19.0781C20.1395 21 21 20.1395 21 19.0781V8.67188C21 7.61045 20.1395 6.75 19.0781 6.75H8.67188ZM5.25 8.67188C5.25 6.78203 6.78203 5.25 8.67188 5.25H19.0781C20.968 5.25 22.5 6.78203 22.5 8.67188V19.0781C22.5 20.968 20.968 22.5 19.0781 22.5H8.67188C6.78203 22.5 5.25 20.968 5.25 19.0781V8.67188Z",
    "M5.24778 1.5L5.25 1.5H15.375L15.3771 1.5C16.2709 1.50255 17.1273 1.85872 17.7593 2.4907C18.3913 3.12268 18.7475 3.97911 18.75 4.87287C18.75 4.87879 18.75 4.8847 18.7498 4.89062L18.7264 6.01562C18.7178 6.42975 18.3751 6.75846 17.9609 6.74984C17.5468 6.74121 17.2181 6.3985 17.2267 5.98438L17.25 4.86902C17.2464 4.37454 17.0484 3.90117 16.6986 3.55136C16.3471 3.19987 15.8709 3.00167 15.3738 3H5.25119C4.65478 3.00203 4.08335 3.23986 3.66161 3.66161C3.23986 4.08335 3.00203 4.65478 3 5.25119V15.3738C3.00167 15.8709 3.19987 16.3471 3.55136 16.6986C3.90287 17.0501 4.37913 17.2483 4.87621 17.25H6C6.41421 17.25 6.75 17.5858 6.75 18C6.75 18.4142 6.41421 18.75 6 18.75H4.875L4.87287 18.75C3.97911 18.7475 3.12268 18.3913 2.4907 17.7593C1.85872 17.1273 1.50255 16.2709 1.5 15.3771L1.5 15.375V5.25L1.5 5.24778C1.50294 4.25471 1.89874 3.30315 2.60094 2.60094C3.30315 1.89874 4.25471 1.50294 5.24778 1.5Z",
    "M13.875 9.375C14.2892 9.375 14.625 9.71079 14.625 10.125V17.625C14.625 18.0392 14.2892 18.375 13.875 18.375C13.4608 18.375 13.125 18.0392 13.125 17.625V10.125C13.125 9.71079 13.4608 9.375 13.875 9.375Z",
    "M9.375 13.875C9.375 13.4608 9.71079 13.125 10.125 13.125H17.625C18.0392 13.125 18.375 13.4608 18.375 13.875C18.375 14.2892 18.0392 14.625 17.625 14.625H10.125C9.71079 14.625 9.375 14.2892 9.375 13.875Z",
  ];

  <button className="mr-4 text-2xl" onClick={openAddUser}>

                <SVG
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  pathData={svgPathData}
                  fill="#CF6F5A"
                />
            </button>

  return (
    <>
      <div className="App flex flex-col h-screen">
        <div className='header-container flex items-center '>
          <MdChevronLeft size={25} className='ml-2' />
          {/* this flex-grow div is tailwind way to spread out the back and add buttons*/}
          <div className="flex-grow"></div>
          <button className="mr-4 text-2xl" onClick={openAddUser}>
                 <SVG
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  pathData={svgPathData}
                  fill="#CF6F5A"
                />
            </button>
        </div>



        <div className='content-container flex-grow'>
          <div className='communities-container mt-4'>
            <h2>Communities</h2>
            <h4>View your nodes</h4>
            <div className='relative flex items-center'>
              {/* useHistory back button */}
              <MdChevronLeft size={35} />
              <div id='slider' className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth'>
                {/* this will map links to the nodes instead */}
                {data.map(item => (
                  <div key={item.id} className={item.className}></div>
                ))}
              </div>
              <MdChevronRight size={35} />
            </div>
          </div>

          <div className='featured-container mt-4'>
            <h2>Featured</h2>
            <h4>View community nodes</h4>
            <div className='featured-buttons ml-8 mt-2'>
              <button className='underline mr-4'>Trending</button>
              <button className='underline mr-4'>Latest</button>
              <button className='underline mr-4'>Popular</button>
            </div>
            <div className='featured-nodes-homepage flex flex-col items-center'>
              <div className='featured-top'>

              </div>
              <div className='featured-bottom'>

              </div>
            </div>
          </div>
        </div>
        <AddNodeModal addUserOpen={addUserOpen} closeAddUser={closeAddUser} />
      </div>
    </>
  );
}
