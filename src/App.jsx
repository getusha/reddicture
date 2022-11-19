import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Box, Button, Card, Center, Container, DEFAULT_THEME, Divider, Grid, Group, LoadingOverlay, Notification, ScrollArea, SimpleGrid, Text, Textarea } from '@mantine/core'
import RichTextEditor from '@mantine/rte'

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import "./index.css";

import sampleProfile from "./source/icons/24_oooo.plus.png";
import * as CommentUtils from "./utils/splitComments";

import vote from "./source/vote.png";
import comment from "./source/comment.png";

import background from "./source/background.jpg";
import Controls from './components/Controls';
import Control from './components/Control';
import Comment from './components/Comment';
import Comments from './components/Comments';
import { Carousel } from '@mantine/carousel';
import { showNotification } from '@mantine/notifications';
import { IconAdjustmentsAlt, IconCheck, IconPhotoPlus } from '@tabler/icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useScrollLock } from '@mantine/hooks';
import { generateUsername } from 'friendly-username-generator';


const App = () => {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState("");
  const [ready, setReady] = useState(false);
  const node = useRef(null);

  const [generatedImage, setGeneratedImage] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [splittedComment, setSplittedComment] = useState([]);
  const [UNames, setUNames] = useState([]);

  const [commentPrepared, setCommentPrepared] = useState(false);

  
  const [loading, setLoading] = useState(false);
  const [scrollLocked, setScrollLocked] = useScrollLock(loading);


  const letSayRandomDays = ["· 3 yr. ago", "· 1 yr. ago", "· 2 days ago", "· 1 hr. ago", "· 4 hr. ago", "· 13 days ago"] 

  // canvasHeight: 1080, canvasWidth: 1920
  // , { canvasHeight: 1080, canvasWidth: 1920 }
  // useEffect(() => {
  //   if (document.readyState !== "complete") {
  //     setReady(true)
  //   };
  //   if (!ready) return;

  //   htmlToImage.toPng(node.current, { canvasHeight: 1080, canvasWidth: 1920 })
  //     .then(function (dataUrl) {
  //       var img = new Image();
  //       img.src = dataUrl;
  //       setGeneratedImage(dataUrl);
  //       // img.style.scale = "0.2"
  //       // img.style.scale = ".2"
  //       // document.body.appendChild(img);
  //     })
  //     .catch(function (error) {
  //       console.error('oops, something went wrong!', error);
  //     });

  // }, [ready, value])

  useEffect(() => {
    showNotification({ message: 'Hello' });
  }, [])

  const prepareComments = () => {

    // setLoading(true)
    // if (document.readyState !== "complete") {
    //   setReady(true)
    // };
    // if (!ready) return;

    // console.log(CommentUtils.splitComments(value))
    const splittedComments = CommentUtils.splitComments(value);

    let withReplyComments = [];
    splittedComments.forEach((s, index) => {
      // console.log(s.split(/[1-9][.][1-9][)]/g));
      if ((/[1-9][.][1-9][)]/g.test(s))) {
        withReplyComments.push(s.split(/[1-9][.][1-9][)]/g));
      } else {
        withReplyComments.push([s])
      }

      // console.table([splittedComments.length - 1, index])

      if (splittedComments.length - 1 === index) {
        setCommentPrepared(true)
        toast.info('Input processed succesfully!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    })


    console.warn(withReplyComments)



    setSplittedComment((prev) => {
      return [...prev, ...withReplyComments]
    })
    // console.log(splittedComments);
  }

  useEffect(()=>{
    let uNames = [];
    for(let usernames = 0; usernames < 30; usernames++){
      uNames.push(generateUsername())
    }
    setUNames(uNames)
  }, [])


  // useEffect(() => {
  //   if (loading) {
  //     document.getElementsByName("body")[0].style.overflow = "hidden";
  //   } else {
  //     document.getElementsByName("body")[0].style.overflow = "auto";
  //   }
  // }, [loading])

  const generateIMG = () => {
    setLoading(true)

    const theNodes = Array.from(document.getElementsByClassName("node"));
    console.log(theNodes)

    // console.log(theNodes)

    // splittedComment.map((s)=>{
    //   console.log(s)
    // })

    theNodes.forEach((myNode, index) => {
      htmlToImage.toPng(myNode, { canvasHeight: 1080, canvasWidth: 1920 })
        .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          setGeneratedImages((prev) => {
            return [...prev, dataUrl]
          })
          // console.table([theNodes.length, index])
          if (theNodes.length - 1 === index) {
            setLoading(false);
          }
          // setGeneratedImage(dataUrl);
          // img.style.scale = "0.2"
          // img.style.scale = ".2"
          // document.body.appendChild(img);
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    })

    console.log("done")

  }



  const customLoader = (
    <svg
      width="54"
      height="54"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke={DEFAULT_THEME.colors.blue[6]}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );

  // commentt
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover

        theme="light"
        style={{ scale: 2 }}
      />
      <LoadingOverlay loader={customLoader} visible={loading} about="processing images" />
      <Center sx={{ backgroundColor: "#fd7e14", borderRadius: 2 }} fw={"bold"}>
        <Group>
        <h1 className='title'>Reddicture</h1> 
        </Group>
      </Center>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }} mt="lg">
        <Grid.Col span={6}>
          <Card withBorder sx={{ backgroundColor: "#ffe3d9" }}>
            <Textarea minRows={5} maxRows={12} placeholder="Insert the thread here." label="Reddit Thread" description="text format with n) staging" radius="xs" withAsterisk autosize onChange={(e) => { setValue(e.target.value) }} />

            <Group mt={50}>
              <Button onClick={prepareComments} leftIcon={<IconAdjustmentsAlt />} disabled={commentPrepared} color="orange" radius="xs" size="lg">
                Prepare
              </Button>

              <Button onClick={generateIMG} leftIcon={<IconPhotoPlus />} disabled={!commentPrepared} color="teal" radius="xs" size="lg" >
                Generate
              </Button>
            </Group>

          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Center>

            <SimpleGrid cols={1} ml={"auto"} mr={"auto"}>
              <ScrollArea sx={{height: "70vh"}}>
              {generatedImages.map((gImg) => {
                return (
                  <>
                    <Carousel>
                      <Carousel.Slide>

                        <img src={gImg} alt="" className="generated-image" />
                      </Carousel.Slide>
                    </Carousel>

                  </>
                )
              })}
              </ScrollArea>

              {/* {!!generatedImage &&
              <img className="generated-image" src={generatedImage} />
            } */}
            </SimpleGrid>
          </Center>

        </Grid.Col>

        <Card>
          <ScrollArea>
            {/* <Box ref={node} sx={{ background: `url(${background})` }} className="node"> */}

            {
              splittedComment.map((split, index) => {
                return (
                  <>
                    {/* <h1>{split}</h1> */}
                    <Comments>


                      {/* <Comment showProfile={false} showComment={false} showControls={false} value={value} ref={node} mLeft="300px" profilePic={sampleProfile} > */}
                      {/* <Comment showProfile={false} showComment={false} showControls={false} value={value} reply={true} ref={node} mLeft="30px" mTop="40px" profilePic={sampleProfile} > */}

                      <Comment username={UNames[index]} date={letSayRandomDays[index]} showProfile={true} showComment={true} showControls={true} value={split[0]} reply={false} ref={node} mLeft="300px" mTop="40px" profilePic={sampleProfile} >

                        {
                          split.slice(1).map((f) => {
                            return (
                              <>
                                <Comment username={UNames.length > 0 ? UNames[index-1] : UNames[index+1] } date={letSayRandomDays[index]} showProfile={true} showComment={true} showControls={true} value={f} reply={true} mLeft="30px" mTop="40px" profilePic={sampleProfile} >
                                </Comment>
                              </>
                            )
                          })
                        }

                      </Comment>
                      {/* </Comment> */}
                      {/* </Comment> */}

                    </Comments>
                  </>
                )
              })
            }


            {/* <Comments> */}

            {/* <Comment showProfile={false} showComment={false} showControls={false} value={value} ref={node} mLeft="300px" profilePic={sampleProfile} > */}
            {/* <Comment showProfile={false} showComment={false} showControls={false} value={value} reply={true} ref={node} mLeft="30px" mTop="40px" profilePic={sampleProfile} > */}
            {/* <Comment showProfile={true} showComment={true} showControls={true} value={value} reply={false} ref={node} mLeft="300px" mTop="40px" profilePic={sampleProfile} >
              </Comment> */}
            {/* </Comment> */}
            {/* </Comment> */}

            {/* </Comments> */}


            {/* <Box className="commentMain" sx={{ marginLeft: "400px" }}>
                <Box className="d-flex">
                  <Box className="profilePic" style={{ background: `url(${sampleProfile})` }}></Box>
                  <span className="username">username</span>
                  <span className='date'> · 3 yr. ago</span>
                </Box>
                <Box className="comment-content" sx={{ marginRight: "220px" }}>
                  <span className="comment-text">
                    {value}
                  </span>

                  <Controls>
                    <Control icon={vote} scale="1.6" height="110px" width="110px" />

                    <Control className="votes" mBottom="-50px" >
                      577
                    </Control>

                    <Control icon={vote} rotate="180deg" scale="1.6" height="110px" width="110px">
                    </Control>

                    <Control icon={comment} scale="1.1" height="110px" width="110px" />

                    <Control className="options">
                      Reply
                    </Control>

                    <Control className="options">
                      Give Award
                    </Control>

                    <Control className="options">
                      Share
                    </Control>

                    <Control className="options">
                      Report
                    </Control>

                    <Control className="options">
                      Save
                    </Control>

                  </Controls>

                </Box>
              </Box> */}
            {/* </Box> */}
          </ScrollArea>
        </Card>
      </Grid>
    </>

  )
}

export default App
