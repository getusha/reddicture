import { Box } from "@mantine/core";

const Controls = (props) => {
    return (
        <Box className="controls">
            {props.children}
        </Box>
    )
}

export default Controls;