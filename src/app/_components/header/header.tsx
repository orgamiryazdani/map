import { Textbox } from "../textbox";

const Header = () => {
    return ( 
        <header className="col-start-2 col-end-13 row-start-1 row-end-2 flex items-center justify-between pl-6">
            <Textbox className="w-2/6 h-10 dark:border-base-content" placeholder=" 🔎 جستجو"/>
        </header>
     );
}
 
export default Header;