import React, {useState} from "react";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import AddQuestionModal from "../AddQuestionModal/AddQuestionModal";
import './UserNodes.css'

const UserNodes = () => {
    const [addQuestionOpen, setAddQuestionOpen] = useState(false);

    const openAddQuestion = () => {
        setAddQuestionOpen(true);
    };

    const closeAddQuestion = () => {
        setAddQuestionOpen(false);
    };


    return (
        <>
            <div className="App flex flex-col h-screen">
                <div className='header-container flex items-center '>
                    <MdChevronLeft size={25} className='ml-2' />
                    {/* this flex-grow div is tailwind way to spread out the back and add buttons*/}
                    <div className="flex-grow"></div>
                    <button className="mr-4 text-2xl" onClick={openAddQuestion}>?</button>
                </div>


                <div className="thread-container flex justify-center">
                    <div className="question-box mt-4">
                        <div className="flex justify-between items-end px-4 py-2">
                            <span className="text-sm">5 minutes ago</span>
                            
                        </div>
                        <div className="question-text m-4">
                            Rainbows are visions, but only illusions. Rainbows have nothing to hide.
                        </div>
                        <div className="flex justify-between items-end px-4 py-2">
                            <button className="text-sm">Reply</button>
                            <button className="text-sm">🖤<span>5</span></button>
                        </div>
                    </div>
                </div>
            <AddQuestionModal addQuestionOpen={addQuestionOpen} closeAddQuestion={closeAddQuestion}/>
            </div>
        </>
    );
}

export default UserNodes;