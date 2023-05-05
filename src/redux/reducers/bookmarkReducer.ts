import { Data } from "../../models/Data";
import {
  BOOKMARK_ACTIONS,
  BookmarkAction,
  BookmarkProps,
} from "../actions/bookmarkActions";

const initialState: BookmarkProps = {
  bookmarks: [],
};

const bookmarkReducer = (state = initialState, action: BookmarkAction) => {


  switch (action.type) {
    case BOOKMARK_ACTIONS.ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [
          ...state.bookmarks.filter(
            (item) => item.id.value+item.id.name !== (action.payload as Data).id.value+(action.payload as Data).id.name
          ),
          action.payload,
        ],
      };
    case BOOKMARK_ACTIONS.REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: [
          ...state.bookmarks.filter(
            (item) => item.id.value+item.id.name !== (action.payload as string)
          ),
        ],
      };
    case BOOKMARK_ACTIONS.REMOVE_ALL_BOOKMARK:
      return {
        bookmarks: [],
      };
    default:
      return state;
  }
};
export default bookmarkReducer;
