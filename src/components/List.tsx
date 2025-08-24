import React from 'react';
import { Item } from '../utils/Types';
import { defaultImage } from '../utils/Utils';
import InformationFields from './InformationFields';

type listProps = {
    items: Item[];
    selectItem: Function;
}

type itemProps = {
    item: Item
    selectItem: Function;
}

const List = (props: listProps) => {
    const { items, selectItem } = props;
    const setList = [] as any;
    const setSecondList = [] as any;
    if (items.length) {
        items.forEach(item => {
            if (!item.watched)
                setList.push(<ListItem item={item} selectItem={selectItem} key={item.id} />)
            else setSecondList.push(<ListItem item={item} selectItem={selectItem} key={item.id} />)
        });
    }

    return (
        <>
            <div className="items-container">
                {setList}
            </div>
            <div className="items-second-container">
                {setSecondList}
            </div>
        </>
    )
}

const ListItem = (props: itemProps) => {
    const { item, selectItem } = props;

    const disabled = item.watched ? '50%' : '100%'
    return (
        <div className="item-wrapper">
            <div className="item" onClick={() => selectItem(item.id, item.type)}>
                <div className="item-cell" style={{ opacity: disabled }}>
                    <img className="item-image"
                        alt={""}
                        src={item.image ?
                            ("https://image.tmdb.org/t/p/w500/" + item.image) :
                            defaultImage} />
                </div>
                <div className="item-info">
                    <InformationFields info={item.info} />
                </div>
            </div>
        </div>
    )
}

export default List;