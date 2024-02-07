import React from "react";
import { Image } from "react-bootstrap";


function Photo(props){

    return (
        <a target={"_blank"} href={props.photoItem.url}>
            <Image roundedCircle={true} src={props.photoItem.thumbnailUrl} />
        </a>
    )
}

export default Photo