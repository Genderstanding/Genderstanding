import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import nodeSaga from './node.saga';
import postSaga from './post.saga';
import nodeAssociationSaga from './nodeassociation.saga';
import newNodeSaga from './newnode.saga';
import inviteCodeSaga from './invitecode.saga';
import likeSaga from './likes.saga'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), 
    registrationSaga(),
    userSaga(),
    nodeSaga(),
    postSaga(),
    nodeAssociationSaga(),
    newNodeSaga(),
    inviteCodeSaga(),
    likeSaga(),
  ]);
}
