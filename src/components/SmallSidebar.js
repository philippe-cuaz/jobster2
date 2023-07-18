import { FaTimes } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/SmallSidebar';
//import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/user/UserSlice';
//import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';
//import links from '../utils/links';
//import { NavLink } from 'react-router-dom';



const SmallSidebar = () => {
  const {isSidebarOpen} = useSelector((store)=>store.user);
  const dispatch = useDispatch();

  const toggle = ()=>{
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
    <div className={isSidebarOpen?'sidebar-container show-sidebar':'sidebar-container'}>
    <div className='content'>
    <button className='close-bnt' onClick={toggle}>
      <FaTimes/>
    </button>
    <header>
      <Logo/>
    </header>
   <NavLinks toggleSidebar={toggle}/>
    </div>
    </div>
    </Wrapper>
    
  )
}
export default SmallSidebar