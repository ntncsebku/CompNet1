import React from 'react';

import ChatboxContext from '../../../../../contexts/ChatboxContext';
import { renderContent } from '../../../../../utils';


import './LHSMessage.css';

const lhsMessage = (props) => (
    <ChatboxContext.Consumer>
        {value => (
            <div className="lhs-message-item">
                {renderContent({ type: props.type, from: props.from, content: props.content, colorTheme: value.colorTheme })}
                <div className="lhs-message-item__time">
                    <span>{props.time}</span>
                </div>
            </div>
        )}
    </ChatboxContext.Consumer>
);

export default lhsMessage;