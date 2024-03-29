import React, { useState, useEffect } from "react"
import { links } from "@/lib/data"
import { Space_Grotesk } from "next/font/google"
import { FaBars, FaTimes } from "react-icons/fa"
import { useActiveSectionContext } from "@/context/active-section-context"
import { ConnectWallet, darkTheme } from "@thirdweb-dev/react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import clsx from "clsx"

const montserrat = Space_Grotesk({ subsets: ["latin"] })

export default function Header() {
    const { activeSection, setActiveSection } = useActiveSectionContext()
    const [navBtn, setNavBtn] = useState(false)

    /** @dev Always set value opposite to current one */
    const handleNavBtn = () => setNavBtn(!navBtn)

    /** @dev Update navBtn based on screen width */
    const updateNavBtn = () => {
        if (window.innerWidth > 1024) {
            setNavBtn(false)
        }
    }

    /** @dev Add event listener for screen width changes */
    useEffect(() => {
        updateNavBtn()
        window.addEventListener("resize", updateNavBtn)
        return () => {
            window.removeEventListener("resize", updateNavBtn)
        }
    }, [])

    return (
        <motion.header
            className="flex fixed w-full h-[4.5rem] bg-transparent z-10 drop-shadow-shady"
            initial={{ y: -150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Image
                className="pl-[2rem] xl:ml-[3rem] h-[57.6px] w-[80px] sm:h-[72px] sm:w-[100px] self-center"
                src="/icon.png"
                alt="DigitalRightsMaykr"
                height="100"
                width="100"
                quality="95"
                priority={true}
            ></Image>

            <h1
                className={`${montserrat.className} fixed sm:flex hidden self-center ml-[5rem] sm:ml-[7rem] xl:ml-[10rem] text-center w-[13rem] sm:w-[20rem] pr-4 sm:pr-0 text-xl
                            sm:text-3xl text-white font-bold`}
            >
                Digital Rights Maykr
            </h1>

            {/* Normal Version Of Navigation Bar */}
            <nav className="lg:flex hidden justify-end gap-4 mr-[1.5rem] w-full items-center text-white list-none">
                {links.map((link) => (
                    <li key={link.hash}>
                        <Link
                            className={clsx(
                                "inline-block hover:text-lightB text-xl uppercase after:duration-1000 ease-out after:block after:h-[0.15rem] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-slider after:transition-transform after:hover:origin-bottom-left after:hover:scale-x-100",
                                {
                                    "text-lightB": activeSection === link.name,
                                }
                            )}
                            href={link.hash}
                            onClick={() => {
                                setActiveSection(link.name)
                                setNavBtn(false)
                            }}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </nav>

            {/* Mobile Version Of Navigation Bar */}
            <nav
                className={
                    navBtn
                        ? "lg:hidden text-center items-center text-white list-none absolute w-full top-[4.6rem] flex-col bg-black bg-opacity-70 backdrop-blur-[5px] rounded-b-lg"
                        : "hidden"
                }
            >
                <div className="mt-[0.5rem]">
                    {links.map((link) => (
                        <li className="" key={link.hash}>
                            <Link
                                className={clsx(
                                    "inline-block hover:text-lightB text-xl uppercase after:duration-1000 ease-out after:block after:h-[0.15rem] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-slider after:transition-transform after:hover:origin-bottom-left after:hover:scale-x-100",
                                    {
                                        "text-lightB": activeSection === link.name,
                                    }
                                )}
                                href={link.hash}
                                onClick={() => {
                                    setActiveSection(link.name)
                                    setNavBtn(false)
                                }}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </div>
                <div className="flex justify-center items-center mt-[0.5rem] mb-[1rem]">
                    <ConnectWallet
                        theme={darkTheme({
                            colors: {
                                primaryButtonText: "#fff",
                                primaryText: "#5acdf1",
                                primaryButtonBg: "#9833e3",
                                connectedButtonBg: "#20093d",
                                connectedButtonBgHover: "#4d0dab",
                                modalBg: "#1d093c",
                                dropdownBg: "#1d093c",
                                secondaryButtonBg: "#fff",
                                walletSelectorButtonHoverBg: "#411c91",
                            },
                        })}
                        modalSize={"wide"}
                        switchToActiveChain={true}
                    />
                </div>

                {/* Adds ability to close modal on click below it */}
                {navBtn ? (
                    <div
                        className="bg-black/40 h-[100vh] w-full absolute"
                        onClick={() => {
                            setNavBtn(false)
                        }}
                    ></div>
                ) : (
                    <></>
                )}
            </nav>

            <div className="hidden lg:flex absolute right-[1.5rem] top-[4.5rem]">
                <ConnectWallet
                    theme={darkTheme({
                        colors: {
                            primaryButtonText: "#fff",
                            primaryText: "#5acdf1",
                            primaryButtonBg: "#9833e3",
                            connectedButtonBg: "#20093d",
                            connectedButtonBgHover: "#4d0dab",
                            modalBg: "#1d093c",
                            dropdownBg: "#1d093c",
                            secondaryButtonBg: "#fff",
                            walletSelectorButtonHoverBg: "#411c91",
                        },
                    })}
                    modalSize={"wide"}
                    switchToActiveChain={true}
                />
            </div>

            <div className={"flex lg:hidden self-center ml-auto mr-[3rem] text-2xl text-white hover:cursor-pointer z-50"}>
                {navBtn ? <FaTimes onClick={handleNavBtn} /> : <FaBars onClick={handleNavBtn} />}
            </div>
        </motion.header>
    )
}
