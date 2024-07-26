import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getRetreatsByFilterorSearch } from '../Actions/index';
import { Button, Select, Input } from 'antd';
import { Locations, Types } from "../utils/sampledata";


const DynamicCards = () => {
    const [prevPageDisable, setPrevPageDisable] = useState(false);

    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    const dispatch = useDispatch();
    const retreats = useSelector((state) => state?.retreat?.retreats);
    const page = useSelector((state) => state?.retreat?.page);
    const limit = useSelector((state) => state?.retreat?.limit);
    const retreatType = useSelector((state) => state?.retreat?.retreatType)
    const location = useSelector((state) => state?.retreat?.location)
    const searchText = useSelector((state) => state?.retreat?.searchText)
    const loading = useSelector((state) => state?.retreat?.loading)

    useEffect(() => {
        dispatch(getRetreatsByFilterorSearch(1, limit, null, null, null))
    }, [])

    useEffect(() => {
        if (page == 1) setPrevPageDisable(true)
        else setPrevPageDisable(false);
    }, [page])

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 200);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        if (debouncedQuery) {
            handleSearchChange(debouncedQuery);
        }
    }, [debouncedQuery]);

    const handleSearchChange = (searchQuery) => {
        dispatch(getRetreatsByFilterorSearch(1, limit, retreatType, location, searchQuery))
    };

    const goToNextPage = () => {
        let pageNo = page + 1
        dispatch(getRetreatsByFilterorSearch(pageNo, limit, retreatType, location, searchText))
        setPrevPageDisable(false);
    }
    const goToPreviousPage = () => {
        let pageNo = page - 1
        if (pageNo == 0) { setPrevPageDisable(true); return; }
        dispatch(getRetreatsByFilterorSearch(pageNo, limit, retreatType, location, searchText))
    }



    return (<>
        <div className="dynamic-cards-ops-div">
            <div className="dynamic-cards-ops-dropdown-div">
                <Select
                    style={{ width: 200 }}
                    placeholder="Filter By Type"
                    optionFilterProp="label"
                    options={Types}
                    onChange={(val) => { dispatch(getRetreatsByFilterorSearch(1, limit, val, location, searchText)) }}
                    className="type-dropdown"
                    allowClear={true}
                    onClear={() => dispatch(getRetreatsByFilterorSearch(1, limit, null, location, searchText))}
                />
                <Select
                    style={{ width: 200 }}
                    placeholder="Filter By Location"
                    optionFilterProp="label"
                    options={Locations}
                    onChange={(val) => { dispatch(getRetreatsByFilterorSearch(1, limit, retreatType, val, searchText)) }}
                    className="location-dropdown"
                    allowClear={true}
                    onClear={() => dispatch(getRetreatsByFilterorSearch(1, limit, retreatType, null, searchText))}
                />
            </div>
            <Input
                placeholder="Search retreats by title"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: 400 }}
                className="search-input"
            />
        </div>
        <div className="dynamic-cards-main-div">
            {!loading ?
                retreats && retreats?.length > 0 ? retreats?.map((item, index) => (<div className="dynamic-card-main" key={index}>
                    <div className="dynamic-card-img-div">
                        <img src={item.image} alt="image" className="dynamic-card-img" />
                    </div>
                    <p className="inline-block dynamic-card-title-text">{item.title}</p>
                    <h6>{item.description}</h6>
                    <h6>{`${"Date"}: ${item.date}`}</h6>
                    <h6>{`${"Location"}: ${item.location}`}</h6>
                    <h6>{`${"Price"}: ${item.price}`}</h6>
                </div>)) : <p>Not Found</p>
                : <div className="cards-loading-div">Loading...</div>}
        </div>
        <div className='flex space-x-4 dynamic-cards-pagination-btn-div'>
            <Button type="primary btn-pagination btn-previous" disabled={prevPageDisable} onClick={goToPreviousPage}>Previous</Button>
            <Button type="primary btn-pagination btn-next" onClick={goToNextPage}>Next</Button>
        </div>
    </>)
}

export default DynamicCards;