import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import nodeReducer from './node.reducer';
import postReducer from './post.reducer';
import nodeAssociationReducer from './nodeassociation.reducer';
import newNodeReducer from './newnode.reducer';
import inviteCodeReducer from './invitecode.reducer';
import likesReducer from './likes.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  nodeReducer, // holds all of currently available nodes
  postReducer, // holds all posts in all nodes
  nodeAssociationReducer, // holds all of the node association information
  newNodeReducer, // holds the newest node created
  inviteCodeReducer, // holds invite codes
  likesReducer, // holds likes 
});

export default rootReducer;
