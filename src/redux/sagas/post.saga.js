import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// TO DO: ALERT 
// saga to CREATE a post
function* createPost(action) {
    try {
        yield axios.post('/post', action.payload)
        yield put({ type: 'FETCH_POST' })
    } catch (error) {
        console.log('Error in SAGA POST to posts: ', error);
    }
}


// saga to GET all posts
function* fetchPost(action) {
    try {
        const postResponse = yield axios.get('/post')
        yield put({ type: 'SET_POSTS', payload: postResponse.data })
    } catch (error) {
        console.log('Error in SAGA GET request for posts: ', error)
    }
}

// saga to PUT on a post to edit post information
function* editPost(action) {
    try {
        yield axios.put(`/post/${action.payload}`)
        yield put({ type: 'FETCH_POST' })
    } catch (error) {
        console.log('Error in SAGA PUT post request: ', error)
    }
}


// saga to DELETE a post
function* deletePost(action) {
    try {
        yield axios.delete(`/post/${action.payload}`)
        yield put({ type: 'FETCH_POST' })
    } catch (error) {
        console.log('Error in SAGA DELETE post request: ', error)
    }
}

// saga to PUT a like on a post
function* likePost(action) {
    try {
        yield axios.put(`/post/like/${action.payload}`)
        yield put({ type: 'FETCH_POST' })
    } catch (error) {
        console.log('Error in SAGA PUT like post request: ', error)
    }
}

// Saga to PUT replied into database to make visible to all users in node
function* acceptPost(action) {
    try {
        yield axios.put(`post/accept/${action.payload}`)
        yield put({ type: 'FETCH_POST' })
    } catch (error) {
        console.log('Error in SAGA PUT post accept request: ', error)
    }
}

// saga to PUT on a post to report a post to admin
function* reportPost(action) {
    try {
        yield axios.put(`/post/reported/${action.payload}`)
        yield put({ type: 'FETCH_POST' })
    } catch (error) {
        console.log('Error in SAGA PUT post request: ', error)
    }
}

// saga to PUT on a post to report a post to admin
function* promotePost(action) {
    try {
        yield axios.put(`/post/promote/${action.payload}`)
        yield put({ type: 'FETCH_POST' })
    } catch (error) {
        console.log('Error in SAGA PUT post request: ', error)
    }
}


// call listener for different routes
function* postSaga() {
    yield takeLatest('CREATE_POST', createPost);
    yield takeLatest('FETCH_POST', fetchPost);
    yield takeLatest('EDIT_POST', editPost);
    yield takeLatest('DELETE_POST', deletePost);
    yield takeLatest('ACCEPT_POST', acceptPost)
    yield takeLatest('LIKE_POST', likePost)
    yield takeLatest('REPORT_POST', reportPost);
    yield takeLatest('PROMOTE_POST', promotePost);
}

export default postSaga;