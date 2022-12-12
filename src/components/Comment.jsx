import { Box } from "@mantine/core";
import Control from "./Control";
import Controls from "./Controls";
import vote from "../source/vote.png";
import comment from "../source/comment.png";

import { forwardRef } from "react";
import background from "../source/background.jpg";

const Comment = forwardRef((props, ref) => {
  return (
    <>
      <Box
        className="commentMain"
        sx={{ marginLeft: props.mLeft, marginTop: props.mTop }}
      >
        {props.showProfile && (
          <Box className="d-flex">
            <Box
              className="profilePic"
              style={{ background: `url(${props.profilePic})` }}
            ></Box>
            <span className="username">{props.username}</span>
            <span className="date">{props.date}</span>
          </Box>
        )}
        {props.showComment && (
          <Box
            className="comment-content"
            sx={{
              marginRight: props.reply ? "20px" : "320px",
              paddingBottom: !props.showComment
                ? props.reply
                  ? "70px !important"
                  : "40px !important"
                : "10px !important",
            }}
          >
            <span>{props.length}</span>
            <span className="comment-text">
              {props.value.map((theSentence, sentenceIndex) => {
                return (
                  <>
                    <span
                    contentEditable
                      style={
                        sentenceIndex <= props.sentenceIndex
                          ? {}
                          : { opacity: 0 }
                      }
                    >
                      {theSentence}
                    </span>
                  </>
                );
              })}
            </span>

            {props.showControls && (
              <Controls>
                <Control icon={vote} scale="1.6" height="110px" width="110px" />
                <Control className="votes" mBottom="-50px">
                  {props.votes}
                </Control>
                <Control
                  icon={vote}
                  rotate="180deg"
                  scale="1.6"
                  height="110px"
                  width="110px"
                ></Control>
                <Control
                  icon={comment}
                  scale="1.1"
                  height="110px"
                  width="110px"
                />
                <Control className="options">Reply</Control>
                <Control className="options">Give Award</Control>
                <Control className="options">Share</Control>
                <Control className="options">Report</Control>
                <Control className="options">Save</Control>
              </Controls>
            )}

            {props.children}
          </Box>
        )}
      </Box>
    </>
  );
});

const StepSentencesComment = () => {};

export default Comment;
