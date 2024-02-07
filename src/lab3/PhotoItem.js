import React from "react";
import { Image } from 'react-bootstrap';

function PhotoItem(props) {

    return (
        <div className="list-group-item d-flex align-items-center p-2">
            <div className="mx-2">
                <Image roundedCircle={true} src={props.Item.thumbnailUrl}  />
            </div>
            <div className="mx-2">
                {props.Item.title}
            </div>
        </div>
    );


}

export default PhotoItem;