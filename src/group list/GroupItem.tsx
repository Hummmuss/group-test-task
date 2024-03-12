import React, {useState} from 'react';
import {Group, User} from "../dataInterface";
import style from "./groupItem.module.css"
import {Avatar, Card, RichCell} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

function getPluralWord(count: number) {
    let lastDigit = count % 10;
    let lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return {friend: " друг", subs: " подписчик"};
    } else if ((lastDigit === 2 || lastDigit === 3 || lastDigit === 4) && (lastTwoDigits < 10 || lastTwoDigits > 20)) {
        return {friend: " друга", subs: " подписчика"};
    } else {
        return {friend: " друзей", subs: " подписчиков"};
    }
}

const GroupItem = (group: Group) => {
    const [showFriends, setShowFriends] = useState(false)
    const toggleShowFriends = () => {
        setShowFriends(!showFriends)
        console.log(showFriends)
    }

    return (
        <Card mode="shadow" className={style.card}>
            <RichCell
                before={<Avatar size={100} className={style.avatar} style={{backgroundColor: group.avatar_color}}/>}>

                <div className={style.container}>
                    <div>{group.name}</div>
                    <div className={style.closed}>
                        {group.closed ? "закрытая" : "открытая"}
                    </div>
                    <div>
                        {group.members_count + getPluralWord(group.members_count).subs},
                        {group.friends
                            ? <span onClick={() => toggleShowFriends()} className={style.friends}>
                                {group.friends && " " + group.friends.length + getPluralWord(group.friends.length).friend}
                            </span>

                            : " нет друзей"}
                    </div>
                    {showFriends && <div className={style.friendsList}>
                        {group.friends && group.friends.map((friend: User) =>
                            <div>
                                {friend.first_name} {friend.last_name}
                            </div>)
                        }
                    </div>
                    }
                </div>

            </RichCell>

        </Card>
    );
};

export default GroupItem;
