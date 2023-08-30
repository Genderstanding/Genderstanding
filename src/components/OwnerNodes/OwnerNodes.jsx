import React, { useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useSelector } from "react-redux";

import './OwnerNodes.css'

const OwnerNodes = () => {

    // sourcing use selector to hold store information
    let newNode = useSelector(store => store.newNodeReducer.newNodeDatabaseResponse)
    let nodePosts = useSelector(store => store.postReducer.postDatabaseResponse)

console.log('New node set to: ', newNode)
console.log('the contents of node posts is: ', nodePosts)


    return (
        <>
            <div className="App flex flex-col h-screen">
                <div className='header-container flex items-center '>
                    <MdChevronLeft size={25} className='ml-2' />
                    {/* this flex-grow div is tailwind way to spread out the back and add buttons*/}
                    <div className="flex-grow">{newNode?.[0]?.node_name.length > 0 ? (newNode?.[0]?.node_name) : (newNode?.node_name)}</div>
                    <button className="mr-4 text-2xl">🙋‍♀️</button>
                </div>


                <div className="thread-container flex justify-center">
                    {nodePosts.map(post => {
                        if (post?.node_id == newNode.id) {
                            return (
                                <div className="question-box mt-4">
                                    <div className="flex justify-between items-end px-4 py-2">
                                        <span className="text-sm">5 minutes ago</span>
                                        <button>. . .</button>
                                    </div>
                                    <div className="question-text m-4">
                                        {post?.content}
                                    </div>
                                    <div className="flex justify-between items-end px-4 py-2">
                                        <button className="text-sm">Reply</button>
                                        <button className="text-sm">Reject</button>
                                    </div>
                                </div>
                            )
                        }
                    })}
                    <div className="question-box mt-4">
                        <div className="flex justify-between items-end px-4 py-2">
                            <span className="text-sm">5 minutes ago</span>
                            <button>. . .</button>
                        </div>
                        <div className="question-text m-4">
                            Why are there so many songs about rainbows? Also, what's on the other side?
                        </div>
                        <div className="flex justify-between items-end px-4 py-2">
                            <button className="text-sm">Reply</button>
                            <button className="text-sm">Reject</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default OwnerNodes;