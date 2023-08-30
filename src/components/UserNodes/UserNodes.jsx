import React, {useState} from "react";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import AddQuestionModal from "../AddQuestionModal/AddQuestionModal";
import './UserNodes.css'
import ReplyModal from "../ReplyModal/ReplyModal";

const UserNodes = () => {
    const [addQuestionOpen, setAddQuestionOpen] = useState(false);
    const [addReplyOpen, setAddReplyOpen] = useState(false);
    const [clickedReplyContent, setClickedReplyContent] = useState('');

    const questionsArray = [
        {
            node_id: 1,
            user_id: 123,
            question: "Rainbows are visions, but only illusions. Rainbows have nothing to hide.",
        },
        {
            node_id: 2,
            user_id: 234,
            question: "Rainbows are nightmares, as real as death. Rainbows will eat you alive.",
        },
    ];

    const openAddQuestion = () => {
        setAddQuestionOpen(true);
    };

    const closeAddQuestion = () => {
        setAddQuestionOpen(false);
    };

    const openAddReply = (questionObject) => {
        setClickedReplyContent(questionObject);
        setAddReplyOpen(true);
    };

    const closeAddReply = () => {
        setAddReplyOpen(false);
    };


    return (
        <>
            <div className="App flex flex-col h-screen">
                
                <div className='header-container flex items-center '>
                    <MdChevronLeft size={25} className='ml-2' />
                    <div className="flex-grow"></div>
                    <button className="mr-4 text-2xl" onClick={openAddQuestion}>?</button>
                </div>


                <div className="thread-container flex flex-col justify-center items-center">
                {questionsArray.map((content) => (
                    <div className="question-box mt-4" key={content.node_id}>
                        <div className="flex justify-between items-end px-4 py-2">
                            <span className="text-sm">5 minutes ago</span>
                            
                        </div>
                        {/* this should display the latest question/reply in this thread */}
                        <div className="question-text m-4" >
                            {content.question}
                        </div>
                        <div className="flex justify-between items-end px-4 py-2">
                            <button className="text-sm" onClick={() => openAddReply(content)}>Reply</button>
                            <button className="text-sm">🖤<span>5</span></button>
                       </div>
                    </div>
                    ))}
                </div>
            <AddQuestionModal addQuestionOpen={addQuestionOpen} closeAddQuestion={closeAddQuestion}/>
            <ReplyModal addReplyOpen={addReplyOpen} closeAddReply={closeAddReply} questionObject={clickedReplyContent}/>
            </div>
        </>
    );
}

export default UserNodes;