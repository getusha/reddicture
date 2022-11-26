import { useEffect, useRef, useState } from 'react'
import { Box, Button, Card, Center, Container, DEFAULT_THEME, Divider, Grid, Group, LoadingOverlay, Notification, ScrollArea, SimpleGrid, Text, Textarea } from '@mantine/core'
import * as htmlToImage from 'html-to-image';
import "./index.css";
import sampleProfile from "./source/icons/24_oooo.plus.png";
import * as CommentUtils from "./utils/splitComments";
import Comment from './components/Comment';
import Comments from './components/Comments';
import { Carousel } from '@mantine/carousel';
import { IconAdjustmentsAlt, IconCheck, IconPhotoPlus } from '@tabler/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useScrollLock } from '@mantine/hooks';
import * as Username from "./values/usernames";


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
  const [newStructure, setNewStructure] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollLocked, setScrollLocked] = useScrollLock(loading);
  const letSayRandomDays = ["· 3 yr. ago", "· 1 yr. ago", "· 2 days ago", "· 1 hr. ago", "· 4 hr. ago", "· 13 days ago", "· 3 yr. ago", "· 1 yr. ago", "· 2 days ago", "· 1 hr. ago", "· 4 hr. ago", "· 13 days ago", "· 3 yr. ago", "· 1 yr. ago", "· 2 days ago", "· 1 hr. ago", "· 2 hr. ago", "· 29 days ago"]


  const [finalPlease, setPlease] = useState([]);

  useEffect(() => {
    console.log(splittedComment)

    let newStruct = {
      comment: [

      ],
      replys: [

      ]
    }
  }, [splittedComment])

  const prepareComments = () => {
    setSplittedComment([])
    let splittedComments = CommentUtils.splitComments(value);
    // console.log(splittedComments.join(" ").split("."));
    // splittedComments = splittedComments.split(".")

    splittedComments.forEach((sComments) => {
      if (sComments.length > 100) {
        console.log(sComments[1])
      }
    })

    let withReplyComments = [];
    let newStruct = {
      comment: [

      ],
      replys: [

      ]
    }
    let please = [];

    console.error(splittedComments)
    splittedComments.forEach((s, index) => {
      if ((/[1-9][.][1-9][)]/g.test(s))) {
        withReplyComments.push(s.split(/[1-9][.][1-9][)]/g));
        // newStruct.replys.push(s.split(/[1-9][.][1-9][)]/g));
        // console.log("Reply ", s.split(/[1-9][.][1-9][)]/g))
      } else {
        withReplyComments.push([s])
        // console.log("Comment ", s)
        // newStruct.comment.push([s])
      }
      // please.push(newStruct)

      // newStruct = {
      //   comment: [

      //   ],
      //   replys: [

      //   ]
      // }
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

    withReplyComments.forEach((wcs) => {
      wcs.forEach((wc, i) => {
        // console.log(wc)
        let trimmed = wc.match(/[^.]+[.]?|./g);
        if (i == 0) {
          console.error(trimmed)

          trimmed.forEach((trim) => {
            if (trim.length > 105) {
              let sentenceHolder = "";
              // newStruct.comment.push(trim.match(/[^,]+[,]?|,/g))

              trim.split(" ").forEach((ts, i) => {
                // console.table([[i], [trim.split(" ").length - 1]])
                if (sentenceHolder.length < 105) {
                  sentenceHolder += ` ${ts}`
                }
                else {
                  newStruct.comment.push(sentenceHolder)
                  sentenceHolder = "";
                  sentenceHolder += ` ${ts}`;
                }
                if (i === trim.split(" ").length - 1 && sentenceHolder.length < 105) {
                  newStruct.comment.push(sentenceHolder)
                }
              })

              // newStruct.comment.push(trim.split(" "))
            } else {
              newStruct.comment.push(trim)
            }
          })
          // newStruct.comment.push(wc.match(/[^.,]+[.,]?|.,/g))
        } else {
          trimmed.forEach((trim) => {
            if (trim.length > 105) {
              let sentenceHolder = "";
              // newStruct.comment.push(trim.match(/[^,]+[,]?|,/g))

              trim.split(" ").forEach((ts, i) => {
                // console.table([[i], [trim.split(" ").length-1]])
                if (sentenceHolder.length < 105) {
                  sentenceHolder += ` ${ts}`
                }
                else {
                  newStruct.replys.push(sentenceHolder)
                  sentenceHolder = "";
                  sentenceHolder += ` ${ts}`;
                }
                if (i === trim.split(" ").length - 1 && sentenceHolder.length < 105) {
                  newStruct.replys.push(sentenceHolder)
                }
              })

              // newStruct.comment.push(trim.split(" "))
            } else {
              newStruct.replys.push(trim)
            }
          })
          // newStruct.replys.push(wc.match(/[^.,]+[.,]?|.,/g))
        }
      })
      please.push([newStruct])
      newStruct = {
        comment: [

        ],
        replys: [

        ]
      }

    })

    let overflowStruct = {
      comment: [

      ],
      replys: [

      ]
    }

    const overflowFun = (data) => {
      data.forEach((comment) => {
        comment.forEach((commentinside, ix) => {
          // console.warn(commentinside)
          if (commentinside.comment.join("").length + commentinside.replys.join("").length > 350) {
            console.log("%c one to the next page", "color: green;");

            if (commentinside.replys.length !== 0) {
              commentinside.replys.reverse().forEach((reply, index) => {
                console.log({ reply, index })
                if (commentinside.comment.join("").length + commentinside.replys.join("").length > 350) {
                  newStruct.replys.unshift(reply);
                  commentinside.replys[index] = "";
                }
                commentinside.replys = commentinside.replys.filter((e) => { return e != "" }).reverse()
              })

              comment.push(newStruct)
              newStruct = { comment: [], replys: [] }
            } else {
              commentinside.comment.reverse().forEach((comment, index) => {
                console.log({ comment, index })
                if (commentinside.comment.join("").length + commentinside.replys.join("").length > 350) {
                  newStruct.comment.unshift(comment);
                  commentinside.comment[index] = "";
                }
                commentinside.comment = commentinside.comment.filter((e) => { return e != "" }).reverse()
              })

              comment.push(newStruct)
              newStruct = { comment: [], replys: [] }
            }
            // overflowFun(data)
            commentinside.comment.pop()
          } else {
            return;
          }
        })
      })
    }


    overflowFun(please)
    console.log(please)

    setSplittedComment((prev) => {
      return [...prev, ...withReplyComments]
    })

    setPlease((prev) => {
      return [...prev, ...please]
    })

    // console.warn(splittedComments);

    let newStructure = [];
    setNewStructure(newStructure)
  }


  /**
   * 
   * let comments =
    [
        [
            ["Comment 1.", "is amazzing"],
            ["Overflows", "Overflow sentence"]
        ],


        [
            ["Comment 1.", "is amazzing"],
            ["Overflows", "Overflow sentence"]

        ]
    ]

   */


  useEffect(() => {
    let uNames = [];
    for (let usernames = 0; usernames < 30; usernames++) {
      uNames.push(Username.random())
    }
    setUNames(uNames)
  }, [])



  const generateIMG = () => {
    setLoading(true)
    const theNodes = Array.from(document.getElementsByClassName("node"));
    theNodes.forEach((myNode, index) => {
      htmlToImage.toPng(myNode, { canvasHeight: 1080, canvasWidth: 1920 })
        .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          setGeneratedImages((prev) => {
            return [...prev, dataUrl]
          })
          if (theNodes.length - 1 === index) {
            setLoading(false);
          }
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    })
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
      <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" style={{ scale: 2 }} />
      <LoadingOverlay loader={customLoader} visible={loading} about="processing images" />

      <Center sx={{ backgroundColor: "#fd7e14", borderRadius: 2 }} fw={"bold"}>
        <Group>
          <marquee className="title" behavior="" direction="">Reddicture</marquee>
        </Group>
      </Center>

      <Grid sx={{ display: "flex", justifyContent: "space-between" }} mt="lg">
        <Grid.Col span={6}>
          <Card withBorder sx={{ backgroundColor: "#ffe3d9" }}>
            <Textarea minRows={5} maxRows={12} placeholder="Insert the thread here." label="Reddit Thread" description="text format with n) staging" radius="xs" withAsterisk autosize onChange={(e) => { setValue(e.target.value) }} />

            <Group mt={50}>
              <Button onClick={prepareComments} leftIcon={<IconAdjustmentsAlt />}
                // { /*disabled={commentPrepared}*/} 
                color="orange" radius="xs" size="lg">
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
              <ScrollArea sx={{ height: "70vh" }}>
                {generatedImages.map((gImg) => {
                  return (
                    <Carousel>
                      <Carousel.Slide>
                        <img src={gImg} alt="" className="generated-image" />
                      </Carousel.Slide>
                    </Carousel>
                  )
                })}
              </ScrollArea>
            </SimpleGrid>
          </Center>

        </Grid.Col>
        <Card>
          <ScrollArea>

            {
              splittedComment.map((split, index) => {
                return (
                  <Comments>
                    <Comment username={UNames[index]} date={letSayRandomDays[index]} showProfile={true} showComment={true} showControls={true} value={split[0]} reply={false} ref={node} mLeft="300px" mTop="40px" profilePic={sampleProfile} >

                      {
                        split.slice(1).map((f) => {
                          return (
                            <>
                              <Comment username={UNames.length > 0 ? UNames[index - 1] : UNames[index + 1]} date={letSayRandomDays[index]} showProfile={true} showComment={true} showControls={true} value={f} reply={true} mLeft="30px" mTop="40px" profilePic={sampleProfile} >
                              </Comment>
                            </>
                          )
                        })
                      }

                    </Comment>
                  </Comments>
                )
              })
            }

          </ScrollArea>
        </Card>
      </Grid>
    </>

  )
}

export default App
