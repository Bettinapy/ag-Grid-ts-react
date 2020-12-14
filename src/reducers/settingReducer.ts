const navigation = localStorage.getItem('navigation');
const navigationLocalStore = navigation ? JSON.parse(navigation) : []; 

const initailState = {
    theme: 'flamingo',
    currentIndex: 0,
    isOpenSaveModal: false,
    isOpenFilterModal: false,
    searchText: '',
    savingViewName: '',
    errorMessage: '',
    isOpenErrorModal: false,
    views: [],
    selectedViewName: '',
    isLoggedIn: navigationLocalStore.length ? true : false,
    isCondensedView: false
  }

const settingReducer = (state = initailState, action: any) => {
    switch (action.type) {
        case 'IS_LOGGED_IN': {
            const { isLoggedIn } = action.payload;
            return {
              ...state,
              isLoggedIn
            }
          }
        default:
        return state;
        }
    };
export default settingReducer;
