import { useRef, useState } from "react"
import "./ImagePreviewInput.css"
import PdfImage from "../assets/pdf.png"
import { NoteAdd } from "@mui/icons-material"
import { IconButton } from "@mui/material"

export default function ImagePreviewInput() {
    const [selectedFiles, setSelectedFiles] = useState([])
    const inputRef = useRef()
    console.log(selectedFiles)

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }
        setSelectedFiles(prev => [...prev, e.target.files[0]])
    }

    function removeFile(file) {
        setSelectedFiles(prev => prev.filter(f => f.name !== file.name))
    }
    console.log(selectedFiles)
    return (
        <div style={{ display: "flex" }}>
            <label className="file-upload-trigger" htmlFor="image-upload" ><span><IconButton size="large" onClick={() => inputRef.current.click()}><NoteAdd className="btn-icon" color="primary" /></IconButton></span></label>
            <input className="custom-image-input" ref={inputRef} disabled={selectedFiles.length >= 3} id="image-upload" hidden type='file' accept="image/*" onChange={onSelectFile} />
            <div className="selected-images-wrapper">
                {selectedFiles.length > 0 && selectedFiles.map(file => {
                    if (file.type == "application/pdf") return <DocumentPreview key={file.lastModified + file.size} src={PdfImage} removeFn={() => removeFile(file)} />
                    else return <ImagePreview key={file.lastModified + file.size} src={URL.createObjectURL(file)} removeFn={() => removeFile(file)} />
                })}
            </div>
        </div>
    )
}
function ImagePreview({ src, removeFn }) {
    return (
        <div className="selected-image">
            <img src={src} className="selected-image-preview" />
            <button onClick={removeFn} className="selected-image-remove-btn">X</button>
        </div>)
}
function DocumentPreview({ src, removeFn }) {
    return (
        <div className="selected-image">
            <img src={src} style={{ aspectRatio: 'auto' }} className="selected-image-preview" />
            <button onClick={removeFn} className="selected-image-remove-btn">X</button>
        </div>)
}