
import { ReactNode } from 'react';
import '../styles/question.scss'

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode
};

export const Question = ({ content, author, children }: QuestionProps) => {
  return (
    <div className="question">
      <p>{content}</p>
      <footer className="user-info">
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
};
