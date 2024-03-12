import React, {useEffect, useState} from 'react';
import {getAllGroups, getFilteredGroups} from "../API/APIMethods";
import GroupItem from "./GroupItem";
import {Group} from "../dataInterface";
import style from "./groupList.module.css"
import {Select} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const GroupList = () => {
    const [groups, setGroups] = useState([] as Group[]);
    const [selectedPrivacy, setSelectedPrivacy] = useState("" as string);
    const [selectedColor, setSelectedColor] = useState("" as string);
    const [selectedFriends, setSelectedFriends] = useState("" as string);
    const [loading, setLoading] = useState(true as boolean)
    const [uniqueAvatarColors, setUniqueAvatarColors] = useState([] as { label: string, value: string }[]);


    function getUniqueAvatarColors(groups: Group[]) {
        const colors = groups.reduce((acc: string[], curr) => {
            if (curr.avatar_color && !acc.includes(curr.avatar_color)) {
                acc.push(curr.avatar_color);
            }
            return acc;
        }, []);
        return colors.map(color => ({
            label: color,
            value: color
        }));
    }

    const fetchData = async () => {
        await getFilteredGroups(selectedPrivacy, selectedColor, selectedFriends).then(response => response && setGroups(response.data ?? [])).finally(() => setLoading(false))
    };

    useEffect(() => {
        getAllGroups().then(response => response.data && getUniqueAvatarColors(response.data)).then(response => response && setUniqueAvatarColors(response)).finally(() => setLoading(false))
    }, []);

    useEffect(() => {
        setLoading(true)
        fetchData();
    }, [selectedFriends, selectedColor, selectedPrivacy]);


    return (
        <div className={style.wrapper}>
            <div className={style.filter}>
                <Select
                    className={style.select}
                    id="select-id"
                    placeholder="Тип приватности"
                    value={selectedPrivacy}
                    onChange={(e) => setSelectedPrivacy(e.target.value)}
                    options={
                        [{
                            label: "Открытая",
                            value: "Открытая"
                        },
                            {
                                label: "Закрытая",
                                value: "Закрытая"
                            }]
                    }

                />
                <Select
                    className={style.select}
                    id="select-id"
                    placeholder="Цвет"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    options={uniqueAvatarColors}
                />
                <Select
                    className={style.select}
                    id="select-id"
                    placeholder="Наличие друзей"
                    value={selectedFriends}
                    onChange={(e) => setSelectedFriends(e.target.value)}
                    options={
                        [{
                            label: "Есть друзья",
                            value: "Есть друзья"
                        },
                            {
                                label: "Нет друзей",
                                value: "Нет друзей"
                            }]
                    }
                />
            </div>
            {loading ?
                <div>Загрузка...</div>
                :
                <div>
                    {groups.map((group: Group) => <GroupItem {...group} />)}
                </div>
            }
        </div>
    );
};

export default GroupList;
