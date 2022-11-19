import { Box } from "@mantine/core"
import { forwardRef } from "react";
import background from "../source/background.jpg";

const Comments = forwardRef((props, ref) => {
    return (
        <>
            <Box ref={ref} sx={{ background: `url(${background})` }} className="node">
                {props.children}
            </Box>
        </>
    )
})

export default Comments;