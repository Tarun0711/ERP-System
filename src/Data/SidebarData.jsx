import { MdOutlineDashboard } from "react-icons/md";
import { MdContactPhone } from "react-icons/md";
import { FaUserLock } from "react-icons/fa";
import { FaHandshakeAngle } from "react-icons/fa6";
import { GoTasklist } from "react-icons/go";
import { IoMdCall } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { LiaPollSolid } from "react-icons/lia";
import { BiConversation } from "react-icons/bi";

export const SidebarData=[
    {
        title:"Home",
        path:"/CRM",
        icon:<MdOutlineDashboard/>
    },
    
    {
        title:"Leads",
        path:"/CRM/leads",
        icon:<LiaPollSolid/>
    },
    {
        title:"Contacts",
        path:"/CRM/contact",
        icon:<MdContactPhone/>
    },
    {
        title:"Accounts",
        path:"/CRM/accounts",
        icon:<FaUserLock/>
    },
    {
        title:"Deals",
        path:"/CRM/deals",
        icon:<FaHandshakeAngle/>
    },
    {
        title:"Task",
        path:"/CRM/tasks",
        icon:<GoTasklist/>
    },
    {
        title:"Meetings",
        path:"/CRM/meetings",
        icon:<BiConversation/>
    },
    {
        title:"Call",
        path:"/CRM/calls",
        icon:<IoMdCall/>
    },
    // {
    //     title:"Reports",
    //     path:"/CRM/reports",
    //     icon:<TbReportSearch/>
    // },
    {
        title:"Live Chat",
        path:"/CRM/chats",
        icon:<TfiHeadphoneAlt/>
    }
   
]