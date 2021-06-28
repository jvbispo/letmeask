
import { ReactNode } from 'react';
import '../styles/question.scss'
import cx from 'classnames';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export const Question = ({ content, author, children, isAnswered = false, isHighlighted = false }: QuestionProps) => {
  return (
    <div className={cx(
      'question',
      {
        isAnswered: isAnswered,
        isHighlighted: isHighlighted,
      }
    )}>
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
