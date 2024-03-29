import React, { useState } from "react"
import { useSectionInView } from "@/lib/hooks"
import { useContract, useContractRead } from "@thirdweb-dev/react"
import { motion } from "framer-motion"
import maykr from "@/contracts/DigitalRightsMaykr.json"
import CertificateBox from "@/components/certificateBox"
import Modal from "@/components/modal"

export default function Gallery() {
    const { ref } = useSectionInView("Gallery", 0.5)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [tokenId, setTokenId] = useState<number>(0)
    const [selectedCertificateImage, setSelectedCertificateImage] = useState<string>("")

    const contractAddress = maykr.address
    const abi = maykr.abi

    const { contract } = useContract(contractAddress, abi)
    const emitted = useContractRead(contract, "emittedCount")

    const handleCertificateClick = (tokenId: number, imageUrl: string) => {
        setTokenId(tokenId)
        setSelectedCertificateImage(imageUrl)
        setModalOpen(true)
    }

    return (
        <section className="min-h-[48.5rem] mb-10" ref={ref}>
            {modalOpen && <Modal tokenId={tokenId} closeModal={() => setModalOpen(false)} selectedCertificateImage={selectedCertificateImage} />}
            <div className="flex flex-wrap mt-[8rem] p-[1rem] justify-center">
                {emitted.data && emitted.data.toNumber() === 0 ? (
                    <div className="flex flex-col text-center items-center justify-center mt-[12rem] mb-[16rem]">
                        <p
                            className="bg-gradient-to-r from-pink-600 via-purple-600 to-red-600 inline-block text-transparent bg-clip-text text-6xl font-bold h-[15rem]
                                      sm:h-[10rem] drop-shadow-shady"
                        >
                            No Certificates To Display For Now...
                        </p>
                    </div>
                ) : (
                    <div className="max-w-[100rem] flex items-center justify-center flex-wrap w-full gap-20 list-none mt-[1rem]">
                        {Array.from({ length: (emitted.data as number) || 0 }, (_, index) => (
                            <motion.li
                                className=""
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 * index, duration: 1 }}
                            >
                                <React.Fragment key={index}>
                                    <CertificateBox certificateId={index} onCertificateClick={handleCertificateClick} />
                                </React.Fragment>
                            </motion.li>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
