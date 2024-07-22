import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";


const Sidebar = ({navigationItem}) => {

    const navigation = navigationItem

  

    return (
        <>
            <nav
                className="sm:w-80  border-r-3   bg-white  flex justify-center "
                >
                <div className="flex flex-col h-full  w-full  pt-7 ">
                    <div className='flex justify-center w-full'>
                  <FontAwesomeIcon  size="9x" color="blue" icon={faStethoscope} />

                     
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto mt-10" >
                        <ul className=" text-sm font-medium flex-1">
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx} className="border-2 border-solid flex justify-center items-center ">
                                        <Link href={item.href} className="flex items-center w-full h-full justify-center gap-x-2 text-gray-600 p-5 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
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