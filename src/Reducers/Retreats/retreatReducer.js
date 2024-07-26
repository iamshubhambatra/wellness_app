import enums from "../../utils/enums";

const initialState = {
    retreats: [],
    loading: false,
    error: '',
    page: 1,
    limit: 3,
    retreatType: null,
    location: null,
    searchText: null
};

const retreatReducer = (state = initialState, action) => {
    switch (action.type) {
        case enums.FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case enums.FETCH_DATA_SUCCESS:
            console.log("payload", action)
            return {
                ...state,
                loading: false,
                retreats: action.payload,
                page: action.page,
                limit: action.limit,
                retreatType: action.retreatType,
                location: action.location,
                searchText: action.searchText,
                error: '',
            };
        case enums.FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                retreats: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default retreatReducer;