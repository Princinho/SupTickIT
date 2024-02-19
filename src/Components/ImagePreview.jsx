import { Delete } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { func, string } from "prop-types";


export default function ImagePreview({ src, fileName, removeCallback }) {
    console.log(src)
    return (
        <Box className="image-preview" sx={{ position: "relative", maxWidth: "300px", borderRadius: '1em' }} >
            {removeCallback &&
                <IconButton color="error" onClick={removeCallback}
                    sx={{ position: 'absolute', right: '0', top: '0' }}
                ><Delete /></IconButton>}
            <a href={src} download={fileName} target="_blank" rel="noreferrer">

                <img src={src} alt="attached file" width={'300px'} />
            </a>
        </Box>
    )
}
ImagePreview.propTypes = {
    src: string,
    fileName: string,
    removeCallback: func
}
