import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const MediaVideos = ({videos}) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);


    if(videos.length === 0) return; // don't return anything

    return(
        <div className='media_videos'>
                    <h4 className='media_videos_title my-4'>Videos</h4>
                    <div className='media_videos_row'>
                    
                        {
                            videos.map(video => {
                                return (
                                    <div className='media_videos_item' 
                                    onClick={() => {setShow(true), setSelectedVideo(video.key);}}
                                    style={{backgroundImage: `url(https://i.ytimg.com/vi/${video.key}/hqdefault.jpg)`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}
                                    ></div>
                                )
                            })
                        }
                    </div>


                <Modal show={show} onHide={handleClose} size="xxl">
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <iframe src={`https://www.youtube.com/embed/${selectedVideo}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </Modal.Body>
                </Modal>       
        </div>
    )
}

export default MediaVideos;