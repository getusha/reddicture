import { Box } from "@mantine/core"

const Control = (props) => {
    const controlStyles = {
        backgroundImage: `url(${props.icon})`,
        height: props.height,
        width: props.width,
        backgroundSize: "contain",
        scale: props.scale,
        rotate: props.rotate,
        marginBottom: props.mBottom,
        marginLeft: props.mLeft,
        marginRight: props.mRight,
        marginTop: props.mTop,
        ...props.styles
    }

    return (
        <Box className={`control ${props.className}`}>
            <Box style={controlStyles}>
                {props.children}
            </Box>
        </Box>
    )
}

export default Control;