import { Box } from "@mantine/core"
import { forwardRef } from "react";
import background from "../source/background.jpg";

const Comments = forwardRef((props, ref) => {
    return (
        <>
            <Box id={props.id} ref={ref} sx={{ background: `url(${background})` , margin: "20px"}} className={`node node${props.id}`}>
                {props.children}
            </Box>
        </>
    )
})

export default Comments;