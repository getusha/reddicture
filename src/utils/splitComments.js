const splitComments = (rawComments) => {
    const commentRegex = /[1-9][)]/g;
    const subCommentRegex = /[1-9][.][1-9][)]/g;

    const subCommentR= /[1-9][.][1-9][)]/g
    // [1-9][.][1-9][)]

    let result = [];
    let grouped = [];
    let commentCount = 0;
    let startAdding = false;

    let commentsStartAt = [];

    if(rawComments)
    
    result = rawComments.split(/^[0-9]+[)]/gim);
    result.shift()
    // result = rawComments.split(".")
    // result.unshift();

    // let commentStarting = commentRegex.test(rawComments[i-1] + rawComments[i]);

    // for(let i = 0; i < rawComments.length; i++){
    //     if(commentRegex.test(rawComments[i]+rawComments[i+1])){
    //         commentsStartAt.push(i+1)
    //         console.log(commentsStartAt)
    //     }
    // }

    // let res =[];
    // let resG = [];

    // commentsStartAt.forEach((startAt)=>{
    //     for(let j = startAt; j < rawComments.length - startAt; j++){
    //         resG.push(rawComments[j]);
    //     }
    //     res.push(resG)
    // })
    // console.log(res)





























    // for (let i = 0; i < rawComments.length; i++) {
    //     if(commentRegex.test(rawComments[i-1] + rawComments[i])){
    //         console.log(grouped)
    //         result.push(grouped)
    //         grouped = [];
    //     }
    //     grouped.push(rawComments[i]);
    //     // console.log(rawComments[i])
    //     // if (commentRegex.test(rawComments[i-1] + rawComments[i])) {
    //     //     console.log(rawComments[i-1] + rawComments[i])
    //     //     commentCount++;
    //     //     if(commentCount > 1){
    //     //         result.push(grouped)
    //     //         grouped = [];
    //     //     }
    //     //     // for(let j = 0; j < rawComments.length; j++){

    //     //     // }
            
            
    //     //     // console.log(rawComments[i-1]+rawComments[i]);
    //     //     // grouped.push(rawComments[i-1]+rawComments[i]);
    //     //     // result.push(grouped)
    //     //     // grouped =  []



    //     //     // commentCount++;
    //     //     // startAdding  = true;
    //     //     // // if (commentCount > 1) {
    //     //     //     result.push(grouped);
    //     //     //     grouped = [];
    //     //     // // };
    //     // }
    // }

    return result;
}

export {
    splitComments
}