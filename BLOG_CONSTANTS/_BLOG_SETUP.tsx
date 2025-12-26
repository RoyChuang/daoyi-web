import { LogoType, NavbarType } from "../src/shared/enums";
import { IAuthor, iNavSetup, iSEO } from "../src/shared/interfaces";
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin, AiFillInstagram, AiFillFacebook } from "react-icons/ai";

/**
 * EXAMPLE AUTHOR
 * 
 export const AUTHOR_NAME: IAuthor = {
    name: "Full Name",
    designation: "Work Designation",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    profilePic: "",
     social: [
        {
            icon: <AiFillGithub />,
            link: 'https://github.com/'
        },
        {
            icon: <AiFillLinkedin />,
            link: 'https://www.linkedin.com/'
        },
    ]
}
 */

export const MAYUR: IAuthor = {
    name: "道一關懷協會",
    designation: "道一",
    bio: "",
    profilePic: "",
    social: [
        {
            icon: <AiFillFacebook />,
            link: 'https://www.facebook.com/groups/1418391155044562'
        },
    ]
}

export const RUPALI: IAuthor = {
    name: "道一關懷協會",
    designation: "道一",
    bio: "",
    profilePic: "",
    social: [
        {
            icon: <AiFillFacebook />,
            link: 'https://www.facebook.com/groups/1418391155044562'
        },
    ]
}


// This can your company name / your name etc for SEO purposes
export const WEBSITE_NAME: string = '社團法人新北市道一關懷協會';
export const WEBSITE_URL: string = 'https://www.daoyi.org';

/**
 * This is the main navigation setup.
 * This includes the main navbar and the side drawer.
 */
export const PRIMARY_NAV: iNavSetup = {
    type: NavbarType.DEFAULT,
    // max logo image height 40px
    // you can add logo light version if using image
    logo: {
        type: LogoType.IMAGE,
        logo: '/images/cropped-LOGO.png',
        text: '社團法人新北市道一關懷協會',
        logoLight: '/images/cropped-LOGO.png'
    },
    // navLinks are the main navbar links that apper on top of every page
    navLinks: [
        {
            label: '首頁',
            path: '/'
        },
        {
            label: '影音作品',
            path: '/video'
        },
        {
            label: '文章',
            type: 'dropdown',
            path: '',
            children: [
                {
                    label: '書名',
                    type: 'dropdown',
                    path: '',
                    children: [
                        {
                            label: '道親手冊',
                            path: '/dao-qin-handbook'
                        }
                    ]
                },
                {
                    label: '班會報導',
                    path: '/blog'
                }
            ]
        },
        {
            label: '關於我們',
            type: 'dropdown',
            path: '',
            children: [
                {
                    label: '協會章程',
                    path: '/association-aticles'
                },
                {
                    label: '組織架構',
                    path: '/structure'
                }
            ]
        },
        {
            label: '贊助本會',
            path: '/contact-us'
        }
    ],
    // sideNavLinks are the links which appear when you open the side menu after clicking the burger menu icon.
    sideNavLinks: [
        {
            label: '首頁',
            path: '/'
        },
        {
            label: '影音作品',
            path: '/video'
        },
        {
            label: '文章',
            type: 'dropdown',
            path: '',
            children: [
                {
                    label: '書名',
                    type: 'dropdown',
                    path: '',
                    children: [
                        {
                            label: '道親手冊',
                            path: '/dao-qin-handbook'
                        }
                    ]
                },
                {
                    label: '班會報導',
                    path: '/blog'
                }
            ]
        },
        {
            label: '關於我們',
            type: 'dropdown',
            path: '',
            children: [
                {
                    label: '協會章程',
                    path: '/association-aticles'
                },
                {
                    label: '組織架構',
                    path: '/structure'
                }
            ]
        },
        {
            label: '贊助本會',
            path: '/contact-us'
        }
    ],
    socials: []
}

export const DEFAULT_SEO: iSEO = {
    title: "社團法人新北市道一關懷協會 || DAOYI Care Association",
    description: "社團法人新北市道一關懷協會 || DAOYI Care Association",
    keywords: "Care Association, 關懷協會, 社團法人, 新北市",
    url: WEBSITE_URL,
    author: `${RUPALI.name}`,
    // twitterHandle: '@WebExpe',
    ogImage: '/public/images/cropped-LOGO.png'
}