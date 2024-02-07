import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    List,
    AutoSizer
} from "react-virtualized";
import Photo from "./Photo";
import Form from 'react-bootstrap/Form';
import {Button, Dropdown, FormGroup, FormLabel} from "react-bootstrap";
import Paginator from "./Paginator";
import 'semantic-ui-css/semantic.min.css'


export default function PhotoAppV2() {
    const [photos, setPhotos] = useState([]);
    const [photosfetch, setphotosfetch] = useState([])
    const [album, setAlbum] = useState(0)

    const [page, setPage] = useState(1)
    const [scrollToIndex, setscrollToIndex] = useState(undefined)

    function handleRowsScroll({stopIndex}) {
        setPage(Math.ceil(stopIndex / 10))
        setscrollToIndex(undefined)
    }

    function handlePageChange(page) {
        setscrollToIndex((page - 1) * 10)
    }


    useEffect(() => {
        fetchPhotos().then();
    }, [])


    const fetchPhotos = async () => {
        let response = await fetch("https://jsonplaceholder.typicode.com/photos");
        let photos = await response.json();
        let photosRes = photos.filter(photo => photo.title.split(" ").length <= 7)
        setPhotos(photosRes)
        setphotosfetch(photosRes)
    }


    function SortPhotoByTitle(sortDirection) {
        switch (sortDirection) {
            case "ASC":
                return setPhotos([...photos].sort((a, b) =>
                    a.title > b.title ? 1 : -1,))
            case "DESC":
                return setPhotos([...photos].sort((a, b) =>
                    b.title > a.title ? 1 : -1,))
            default:
                return 0
        }
    }

    function SortPhotoByAlbum(sortDirection) {
        switch (sortDirection) {
            case "ASC":
                return setPhotos([...photos].sort((a, b) =>
                    a.albumId - b.albumId,))
            case "DESC":
                return setPhotos([...photos].sort((a, b) =>
                    b.albumId - a.albumId,))
            default:
                return 0
        }
    }

    function handleChangeTitle(e) {
        SortPhotoByTitle(e.target.value)
    }

    function handleChangeAlbum(e) {
        SortPhotoByAlbum(e.target.value)
    }

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        } else {
            console.log(album)
            setPhotos([...photosfetch].filter(item => item.albumId === album))
        }

    }, [album])

    function RangeAlbum() {
        return (
            <>
                <Form.Label><b>Range album</b></Form.Label>
                <Form.Range value={album} onChange={e => setAlbum(parseInt(e.target.value))}/>
            </>
        );
    }

    function filterPhotos(filter) {
        switch (filter) {
            case "first":
                if (album !== 0) {
                    return setPhotos([...photos].filter(item => item.title.length < 15 && item.title.length > 10))
                } else {
                    return setPhotos([...photosfetch].filter(item => item.title.length < 15 && item.title.length > 10))
                }
            case "second":
                if (album !== 0) {
                    return setPhotos([...photos].filter(item => item.title.length < 10))
                } else {
                    return setPhotos([...photosfetch].filter(item => item.title.length < 10))
                }

        }
        if (album !== 0) {
            setPhotos([...photos].filter(item => item.title.length < 15 && item.title.length > 10))
        }

    }


    return <div style={{width: '100%', height: "100vh"}}>
        <Form>
            <FormGroup className={"mb-3"}>
                <FormLabel><b>Sort by title:</b></FormLabel>
                <Form.Select onChange={handleChangeTitle}>
                    <option value={"ASC"}>Sort by title ASC</option>
                    <option value={"DESC"}>Sort by title DESC</option>
                </Form.Select>
            </FormGroup>
            <FormGroup className={"mb-3"}>
                <FormLabel><b>Sort by album:</b></FormLabel>
                <Form.Select onChange={handleChangeAlbum}>
                    <option value="ASC">Sort by album ASC</option>
                    <option value="DESC">Sort by album DESC</option>
                </Form.Select>
            </FormGroup>
            <FormGroup>
                {RangeAlbum()}
            </FormGroup>
            <FormGroup>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{margin: "15px 15px 15px 15px"}}>
                        Count symbols
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => filterPhotos("first")}> more
                            than 10 but less than 15 </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => filterPhotos("second")}> less
                            than 10 </Dropdown.Item>
                    </Dropdown.Menu>
                    <Button onClick={() => setPhotos(photosfetch)} className="position-absolute top-0 end-0" variant={"danger"}>
                        Reset
                    </Button>
                </Dropdown>
            </FormGroup>
        </Form>
        <div style={{margin: "15px 15px 15px 15px"}}>
            <Paginator
                pageCount={Math.ceil(photos.length / 10)}
                currentPage={page}
                onPageChange={handlePageChange}
            >
            </Paginator>
        </div>
        <AutoSizer>
            {({width, height}) => (
                <List
                    width={width}
                    height={height}
                    rowHeight={150}
                    rowCount={photos.length}
                    overscanRowCount={5}
                    onRowsRendered={handleRowsScroll}
                    scrollToIndex={scrollToIndex}
                    scrollToAlignment='start'
                    rowRenderer={({key, index, style}) => {
                        const photoItem = photos[index]
                        return <div key={key} style={style} className="list-group-item d-flex align-items-center p-2">
                            <div className="mx-2">
                                <Photo photoItem={photoItem}/>
                            </div>
                            <div className="mx-2">
                                {photoItem.title}
                                {photoItem.albumId}
                            </div>
                        </div>
                        /*<PhotoItem key={key} style={style} Item={photoItem}/>*/
                    }}
                />
            )}
        </AutoSizer>
    </div>
}