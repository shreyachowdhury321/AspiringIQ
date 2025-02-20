const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_SUBJECTS: 'SET_SUBJECTS',
    SET_ERROR: 'SET_ERROR',
    SET_USER_ID: 'SET_USER_ID',
    SET_PROFILE_DATA: 'SET_PROFILE_DATA',
    SET_RANKING_DATA: 'SET_RANKING_DATA',
    SET_IMAGE_URL: 'SET_IMAGE_URL',
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.SET_LOADING:
        return { ...state, loading: true, error: null };
      case ACTIONS.SET_SUBJECTS:
        return { ...state, loading: false, paperData: action.payload, error: null };
      case ACTIONS.SET_ERROR:
        return { ...state, loading: false, error: action.payload };
      case ACTIONS.SET_USER_ID:
        return { ...state, userId: action.payload };
      case ACTIONS.SET_PROFILE_DATA:
        return {
          ...state,
          profileImageUrl: action.payload.imageUrl,
          userName: action.payload.name,
        };
      case ACTIONS.SET_IMAGE_URL:
        return { ...state, profileImageUrl: action.payload };
      case ACTIONS.SET_RANKING_DATA:
        return {
          ...state,
          userRank: action.payload.rank,
          userPoints: action.payload.points,
        };
      default:
        return state;
    }
  };