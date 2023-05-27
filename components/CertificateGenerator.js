import { useWeb3Contract } from "react-moralis"
import React, { useState } from "react"
import html2canvas from "html2canvas"
import download from "downloadjs"
import Certificate from "../styles/Certificate.module.css"
import uploadToNftStorage from "../utils/uploadToNftStorage"
import contract from "../contracts/DigitalRightsMaykr.json"

const CertificateGenerator = () => {
    const [art, setArt] = useState("")
    const [author, setAuthor] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const contractAddress = contract.address
    const abi = contract.abi

    const { runContractFunction: emittedCount } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "emittedCount",
        params: {},
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target

        if (name === "art") {
            setArt(value)
        } else if (name === "author") {
            setAuthor(value)
        } else if (name === "title") {
            setTitle(value)
        } else if (name === "description") {
            setDescription(value)
        }
    }

    const handleGenerateCertificate = async () => {
        const certificateContainer = document.getElementById("certificate-container")
        const canvas = await html2canvas(certificateContainer)

        const index = (await emittedCount()).toString()

        // Convert the canvas to a Blob object
        const imageBlob = await new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob)
            }, "image/png")
        })

        // Pass the image blob to the upload function
        try {
            const response = await uploadToNftStorage(imageBlob, index)
            console.log("NFT.storage response:", response)
        } catch (error) {
            console.error("Error uploading to NFT.storage:", error)
        }
    }

    return (
        <div>
            <div className={Certificate.inputsContainer}>
                <input type="text" id="art" name="art" placeholder="Art Hash" onChange={handleInputChange} />
                <input type="text" id="author" name="author" placeholder="Author" onChange={handleInputChange} />
                <input type="text" id="title" name="title" placeholder="Title" onChange={handleInputChange} />
                <input type="text" id="description" name="description" placeholder="Description" onChange={handleInputChange} />
                <button className={Certificate.generateButton} onClick={handleGenerateCertificate}>
                    Generate Certificate
                </button>
            </div>
            {/* Certificate will show only if we have "art" field filled */}
            {art && (
                <div className={Certificate.certPositioning}>
                    <div
                        id="certificate-container"
                        style={{
                            position: "relative",
                            width: "556px",
                            height: "700px",
                            background: `url('/certificate-template.png')`,
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textAlign: "center",
                                color: "white",
                            }}
                        >
                            <p style={{ marginBottom: "10px" }}>Art Hash: {art}</p>
                            <p style={{ marginBottom: "10px" }}>Author: {author}</p>
                            <p style={{ marginBottom: "10px" }}>Title: {title}</p>
                            <p>Description: {description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CertificateGenerator
