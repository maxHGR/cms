import Image from "next/image"
import Select from "react-select"
import logo from "./../../assets/logo/ether-clothing-favicon-white.png"


const Navbar = () => {
  return (
    <div className="flex justify-around items-center w-full bg-[#F7D65A] py-1">
    <Image src={logo} height={50} width={50} alt="buether logo" />
    <h1 className="tracking-[0.3rem] text-xl">Buether CMS</h1>
    <p>login</p>
    </div>
  )
}

export default Navbar 