import React, { useEffect } from 'react';

export interface ICommentProps {
    text: string;
}

export const Comment: React.FC<ICommentProps> = ({ text }) => {
    useEffect(() => {
        console.log(text);
        window.document.querySelector('head')?.append('123123');
        // .appen(document.createComment(text), null);
    }, []);

    return <div />;
};
