import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

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
        const postResponse = yield('/post')
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
        yield axios.delete(`/node/${action.payload}`)
        yield put({ type: 'FETCH_POST' })
    } catch (error) {
        console.log('Error in SAGA DELETE post request: ', error)
    }
}

// call listener for different routes
function* postSaga() {
    yield takeLatest('CREATE_POST', createPost);
    yield takeLatest('FETCH_POST', fetchPost);
    yield takeLatest('EDIT_POST', editPost);
    yield takeLatest('DELETE_POST', deletePost);
}

export default postSaga;