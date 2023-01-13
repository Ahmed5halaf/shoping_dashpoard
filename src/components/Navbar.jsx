import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notifiction, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { windowResize } from '@syncfusion/ej2-react-richtexteditor';

const NavButton = ({ title, custemFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button type='button' onClick={custemFunc} style={{ color }} className="relative text-xl rounded-full p-3 hover:bg-light-gray">
      <span style={{ background: dotColor }} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"/>
        {icon}
    </button>
  </TooltipComponent>
);


const Navbar = () => {
  const { activeMenu, setAciveMenu, isClicked, setIsClicked, handleClick, screenSize,
    setscreenSize,currentColor } = useStateContext();


  useEffect(() => {
    const handleResize = () => setscreenSize(window.innerWidth);


    window.addEventListener("resize",handleResize);

    return () => window.removeEventListener("resize", handleResize)

    handleResize()
}, []);

useEffect(() => {
  if(screenSize <= 900){
      setAciveMenu(false)
  }else{
    setAciveMenu(true)
  }
},[screenSize])

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title="Menu" custemFunc={() => setAciveMenu((prevActionMenu) => !prevActionMenu)} color={currentColor} icon={<AiOutlineMenu />} />

      <div className='flex'>
        <NavButton title="Cart" custemFunc={() => handleClick('cart')} color={currentColor} icon={<FiShoppingCart />} />
        <NavButton title="chat" custemFunc={() => handleClick('chat')} dotColor="#03c9d7" color={currentColor} icon={<BsChatLeft />} />
        <NavButton title="Notifiction" custemFunc={() => handleClick('notifiction')} dotColor="#03c9d7" color={currentColor} icon={<RiNotification3Line />} />
        <TooltipComponent content="profile" position="BottomCenter">
          <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg' onClick={() => handleClick("userProfile")}>
            <img src={avatar} className="rounded-full w-8 h-8" alt="" />
            <p>
              <span className='text-gray-400 text-14'>Hello,</span>
              <span className='text-gray-400 font-bold ml-1'>User 1</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14' />
          </div>
        </TooltipComponent>
        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notifiction && <Notifiction />}
        {isClicked.UserProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;