import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { combineClasses } from "../../utils/utils";
import LinkTo from "../LinkTo";
import { iNavLink } from "../../shared/interfaces";

interface INavDropdown {
  item: iNavLink;
  floating?: boolean;
  onItemClick?: () => void;
}

// 子選單項目元件
const SubMenuItem = ({ 
  child, 
  onItemClick,
  floating = true
}: { 
  child: iNavLink; 
  onItemClick?: () => void;
  floating?: boolean;
}) => {
  if (child.children) {
    // 有子選單的項目 - 使用巢狀 Menu
    return (
      <Menu as="div" className="relative">
        <Menu.Button className={combineClasses(
          "w-full flex items-center justify-between text-sm py-2 hover:bg-gray-100 dark:hover:bg-slate-700 text-left",
          floating ? "px-3" : "px-4"
        )}>
          <span>{child.label}</span>
          <BiChevronRight className="text-[16px] transform rotate-90" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="rounded-md bg-white dark:bg-slate-800 focus:outline-none z-30 w-full pl-4">
            <div className="py-1">
              {child.children.map((subChild, subIndex) => (
                <Menu.Item key={subIndex}>
                  {({ active }) => (
                    <LinkTo
                      href={subChild.path}
                      passHref
                      className={combineClasses(
                        active ? "bg-gray-100 dark:bg-slate-700" : "",
                        "block text-sm py-2 px-3"
                      )}
                    >
                      <span onClick={onItemClick}>{subChild.label}</span>
                    </LinkTo>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }

  // 沒有子選單的項目
  return (
    <Menu.Item>
      {({ active }) => (
        <LinkTo
          href={child.path}
          passHref
          className={combineClasses(
            active ? "bg-gray-100 dark:bg-slate-700" : "",
            "block text-sm py-2 px-3"
          )}
        >
          <span onClick={onItemClick}>{child.label}</span>
        </LinkTo>
      )}
    </Menu.Item>
  );
};

const NavDropdown = ({
  item,
  floating = false,
  onItemClick,
}: INavDropdown) => {
  return (
    <Menu as="div" className={combineClasses("relative", floating ? "mx-2" : "")}>
      <Menu.Button className="flex items-center cursor-pointer focus:outline-none">
        <span className="my-0">{item.label}</span>
        <BiChevronDown className="text-[20px] ml-1" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items 
          className={combineClasses(
            "rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20",
            floating 
              ? "absolute right-0 mt-2 w-[160px] origin-top-right" 
              : "mt-2 w-full"
          )}
        >
          <div className="py-1">
            {item.children?.map((child, index) => (
              <SubMenuItem key={index} child={child} onItemClick={onItemClick} floating={floating} />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NavDropdown;
