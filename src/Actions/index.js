import enums from "../utils/enums";


export const getRetreatsByFilterorSearch = (pageNew = null, limitNew = null, retreatTypeNew = null, locationNew = null, searchTextNew = null) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();

            // const page = pageNew || state?.retreat?.page
            // const limit = limitNew || state?.retreat?.limit
            // const retreatType = retreatTypeNew || state?.retreat?.retreatType
            // const location = locationNew || state?.retreat?.location
            // const searchText = searchTextNew || state?.searchText

            const page = pageNew
            const limit = limitNew
            const retreatType = retreatTypeNew
            const location = locationNew
            const searchText = searchTextNew


            let req = 'https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats';
            let params = [];
            if (retreatType) params.push(`filter=${retreatType}`)
            if (location) params.push(`location=${location}`);
            if (searchText) params.push(`search=${searchText}`);
            if (limit) params.push(`limit=${limit}`)
            if (page) params.push(`page=${page}`)

            if (params.length > 0) {
                req += '?' + params.join('&');
            }

            dispatch(fetchDataRequest());
            let res = await fetch(req);
            let data = await res.json();
            if (Array.isArray(data)) {
                dispatch(fetchDataSuccess(data, page, limit, retreatType, location, searchText));
            }
            else { dispatch(fetchDataSuccess([], page, limit, retreatType, location, searchText)); }
        } catch (error) {
            dispatch(fetchDataFailure(error));
        }
    };
};

export const fetchDataRequest = () => {
    return {
        type: enums.FETCH_DATA_REQUEST,
    };
};

export const fetchDataSuccess = (data, page, limit, retreatType, location, searchText) => {
    return {
        type: enums.FETCH_DATA_SUCCESS,
        payload: data,
        page: page,
        limit: limit,
        retreatType: retreatType,
        location: location,
        searchText: searchText
    };
};

export const fetchDataFailure = (error) => {
    return {
        type: enums.FETCH_DATA_FAILURE,
        payload: error,
    };
};

