import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { DetailedItem } from '../utils/Types';
import { defaultImage, isPerson } from '../utils/Utils';
import InformationFields from './InformationFields';

interface InformationModalProps {
    open: boolean;
    setOpen: () => void;
    item: DetailedItem | undefined,
    hidden: boolean;
    setViewedMovie: (checked: boolean, id: number) => void;
}

const InformationModal = (props: InformationModalProps) => {
    const { open, setOpen, item, hidden, setViewedMovie } = props;

    if (!item) return <></>;


    // Sets the image onClick to link to imdb if a person, or item.homepage if a show
    const modalImageContainer = () => {
        if (isPerson(item)) {
            if (item.imdb) {
                return (modalImageLink(item.name, item.image, `https://www.imdb.com/name/${item.imdb}`))
            } else {
                return (modalImage(item.name, item.image))
            }
        } else {
            if (item.imdb) {
                return (modalImageLink(item.title, item.image, `https://www.imdb.com/title/${item.imdb}`))
            }
            else {
                return (modalImage(item.title, item.image))
            }
        }
    }

    return (
        <Modal visible={open} fade onClickBackdrop={() => setOpen()}>
            <div className="modal-container">
                <div className="modal-image-container">
                    {modalImageContainer()}
                </div>
                <div className="modal-wrapper">
                    {isPerson(item) ? <PersonItem item={item} /> : <TvItem item={item} hidden={hidden} setViewedMovie={setViewedMovie} setOpen={setOpen} />}
                </div>
                <img
                    className="modal-close"
                    src="https://cdn-icons-png.flaticon.com/512/3388/3388658.png"
                    alt={"Close"}
                    onClick={() => setOpen()}
                />
            </div>
        </Modal>
    );
}

const modalImage = (name: string, image: string) => {
    return (
        <img className="modal-image"
            alt={name}
            src={image ?
                ("https://image.tmdb.org/t/p/w500" + image) :
                defaultImage}
        />
    )
}

const modalImageLink = (name: string, image: string, link: string) => {
    return (
        <a href={link} target="_blank" rel="noreferrer">
            {modalImage(name, image)}
        </a>
    )
}

export default InformationModal;

const PersonItem = ({ item }) => {
    return (<div className="modal-information">
        <div className="modal-information-body">
            <div>{item.description}</div>
        </div>
        <div className="modal-information-footer">
            <InformationFields info={item.footerInfo} />
        </div>
    </div>)
}

const TvItem = ({ item, hidden, setViewedMovie, setOpen }) => {
    const handleViewed = (checked: boolean) => {
        setViewedMovie(checked, item.id);
        setOpen(false);
    }

    return (<div className="modal-information">
        <div className="modal-information-header">
            <div className="modal-title">{item.title}</div>
            {item.tagline && <div className="modal-subheader">{item.tagline}</div>}
        </div>
        <div className="modal-information-body">
            <div>{item.description}</div>
        </div>
        <div className="modal-information-footer">
            <InformationFields info={item.footerInfo} />
            <br />
        </div>
        {hidden && <div>
            <label>Viewed  <input type='checkbox' checked={item.watched} onClick={(checkbox) => handleViewed(checkbox.currentTarget.checked)} /></label>
        </div>
        }
    </div>)
}