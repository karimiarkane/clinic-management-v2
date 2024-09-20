import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";


const Sidebar = ({navigationItem}) => {

    const navigation = navigationItem

  

    return (
        <>
            <nav
                // className="sm:w-80  border-r-3   bg-white  flex justify-center "
                className="sm:w-80 border-r-4 border-[#1e71b8] bg-[#1d3e8e] flex justify-center"                >
                <div className="flex flex-col h-full  w-full  pt-7 ">
                    <div className='flex justify-center w-full'>
                  <FontAwesomeIcon  size="9x"
                //    color="blue" 
                color="#edffec"
                   icon={faStethoscope} />

                     
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto mt-10" >
                        <ul 
                        // className=" text-sm font-medium flex-1"
                        className="w-full"
                        >
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx} 
                                    // className="border-2 border-solid flex justify-center items-center "
                                    className="border-b-2 border-[#1e71b8]"                                    >
                                        <Link href={item.href}
className="flex items-center w-full h-full justify-center gap-x-2 text-[#edffec] p-5 rounded-lg hover:bg-[#3abff0] active:bg-[#82388c] duration-150"                                       //  className="flex items-center w-full h-full justify-center gap-x-2 text-gray-600 p-5 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                                         >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>         
                    </div >
                </div>
            </nav>
        </>
    );
};

export default Sidebar;